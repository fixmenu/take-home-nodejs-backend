import {sequelize} from "../config/sequelize-config";
import Sequelize, {DataTypes} from "sequelize";

export const Course = sequelize.define('Course', {
  courseId: {
    type:Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type:DataTypes.STRING,
    allowNull:false
  },
  lang: {
    type:DataTypes.STRING,
    allowNull:false
  },
  category: {
    type: DataTypes.STRING
  }
},{
  sequelize,
  underscored: true,
  modelName:'Course',
  tableName:'courses',
});

export const CourseContent = sequelize.define('CourseContent', {
  courseContentId:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type:DataTypes.STRING,
    allowNull:false
  },
  order:{
    type:DataTypes.SMALLINT,
  },
  data:{
    type:DataTypes.JSONB
  }
},{
  sequelize,
  underscored: true,
  modelName:'CourseContent',
  tableName:'course_content',
});

Course.contents = Course.hasMany(CourseContent,{as:"contents",foreignKey:"course_id",onDelete:'CASCADE'});
CourseContent.belongsTo(Course, {
  foreignKey: {
    name:'course_id',
    as:'contents',
  }
});
