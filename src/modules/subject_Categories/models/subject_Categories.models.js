import mongoose, {
    Schema, Mongoose
} from 'mongoose';


const SubjectSchema = new Schema({
    tenTheLoaiHocPhan: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model('subject_Categories', SubjectSchema);
