import mongoose, {
    Schema, Mongoose
} from 'mongoose';
import {
    ScheduleStatus
} from '../commons/schedule.status';


const ScheduleSchema = new Schema({
    HocKy:{
      type: Number,
      required: true
    },
    DanhSachMonHoc: {}
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model('Schedule', ScheduleSchema);
