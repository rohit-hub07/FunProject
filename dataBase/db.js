import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config

const db = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected to db"))
    .catch((err) => {
      console.log("Failed connecting to db", err);
    });
};

export default db;