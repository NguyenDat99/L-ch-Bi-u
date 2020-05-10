import Validator from 'validator';
import ValidationError from '../../../errors-handle/validation.errors';
import {
    CreateSubjectErrors,
    GetSubjectErrors,
    GetSubjectsErrors,
    UpdateSubjectErrors,
    BlockSubjectErrors
} from '../error-codes/subject.error-codes';

const createSubjectInput = (req, res, next) => {
    const {jwt} = req.headers;
    const data = req.body;
    try {
        if (!data) throw CreateSubjectErrors.NO_DATA;
        if (!data.MaHocPhan) throw CreateSubjectErrors.NO_MAHOCPHAN;
        if (!data.TenHocPhan) throw CreateSubjectErrors.NO_TENHOCPHAN;
        if (!data.TenHocPhan) throw CreateSubjectErrors.NO_TENHOCPHAN;
        if (!data.LoaiHocPhan) throw CreateSubjectErrors.NO_LOAIHOCPHAN;
        if (!data.TheLoaiHocPhan) throw CreateSubjectErrors.NO_THELOAIHOCPHAN;
        if (!data.SoTinChi) throw CreateSubjectErrors.NO_SOTINCHI;
        if (!jwt) throw CreateSubjectErrors.NO_TOKEN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getAllSubjectInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
      if (!jwt) throw GetSubjectsErrors.NO_TOKEN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getAllSubjectInputBy_SoTinChi = (req, res, next) => {
    const { jwt } = req.headers;
    const data = req.body;
    try {
        if (!jwt) throw GetSubjectsErrors.NO_TOKEN;
        if (!data.SoTinChi) throw CreateSubjectErrors.NO_SOTINCHI;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getSubjectInput = (req, res, next) => {
    const { jwt } = req.headers;
    const subjectId = req.params.subjectId;
    try {
        if (!jwt) throw GetSubjectErrors.NO_TOKEN;
        if (!data.MaHocPhan) throw CreateSubjectErrors.NO_MAHOCPHAN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const updateSubjectInput = (req, res, next) => {
    const { jwt } = req.headers;
    const data= req.body;
    const subjectId = req.params.subjectId;
    try {
        if (!data) throw UpdateSubjectErrors.NO_DATA;
        if (!jwt) throw UpdateSubjectErrors.NO_TOKEN;
        if (!data.MaHocPhan) throw CreateSubjectErrors.NO_MAHOCPHAN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const blockSubjectInput = (req, res, next) => {
    const { jwt } = req.headers;
    const subjectId = req.params.subjectId;
    try {
        if (!jwt) throw BlockSubjectErrors.NO_TOKEN;
        if (!data.MaHocPhan) throw CreateSubjectErrors.NO_MAHOCPHAN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
export default {
    createSubjectInput,
    getAllSubjectInput,
    getSubjectInput,
    updateSubjectInput,
    blockSubjectInput,
    getAllSubjectInputBy_SoTinChi
};
