import {Course, CourseContent} from "../models/course";

export const courseContentService = {
  createCourse:createCourse,
  getCourses:getCourses,
  updateCourseContent:updateCourseContent,
  deleteCourseContent:deleteCourseContent,
  deleteCourse:deleteCourse,
  getCourseById:getCourseById,
  getAllCoursesInfo:getAllCoursesInfo
}
 
async function createCourse(req) {
  const course = req.body;

  const courseR = await Course.create(course, {
    include: [{
      model: CourseContent,
      as: 'contents'
    }]
  }).catch(err => {
    const error = {
      message: "Internal Error",
      status: 500
    }

    return error;
  });

  return courseR;
}

async function updateCourseContent(req){
  console.log(req.body)
  const courseContent = req.body;

   await Course.destroy({
    where: {
      courseId: courseContent.courseId
    }
  });

  const courseR = await Course.create(courseContent, {
    include: [{
      model: CourseContent,
      as: 'contents'
    }]
  }).catch(err => {
    console.log(err);
    const error = {
      message: "Internal Error",
      status: 500
    }

    return error;
  });
  
  return courseR;
}

async function getCourses(){
  return await Course.findAll({
    include: ['contents']
  }).catch((err)=>{
    console.log(err);
    const error = {
      message: "Internal Error",
      status: 500
    }

    return error;
  })
}

async function getAllCoursesInfo(){
  return await Course.findAll().catch((err)=>{
    console.log(err);
    const error = {
      message: "Internal Error",
      status: 500
    }

    return error;
  })
}

async function getCourseById(req){
  return await Course.findOne({
    include: ['contents'],
    where:{
      courseId:req.body.courseId
    }
  }).catch((err)=>{
    console.log(err);
    const error = {
      message: "Internal Error",
      status: 500
    }

    return error;
  })
}


function deleteCourseContent(req){
  const {id} = req.body;

  return CourseContent.destroy({
    where: {
      courseContentId: id
    }
  })
}

async function deleteCourse(req) {
  const {courseId} = req.body;

  return Course.destroy({
    where: {
      courseId: courseId
    }
  }).catch((err)=>{
    console.log(err);
    const error = {
      message: "Internal Error",
      status: 500
    }

    return error;
  })
}
