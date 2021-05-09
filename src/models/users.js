import {sequelize} from "../config/sequelize-config";
import {DataTypes, UUIDV4} from "sequelize";
import bcrypt from "bcrypt";

export const User = sequelize.define('User',{
  userId: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastLogin: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  hooks:{
    beforeCreate(user, options) {
      const salt = bcrypt.genSaltSync();
      user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password,salt) : "";
    },
    beforeUpdate(user, options) {
      user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password,salt) : "";
    }
  },
  sequelize,
  modelName:'User',
  tableName:'users',
  underscored: true
});
