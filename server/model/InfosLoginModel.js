import Sequelize, { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";
import { bancoDeDados } from "../config/connectionDataBase.js";

export default class InfosLoginModel {
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
  async saveInBase({ username, password, email }) {
    try {
      let uuid = uuidv4();
      username, password, email;
      var passwordEncrypted = bcryptjs.hashSync(password, 8);

      const data = await this.login.create({
        id: uuid,
        username: username,
        password: passwordEncrypted,
        email: email,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async verifyEmailExists({email}) {
    let data = await this.login.findOne({ attributes: ["username", "email"], where: { email: email } });
    return data;
  }

  async verifyDataToLogin(data) {
    let passwordIsCorrect;
    let searchLogin = await this.login.findOne({
      where: { email: data.email },
    });

    if (searchLogin) {
      await bcryptjs
        .compare(data.password, searchLogin.password)
        .then((res) => {
          passwordIsCorrect = res;
        });
    }
    return { passwordIsCorrect, searchLogin };
  }
}
