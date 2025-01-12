import { IUser, User } from '../models/user/user.model';
import bcrypt from 'bcrypt';

export const createUser = async (userData: IUser) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const user = new User({ ...userData, password: hashedPassword });
  return await user.save();
};
