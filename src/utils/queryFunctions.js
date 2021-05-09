import {User} from "../models/users";
import {Course, CourseContent} from "../models/course";

export const userSync = () => User.sync();
export const userTableDrop = () => User.drop();
export const courseSync = () => {
  CourseContent.drop();
  Course.drop();
  Course.sync();
  CourseContent.sync();
}
