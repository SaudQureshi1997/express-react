import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {type: String, max: 50},
  email: { type: String, index: "email", max: 60 },
  password: { type: String, max: 100 },
});

const User = mongoose.model('user', UserSchema);

export default User;