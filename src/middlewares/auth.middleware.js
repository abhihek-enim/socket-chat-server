import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const userAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.json(new ApiResponse(400, {}, "Login again."));
  }
  const tokenDecode = jwt.verify(authorization, process.env.JWT_KEY);
  const user = await User.findById(tokenDecode.id).select("-password");
  //   console.log(user);
  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }

  req.user = user;
  next();
};
