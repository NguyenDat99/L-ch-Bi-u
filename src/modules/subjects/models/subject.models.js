import mongoose, {
    Schema, Mongoose
} from 'mongoose';
import {
    SubjectStatus
} from '../commons/subject.status';


const SubjectSchema = new Schema({
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
        type: String,
        default: SubjectStatus.ACTIVE,
    },
    YeuCauHocKy:{
      type: Number
    }
    ,
    MaKhoa: {
        type: String
    }
    ,
    thuocTinhPhu: {}
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model('Subject', SubjectSchema);
