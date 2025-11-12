import mongoose from 'mongoose';



const teacherPositionSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: String,
    code: String,
    des: String,
    isActive: { type: Boolean },
    isDeleted: { type: Boolean },
}, {
    timestamps: true,
    collection: 'teacherPositions' 
});
const TeacherPositionModel = mongoose.model('teacherPositions', teacherPositionSchema);
export default TeacherPositionModel;