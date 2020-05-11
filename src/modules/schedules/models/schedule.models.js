import mongoose, {
    Schema, Mongoose
} from 'mongoose';
import {
    ScheduleStatus
} from '../commons/schedule.status';


const ScheduleSchema = new Schema({
  MaHocPhan: {
      type: String,
      required: true
  },
  TenHocPhan: {
      type: String,
      required: true
  },
  LoaiHocPhan: {
      type: String,
      required: true
  },
  TheLoaiHocPhan: {
      type: String,
      required: true
  },
  SoTinChi: {
      type: Number,
      required: true
  },
  MonTienQuyet: {
      type: String
  },
  MonHocTruoc: {
      type: String
  },
  TrangThaiMonHoc: {
      type: String
  },
  YeuCauHocKy:{
    type: Number
  }
  ,
  MaKhoa: {
      type: String,
      required: true,
      MaChuyenNganh: String
  },
  HK:{
    type: Number
  },
  index:{
    type: Number
  }
  ,
  thuocTinhPhu: {}
}, {
  versionKey: false,
  timestamps: true,
});

export default mongoose.model('Schedule', ScheduleSchema);
