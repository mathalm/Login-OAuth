import Sequelize, { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";
import { bancoDeDados } from "../config/connectionDataBase.js";

// const bancoDeDados = new Sequelize("OAuth", "postgres", "Senhaforte06.", {
//   host: "localhost",
//   dialect: "postgres",
// });

export default class ForgetPasswordModel {
  constructor() {
    this.login = bancoDeDados.define("logins", {
      id: {
        type: DataTypes.CHAR,
        primaryKey: true,
      },
      username: {
        type: DataTypes.CHAR,
      },
      password: {
        type: DataTypes.CHAR,
      },
      email: {
        type: DataTypes.CHAR,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
  }
 
  async verifyEmailExists(email) {
    const searchEmail = email.email;
    let data = await this.login.findOne({ attributes: ["username", "email"] ,where: { email: searchEmail } });
    return data;
  }

  updatePassword({email}){
    if(!email) return {error: "E-mail can be empty!"}

    let newPassword = uuidv4().substring(0,6);
    let update = this.login.update({password: bcryptjs.hashSync(newPassword, 3)},{where: {email: email}})

    return newPassword
  }
}
