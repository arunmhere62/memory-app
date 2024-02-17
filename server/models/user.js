import mongoose from "mongoose";

const localUserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
});

const googleUserSchema = mongoose.Schema({
  googleUserId: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
  },
});

const LocalUser = mongoose.model("LocalUser", localUserSchema);
const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);

export { LocalUser, GoogleUser };
