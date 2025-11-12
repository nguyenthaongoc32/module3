import express from 'express';
import { getTeacher, postTeacher, getPosition, createTeacherPosition } from '../controller/teacherController.js';
const teacherRoute = express.Router();

teacherRoute.route('/getTeacher').get(getTeacher)
teacherRoute.route('/postTeacher').post(postTeacher)
teacherRoute.route('/getPosition').get(getPosition)
teacherRoute.route('/postPosition').post(createTeacherPosition)
export default teacherRoute;