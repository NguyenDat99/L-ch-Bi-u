//Errors
import nodemailer from 'nodemailer';
import AlreadyExistError from '../../../errors-handle/already-exist.errors';
import NotFoundError from '../../../errors-handle/not-found.errors';
import ValidationError from '../../../errors-handle/validation.errors';
import MajorRepository from '../repositories/major.repository';
import AccountRepository from '../../accounts/repositories/account.repository';
import NotImplementError from '../../../errors-handle/not-implemented.errors';
import Unauthorized from '../../../errors-handle/unauthorized.errors';

import {
    AccountRole,
} from '../../accounts/commons/account-status.common'
// Util
import { GenerateToken, VerifyToken } from '../../../utils/jwt.util';
//Commom - Code


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
        const isExisted = await MajorRepository.getMajor(data.MaKhoa);
        if (isExisted) throw CreateSubjectErrors.SUBJECT_EXISTED;
        const major = await MajorRepository.createMajor(data);
        if (!major) throw new NotImplementError(CreateSubjectErrors.CREATE_FAIL);
        return res.onSuccess(major);
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
        // if (authenData.role !== AccountRole.TEACHER) {
        //     throw new Unauthorized(GetSubjectsErrors.NO_RIGHT);
        // }
        const major = await MajorRepository.getAllMajor(parseInt(page),parseInt(limit));
        if (!major) throw new NotFoundError(GetSubjectsErrors.GET_FAIL);
        return res.onSuccess(major);
    } catch (error) {
        return res.onError(error);
    }
};


const getSubject = async (req, res) => {
    const { jwt } = req.headers;
    const MaKhoa = req.params.MaKhoa;

    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(GetSubjectErrors.AUTH_FAIL);
        // if (authenData.role !== AccountRole.MANAGER) {
        //     throw new Unauthorized(GetSubjectErrors.NO_RIGHT);
        // }
        const major = await MajorRepository.getMajor(MaKhoa);
        if (!major) throw new NotFoundError(GetSubjectErrors.GET_FAIL);
        return res.onSuccess(major);
    } catch (error) {
        return res.onError(error);
    }
};

const updateSubject = async (req, res) => {
    const { jwt } = req.headers;
    const MaKhoa = req.params.MaKhoa
    const data = req.body;
    try {
        const authenData = VerifyToken(jwt);
        if (!authenData) throw new NotImplementError(UpdateSubjectErrors.AUTH_FAIL);
        if (authenData.role !== AccountRole.TEACHER) {
            throw new Unauthorized(UpdateSubjectErrors.NO_RIGHT);
        }
        const updated = await MajorRepository.updateMajor(MaHocPhan, data);
        if (updated != true) throw new NotImplementError(UpdateSubjectErrors.UPDATED_FAILURE);
        return res.onSuccess(updated);
    } catch (error) {
        return res.onError(error);
    }
};


export default {
    createSubject,
    getAllSubjects,
    getSubject,
    updateSubject
  };
