import mongoose, {
    Schema, Mongoose
} from 'mongoose';
import {
    SubjectStatus
} from '../commons/subject.status';


const SubjectSchema = new Schema({
    subjectName: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    CourseCredit: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: SubjectStatus.ACTIVE,
    },
    subjectId: {
        type: String,
        required: true,
    }
    ,
    properties: {}
}, {
    versionKey: false,
    timestamps: true,
});

export default mongoose.model('Subject', SubjectSchema);
