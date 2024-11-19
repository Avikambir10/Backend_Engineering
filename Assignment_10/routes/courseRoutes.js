
import express from 'express';
const router = express.Router();
import  {getAllCourses,getCourseById,addCourse,updateById,deleteById} from '../controllers/courseControllers.js';

router.route('/')
    .get(getAllCourses)
    .post(addCourse);
router.route('/:id')
    .get(getCourseById)
    .patch(updateById)
    .delete(deleteById);

export default router;
