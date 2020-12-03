import mongoose from "mongoose";

export default () => {
  return mongoose.connect(
    `${process.env.DB_CONNECTION}://${process.env.DB_HOST}/${process.env.DB_DATABASE}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
};
