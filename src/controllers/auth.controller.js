import { User } from "../models/user.model.js";
import { sign } from "jsonwebtoken";

const expireDuration = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: expireDuration,
  });
};

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(409).send("Email and Password are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists.");
    }

    const user = await User.create({
      email,
      password,
    });
    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
      return res.status(500).send("Error: While registering user.");
    }

    return res.status(201).json();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error: Could not register user.");
  }
};
