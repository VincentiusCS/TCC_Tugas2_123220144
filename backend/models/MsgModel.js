import { Sequelize } from "sequelize";
import db from "../config/Database.js";

// Membuat tabel "user"
const Message = db.define(
  "messages", // Nama Tabel
  {
    notes: Sequelize.STRING,
    pictures: Sequelize.STRING,
  }
);

db.sync().then(() => console.log("Database synced"));

export default Message;
