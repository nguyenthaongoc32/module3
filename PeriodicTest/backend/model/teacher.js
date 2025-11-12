import mongoose from 'mongoose';



const teacherSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    isActive: { type: Boolean },
    isDeleted: { type: Boolean },
    code: {
        type: String,
        unique: true,
        require: true,
        match: /^[0-9]{10}$/,
    },
    startDate: Date,
    endDate: Date,
    teacherPositions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teacherPositions' }],
    degrees: [
        {
            type: {
                type: String,
                require: true
            },
            school: String,
            major: String,
            year: { type: Number },
            isGraduated: Boolean
        }
    ],
}, {
    timestamps: true
});
const TeacherModel = mongoose.model('teacher', teacherSchema);
export default TeacherModel;