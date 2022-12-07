import Sequelize from "sequelize";

export const bancoDeDados = new Sequelize("OAuth", "postgres", "Senhaforte06.", {
  host: "localhost",
  dialect: "postgres",
});
