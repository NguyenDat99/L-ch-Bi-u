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
        // if (!data.MaHocPhan) throw CreateSubjectErrors.NO_NAME;
        // if (!data.subjectId) throw CreateSubjectErrors.NO_SUBJECT_ID;
        // if (!Validator.isMongoId(data.subjectId)) throw CreateSubjectErrors.INVALID_SUBJECT_ID;
        // if (!jwt) throw CreateSubjectErrors.NO_TOKEN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getAllSubjectInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
        //if (!jwt) throw GetSubjectsErrors.NO_TOKEN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getAllSubjectInputBySubjectId = (req, res, next) => {
    const { jwt } = req.headers;
    const data = req.body;
    try {
        if (!jwt) throw GetSubjectsErrors.NO_TOKEN;
        if (!data.subjectId) throw CreateSubjectErrors.NO_SUBJECT_ID;
        if (!Validator.isMongoId(data.subjectId)) throw CreateSubjectErrors.INVALID_SUBJECT_ID;
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
        if (!subjectId) throw GetSubjectErrors.NO_PRODUCT_ID;
        if (!Validator.isMongoId(subjectId)) throw GetSubjectErrors.INVALID_PRODUCT_ID;
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
        if (!subjectId) throw UpdateSubjectErrors.NO_PRODUCT_ID;
        if (!Validator.isMongoId(subjectId)) throw UpdateSubjectErrors.INVALID_PRODUCT_ID;
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
        if (!subjectId) throw BlockSubjectErrors.NO_PRODUCT_ID;
        if (!Validator.isMongoId(subjectId)) throw BlockSubjectErrors.INVALID_PRODUCT_ID;
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
    getAllSubjectInputBySubjectId
};
