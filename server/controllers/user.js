import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { LocalUser, GoogleUser } from "../models/user.js";

export const googleLogin = async (req, res) => {
  try {
    const { googleUserId, email, name } = req.body;

    if (!googleUserId || !email || !name) {
      return res.status(400).json({ message: "Incomplete user details provided" });
    }

    let isExistingUser = await GoogleUser.findOne({ googleUserId });

    if (!isExistingUser) {
      const newUser = new GoogleUser({
        googleUserId,
        email,
        name,
      });

      await newUser.save();

      // Create a JWT token
      const token = jwt.sign({ userId: newUser._id }, "yourSecretKey", { expiresIn: "1h" });

      return res.status(200).json({ message: "Google User Created Successfully", user: newUser, token });
    }
    // Create a JWT token for the existing user
    const token = jwt.sign({ userId: isExistingUser._id }, "yourSecretKey", { expiresIn: "1h" });

    res.status(200).json({ message: "User Already Exist", user: isExistingUser, token });

  } catch (error) {
    console.error("Error in google Login", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signin = async (req, res) => {

  const { email, password } = req.body;

  try {
    const existingUser = await LocalUser.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {

  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await LocalUser.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    if (password === confirmPassword) {
      return res.status(400).json({ message: "Passwords is not same" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const result = await LocalUser.create({
      email,
      password: hashedPassword,
      name: `${firstName}  ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });
    res.status(200).json({ result: result, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
