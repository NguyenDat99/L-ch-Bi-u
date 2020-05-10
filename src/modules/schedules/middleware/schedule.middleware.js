import Validator from 'validator';
import ValidationError from '../../../errors-handle/validation.errors';
import {
    CreateScheduleErrors,
    GetScheduleErrors,
    GetSchedulesErrors,
    UpdateScheduleErrors,
    BlockScheduleErrors
} from '../error-codes/schedule.error-codes';

const createScheduleInput = (req, res, next) => {
    const {jwt} = req.headers;
    const data = req.body;
    try {
        // if (!data) throw CreateScheduleErrors.NO_DATA;
        // if (!data.MaHocPhan) throw CreateScheduleErrors.NO_NAME;
        // if (!data.scheduleId) throw CreateScheduleErrors.NO_SCHEDULE_ID;
        // if (!Validator.isMongoId(data.scheduleId)) throw CreateScheduleErrors.INVALID_SCHEDULE_ID;
        // if (!jwt) throw CreateScheduleErrors.NO_TOKEN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getAllScheduleInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
        if (!jwt) throw GetSchedulesErrors.NO_TOKEN;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getAllScheduleInputByScheduleId = (req, res, next) => {
    const { jwt } = req.headers;
    const data = req.body;
    try {
        if (!jwt) throw GetSchedulesErrors.NO_TOKEN;
        if (!data.scheduleId) throw CreateScheduleErrors.NO_SCHEDULE_ID;
        if (!Validator.isMongoId(data.scheduleId)) throw CreateScheduleErrors.INVALID_SCHEDULE_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const getScheduleInput = (req, res, next) => {
    const { jwt } = req.headers;
    const scheduleId = req.params.scheduleId;
    try {
        if (!jwt) throw GetScheduleErrors.NO_TOKEN;
        if (!scheduleId) throw GetScheduleErrors.NO_PRODUCT_ID;
        if (!Validator.isMongoId(scheduleId)) throw GetScheduleErrors.INVALID_PRODUCT_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const updateScheduleInput = (req, res, next) => {
    const { jwt } = req.headers;
    const data= req.body;
    const scheduleId = req.params.scheduleId;
    try {
        if (!data) throw UpdateScheduleErrors.NO_DATA;
        if (!jwt) throw UpdateScheduleErrors.NO_TOKEN;
        if (!scheduleId) throw UpdateScheduleErrors.NO_PRODUCT_ID;
        if (!Validator.isMongoId(scheduleId)) throw UpdateScheduleErrors.INVALID_PRODUCT_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
const blockScheduleInput = (req, res, next) => {
    const { jwt } = req.headers;
    const scheduleId = req.params.scheduleId;
    try {
        if (!jwt) throw BlockScheduleErrors.NO_TOKEN;
        if (!scheduleId) throw BlockScheduleErrors.NO_PRODUCT_ID;
        if (!Validator.isMongoId(scheduleId)) throw BlockScheduleErrors.INVALID_PRODUCT_ID;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};
export default {
    createScheduleInput,
    getAllScheduleInput,
    getScheduleInput,
    updateScheduleInput,
    blockScheduleInput,
    getAllScheduleInputByScheduleId
};
