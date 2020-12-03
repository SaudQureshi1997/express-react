import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
  name: { type: String, max: 50 },
  email: { type: String, index: "email", max: 60 },
  password: { type: String, max: 100 },
});

UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.tokenPayload = function () {
  return { email: this.email, _id: this._id, name: this.name };
};

const User = mongoose.model("user", UserSchema);

export default User;
