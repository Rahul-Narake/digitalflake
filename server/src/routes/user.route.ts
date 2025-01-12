import express from 'express';
import {
  createUserHandler,
  loginUserHandler,
  logoutHandler,
} from '../controllers/user.controller';
const router = express.Router();

router.route('/signup').post(createUserHandler);
router.route('/login').post(loginUserHandler);
router.route('/logout').get(logoutHandler);

export default router;
