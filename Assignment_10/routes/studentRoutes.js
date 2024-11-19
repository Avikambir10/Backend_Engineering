import express from 'express';
const router = express.Router();
import {getStudentsData,getByID,addStudent,updateStudentData,deleteStudent,enrollStudent} from '../controllers/studentControllers.js';

router.route('/')
    .get(getStudentsData)
    .post(addStudent);

router.route('/:id')
    .get(getByID)
    .patch(updateStudentData)
    .delete(deleteStudent);

router.route('/:id/:courseID')
    .post(enrollStudent);

export default router;  