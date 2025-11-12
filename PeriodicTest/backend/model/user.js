import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, },
  name: String,
  email: { type: String, unique: true, required: true },
  phoneNumber: String,
  address: String,
  identity: String,
  dob: Date,
  isDeleted: { type: Boolean },
  role: {
    type: String,
    enum: ['STUDENT', 'TEACHER', 'ADMIN'],
    required: true
  }
}, {
  timestamps: true
});
const UserModel = mongoose.model('users', userSchema);
export default UserModel;