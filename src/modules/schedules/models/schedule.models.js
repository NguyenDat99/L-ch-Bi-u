import mongoose, {
    Schema, Mongoose
} from 'mongoose';
import {
    ScheduleStatus
} from '../commons/schedule.status';


const ScheduleSchema = new Schema({
  MaKhoa: {
      type: String,
      required: true,
      MaChuyenNganh: String
  },
  thoiKhoaBieu: {}
}, {
  versionKey: false,
  timestamps: true,
});

export default mongoose.model('Schedule', ScheduleSchema);
