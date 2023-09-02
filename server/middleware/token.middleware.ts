import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const decodeToken = async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.headers.authorization) {
      throw { message: "You do not have permission to access this resource." };
    }
    if (req.headers.authorization) {
      let tokenBearer = req.headers.authorization;
      let token = tokenBearer.split(" ")[1];
      let tokenIsValid = await jwt.verify(token, process.env.JWT_SECRET!);
      if (!tokenIsValid) {
        throw {
          message: "You do not have permission to access this resource.",
        };
      }
      req.permissions = (<any>tokenIsValid).permissions;
      req.userId = (<any>tokenIsValid).userId;
    }
    next();
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export default decodeToken;
