import mongoose, {
    Schema, Mongoose
} from 'mongoose';


const SubjectSchema = new Schema({
    MaKhoa: {
        type: String,
        required: true
    },
    TenNganhHoc: {
        type: String,
        required: true
    },status:{
      type: String,
      default: MajorStatus.ACTIVE
    }
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model('Major', SubjectSchema);
