import express from 'express';
import {
  createNewCourse,
  createNewUser,
  deleteCourse,
  deleteCourseContent,
  login,
  updateCourseContent,
  getUsersByQuery,
  getAllCourses,
  getCourseById,
  getAllCoursesInfo, updateUser
} from '../contollers';
import {validateCreateNewUser} from "./validations/user";
import requireAuth from "../middleware/require-auth"
import requireAdminAuth from "../middleware/require-admin-auth"

const router = express.Router();
router.route('/signup').post(validateCreateNewUser,createNewUser);
router.route('/signIn').post(login);
router.use('/api',requireAuth);
router.use('/admin',requireAdminAuth);
router.route('/admin/api/course/create').post(createNewCourse);
router.route('/admin/api/course/update').post(updateCourseContent);
router.route('/admin/api/course/delete').post(deleteCourse);
router.route('/admin/api/course/get-by-id').post(getCourseById);
router.route('/admin/api/course/get-info').get(getAllCoursesInfo);
router.route('/admin/api/course/deleteContent').post(deleteCourseContent);
router.route('/admin/api/user/get-by-query').post(getUsersByQuery);
router.route('/admin/api/user/update').post(updateUser);

router.route('/api/course/get-all').get(getAllCourses);

export default router;

