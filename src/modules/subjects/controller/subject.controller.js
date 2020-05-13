//Errors
import nodemailer from 'nodemailer';
import AlreadyExistError from '../../../errors-handle/already-exist.errors';
import NotFoundError from '../../../errors-handle/not-found.errors';
import ValidationError from '../../../errors-handle/validation.errors';
import SubjectRepository from '../repositories/subject.repository';
import AccountRepository from '../../accounts/repositories/account.repository';
import NotImplementError from '../../../errors-handle/not-implemented.errors';
import Unauthorized from '../../../errors-handle/unauthorized.errors';
import {
    SubjectStatus,
} from '../commons/subject.status';
import {
    AccountRole,
} from '../../accounts/commons/account-status.common'
// Util
import { GenerateToken, VerifyToken } from '../../../utils/jwt.util';
//Commom - Code
import {
    CreateSubjectErrors,
    GetSubjectsErrors,
    GetSubjectErrors,
    UpdateSubjectErrors,
    BlockSubjectErrors
} from '../error-codes/subject.error-codes';

const url = require('url');
const querystring = require('querystring');
//
const createSubject = async (req, res) => {
    const { jwt } = req.headers;
    const data = req.body;
    try {

        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(CreateSubjectErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.TEACHER) {
            throw new Unauthorized(CreateSubjectErrors.NO_RIGHT);
        }
        const isExisted = await SubjectRepository.getSubject(data.MaHocPhan);
        if (isExisted) throw CreateSubjectErrors.SUBJECT_EXISTED;
        const subject = await SubjectRepository.createSubject(data);
        if (!subject) throw new NotImplementError(CreateSubjectErrors.CREATE_FAIL);
        return res.onSuccess(subject);
    } catch (error) {
        return res.onError(error);
    }
};


const getAllSubjects = async (req, res) => {
//    const { jwt } = req.headers;
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);
    const page = parsedQs.page
    const limit = parsedQs.limit
    try {
  //      const authenData = VerifyToken(jwt);
    //    if (!authenData) throw new NotImplementError(GetSubjectsErrors.AUTH_FAIL);
        // if (authenData.role !== AccountRole.TEACHER) {
        //     throw new Unauthorized(GetSubjectsErrors.NO_RIGHT);
        // }
        const subjects = await SubjectRepository.getAllSubjects(parseInt(page),parseInt(limit));
        if (!subjects) throw new NotFoundError(GetSubjectsErrors.GET_FAIL);
        return res.onSuccess(subjects);
    } catch (error) {
        return res.onError(error);
    }
};


const getAllSubjectsForSchedule = async (req,res) => {
    try {
        const subjects = await SubjectRepository.getAllSubjectsForSchedule();
        if (!subjects) throw new NotFoundError(GetSubjectsErrors.GET_FAIL);
        return subjects;
    } catch (error) {
          return error;
    }
};

const getAllSubjectInputBy_SoTinChi = async (req, res) => {
    // const { jwt } = req.headers;
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);
    const page = parsedQs.page
    const limit = parsedQs.limit
    const data = req.body;
    try {
        // const authenData = VerifyToken(jwt);
        // if (!authenData) throw new NotImplementError(GetSubjectsErrors.AUTH_FAIL);
        // if (authenData.role !== AccountRole.MANAGER) {
        //     throw new Unauthorized(GetSubjectsErrors.NO_RIGHT);
        // }
        const subjects = await SubjectRepository.getAllSubjectInputBy_SoTinChi(parseInt(page),parseInt(limit),data.SoTinChi);
        if (!subjects) throw new NotFoundError(GetSubjectsErrors.GET_FAIL);
        return res.onSuccess(subjects);
    } catch (error) {
        return res.onError(error);
    }
};


const getSubject = async (req, res) => {
  //  const { jwt } = req.headers;
    let parsedUrl = url.parse(req.url).path;
    const MaHocPhan = parsedUrl.slice(9,parsedUrl.length);
    console.log(MaHocPhan);
    try {
        // const authenData = VerifyToken(jwt);
        // if (!authenData) throw new NotImplementError(GetSubjectErrors.AUTH_FAIL);
        // if (authenData.role !== AccountRole.MANAGER) {
        //     throw new Unauthorized(GetSubjectErrors.NO_RIGHT);
        // }
       const subject = await SubjectRepository.getSubject(MaHocPhan);
       if (!subject) throw new NotFoundError(GetSubjectErrors.GET_FAIL);
        return res.onSuccess(subject);
    } catch (error) {
        return res.onError(error);
    }
};

const updateSubject = async (req, res) => {
    const { jwt } = req.headers;
    const MaHocPhan = req.params.MaHocPhan
    const data = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(UpdateSubjectErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.TEACHER) {
            throw new Unauthorized(UpdateSubjectErrors.NO_RIGHT);
        }
        const updated = await SubjectRepository.updateSubject(MaHocPhan, data);
        if (updated != true) throw new NotImplementError(UpdateSubjectErrors.UPDATED_FAILURE);
        return res.onSuccess(updated);
    } catch (error) {
        return res.onError(error);
    }
};


const blockSubject = async (req, res) => {
    const { jwt } = req.headers;
    const MaHocPhan = req.params.MaHocPhan
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(BlockSubjectErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.TEACHER) {
            throw new Unauthorized(BlockSubjectErrors.NO_RIGHT);
        }
        const blocked = await SubjectRepository.blockSubject(MaHocPhan);
        if (blocked != true) throw new NotImplementError(BlockSubjectErrors.BLOCK_FAIL);
        return res.onSuccess(blocked);
    } catch (error) {
        return res.onError(error);
    }
};


const getSubjectByFilter = async (req, res) => {

};
export default {
    createSubject,
    getAllSubjects,
    getAllSubjectsForSchedule,
    getSubject,
    updateSubject,
    blockSubject,
    getSubjectByFilter,
    getAllSubjectInputBy_SoTinChi
};
