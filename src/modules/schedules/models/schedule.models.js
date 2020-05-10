import mongoose, {
    Schema, Mongoose
} from 'mongoose';
import {
    ScheduleStatus
} from '../commons/schedule.status';


const ScheduleSchema = new Schema({
Ds:{}
},
 {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model('Schedule', ScheduleSchema);
