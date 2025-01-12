import { Response } from 'express';
import jwt from 'jsonwebtoken';

export default function generateToken(userId: string, res: Response) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '3d',
  });
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 86400000),
    sameSite: 'lax',
    httpOnly: true,
    secure: true,
  });
}
