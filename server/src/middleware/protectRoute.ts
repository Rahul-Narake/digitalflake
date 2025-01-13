import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { User } from '../models/user/user.model';

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

interface DecodeToken extends JwtPayload {
  userId: string;
}

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.jwt;

    if (!token || token === undefined) {
      throw new ApiError(401, 'Unauthorized');
    }
    const decodedData = (await jwt.verify(
      token,
      process.env.JWT_SECRET!
    )) as DecodeToken;
    if (!decodedData) {
      throw new ApiError(403, 'forbidden');
    }
    const user = (await User.findById(decodedData.userId)) as { id: string };
    console.log(user);
    if (!user) {
      throw new ApiError(401, 'Unauthorized');
    }
    req.user = user;
    next();
  } catch (error: any) {
    console.log(`error in middleware :${error?.message}`);
    res.status(500).json(new ApiError(500));
  }
};

export default protectRoute;
