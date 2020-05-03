//Errors
import nodemailer from 'nodemailer';
import AlreadyExistError from '../../../errors-handle/already-exist.errors';
import NotFoundError from '../../../errors-handle/not-found.errors';
import ValidationError from '../../../errors-handle/validation.errors';
import SubjectRepository from '../repositories/subject.repository';
import AccountRepository from '../../account-module/repositories/account.repository';
import NotImplementError from '../../../errors-handle/not-implemented.errors';
import Unauthorized from '../../../errors-handle/unauthorized.errors';
import {
    SubjectStatus,
} from '../commons/subject.status';
import {
    AccountRole,
} from '../../account-module/commons/account-status.common'
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

        // const authenData = VerifyToken(jwt);
        // if (!authenData) throw new NotImplementError(CreateSubjectErrors.AUTH_FAIL);
        // if (authenData.role !== AccountRole.TEACHER) {
        //     throw new Unauthorized(CreateSubjectErrors.NO_RIGHT);
        // }
        // const isExisted = await SubjectRepository.getSubject(data.subjectId);
        // if (!isExisted) throw CreateSubjectErrors.SUBJECT_NOT_EXISTED;
        const subject = await SubjectRepository.createSubject(data);
        if (!subject) throw new NotImplementError(CreateSubjectErrors.CREATE_FAIL);
        return res.onSuccess(subject);
    } catch (error) {
        return res.onError(error);
    }
};

const createSetting = async (req, res) => {
//    const { jwt } = req.headers;
    const data = req.body;
    try {
        const Setting = await SubjectRepository.createSetting(data);
        if (!Setting) throw new NotImplementError(CreateSubjectErrors.CREATE_FAIL);
        return res.onSuccess(Setting);
    } catch (error) {
        return res.onError(error);
    }
};


const getAllSubjects = async (req, res) => {
    const { jwt } = req.headers;
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);
    const page = parsedQs.page
    const limit = parsedQs.limit
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetSubjectsErrors.AUTH_FAIL);
        // if (authenData.role !== AccountRole.MANAGER) {
        //     throw new Unauthorized(GetSubjectsErrors.NO_RIGHT);
        // }
        const subjects = await SubjectRepository.getAllSubjects(parseInt(page),parseInt(limit));
        if (!subjects) throw new NotFoundError(GetSubjectsErrors.GET_FAIL);
        return res.onSuccess(subjects);
    } catch (error) {
        return res.onError(error);
    }
};

const getAllSubjectInputBySubjectId = async (req, res) => {
    const { jwt } = req.headers;
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);
    const page = parsedQs.page
    const limit = parsedQs.limit
    const data = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetSubjectsErrors.AUTH_FAIL);
        // if (authenData.role !== AccountRole.MANAGER) {
        //     throw new Unauthorized(GetSubjectsErrors.NO_RIGHT);
        // }
        const isExisted = await SubjectRepository.getSubject(data.subjectId);
        if (!isExisted) throw CreateSubjectErrors.SUBJECT_NOT_EXISTED;
        const subjects = await SubjectRepository.getAllSubjectInputBySubjectId(parseInt(page),parseInt(limit),data.subjectId);
        if (!subjects) throw new NotFoundError(GetSubjectsErrors.GET_FAIL);
        return res.onSuccess(subjects);
    } catch (error) {
        return res.onError(error);
    }
};


const getSubject = async (req, res) => {
    const { jwt } = req.headers;
    const subjectId = req.params.subjectId;

    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetSubjectErrors.AUTH_FAIL);
        // if (authenData.role !== AccountRole.MANAGER) {
        //     throw new Unauthorized(GetSubjectErrors.NO_RIGHT);
        // }
        const subject = await SubjectRepository.getSubject(subjectId);
        if (!subject) throw new NotFoundError(GetSubjectErrors.GET_FAIL);
        return res.onSuccess(subject);
    } catch (error) {
        return res.onError(error);
    }
};

const updateSubject = async (req, res) => {
    const { jwt } = req.headers;
    const subjectId = req.params.subjectId
    const data = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(UpdateSubjectErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.TEACHER) {
            throw new Unauthorized(UpdateSubjectErrors.NO_RIGHT);
        }
        const updated = await SubjectRepository.updateSubject(subjectId, data);
        if (updated != true) throw new NotImplementError(UpdateSubjectErrors.UPDATED_FAILURE);
        return res.onSuccess(updated);
    } catch (error) {
        return res.onError(error);
    }
};

const updateSetting = async (req, res) => {
    const data = req.body;
    try {
        const updated = await SubjectRepository.updateSetting(data);
        if (updated != true) throw new NotImplementError(UpdateSubjectErrors.UPDATED_FAILURE);
        return res.onSuccess(updated);
    } catch (error) {
        return res.onError(error);
    }
};

const blockSubject = async (req, res) => {
    const { jwt } = req.headers;
    const subjectId = req.params.subjectId
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(BlockSubjectErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.TEACHER) {
            throw new Unauthorized(BlockSubjectErrors.NO_RIGHT);
        }
        const blocked = await SubjectRepository.blockSubject(subjectId);
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
    getSubject,
    updateSubject,
    blockSubject,
    getSubjectByFilter,
    createSetting,
    updateSetting
};
