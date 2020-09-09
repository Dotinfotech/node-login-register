import { Router } from 'express';
import authController from '../controllers/auth.controller';

export default Router()
	.post('/login', authController.login)
	.post('/register', authController.register);
