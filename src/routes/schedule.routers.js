import express from 'express';
import ScheduleController from '../modules/schedules/controller/schedule.controller';
import ScheduleValidate from '../modules/schedules/middleware/schedule.middleware';
//
const router = express.Router();

//POST
router.post('/schedule', ScheduleValidate.createScheduleInput, ScheduleController.createSchedule);
//
//PUT
//router.put('/schedule/:MaKhoa', ScheduleValidate.updateScheduleInput, ScheduleController.updateSchedule);
// //
//GET
router.get('/schedule/', ScheduleValidate.getAllScheduleInput, ScheduleController.getAllSchedules);
// // lay theo khoa
router.get('/schedule/:MaKhoa', ScheduleValidate.getScheduleInput, ScheduleController.getSchedule);
// // DELETE
// router.delete('/schedule/:schedule_id', ScheduleValidate.blockScheduleInput, ScheduleController.blockSchedule);
export default router;
