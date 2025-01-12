import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { createUser } from '../services/user.services';
import { IUser, User } from '../models/user/user.model';
import { ApiResponse } from '../utils/ApiResponse';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken';
export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const reqBody: IUser = await req.body;
    if (!reqBody.email || !reqBody.name || !reqBody.password) {
      res.json(new ApiError(411, 'All feilds required'));
    }
    const existingUser = await User.findOne({
      $or: [{ email: reqBody.email }],
    });
    if (existingUser) {
      res
        .status(400)
        .json(new ApiError(400, 'User already exists with given email'));
    }
    const user = await createUser(reqBody);
    await generateToken(user.id, res);
    res.status(201).json(new ApiResponse(201, 'User created successfully'));
  } catch (error) {
    throw new ApiError(500, 'Internal Server error');
  }
};

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const reqBody = await req.body;
    if (!reqBody.email || !reqBody.password) {
      throw new ApiError(400, 'Invalid data');
    }
    const user = await User.findOne({ $or: [{ email: reqBody.email }] });
    if (!user) {
      res.status(400).json(new ApiError(400, 'Invalid email or password'));
    }
    const isValid = await bcrypt.compare(reqBody.password, user?.password!);
    if (!isValid) {
      res.status(403).json(new ApiError(403, 'Invalid username or password'));
    }
    generateToken(user?.id, res);
    res.status(200).json(new ApiResponse(200, 'User signed successfully'));
  } catch (error) {
    throw new ApiError(500, 'Internal Server error');
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json(new ApiResponse(200, {}, 'Logged out successfully'));
  } catch (error) {
    throw new ApiError(500, 'Error while signing out');
  }
};
