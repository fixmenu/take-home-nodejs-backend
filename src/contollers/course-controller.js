import {
  courseContentService
} from "../services/course-service";

export const createNewCourse = async (req, res) => {
  const {error, course} = await courseContentService.createCourse(req, res);
  if (error != null) {
    res.status(error.status).json({error});
  } else {
    res.status(200).json({course});
  }
}


export const updateCourseContent = async (req, res) => {
  const {error, course} = await courseContentService.updateCourseContent(req, res);
  if (error) {
    res.status(error.status).json({error});
  } else {
    res.status(200).json({course});
  }
}


export const deleteCourseContent = async (req, res) => {
  courseContentService.deleteCourseContent(req, res)
    .then(content => res.status(200).json())
    .catch(error => {
      console.log(error);
      res.status(500).json(error)
    });
}


export const deleteCourse = async (req, res) => {
   courseContentService.deleteCourse(req, res).then(course => res.status(200).json())
     .catch(error => {
       console.log(error);
       res.status(500).json(error)
     });
}

export const getAllCourses = async (req, res) => {
   courseContentService.getCourses().then(course => res.status(200).json({course}))
     .catch(error => {
       console.log(error);
       res.status(500).json(error)
     });
}
export const getCourseById = async (req, res) => {
  courseContentService.getCourseById(req).then(course => res.status(200).json({course}))
    .catch(error => {
      console.log(error);
      res.status(500).json(error)
    });
}
export const getAllCoursesInfo = async (req, res) => {
  courseContentService.getAllCoursesInfo().then(course => res.status(200).json({course}))
    .catch(error => {
      console.log(error);
      res.status(500).json(error)
    });
}
