import {Sequelize} from 'sequelize';
import {connectionString} from "../settings";

export const sequelize = new Sequelize(connectionString);
