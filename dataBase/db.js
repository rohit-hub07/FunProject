import mongoose from "mongoose";

const db = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/CollegeProject")
    .then(() => console.log("Connected to db"))
    .catch((err) => {
      console.log("Failed connecting to db", err);
    });
};

export default db;