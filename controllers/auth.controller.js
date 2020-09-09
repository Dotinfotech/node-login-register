import { hashSync, compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import authModel from '../models/auth.model';

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const checkEmail = await authModel.findOne(
			{ email },
			{ _id: 0, email: 1, password: 1 }
		);
		if (!checkEmail) throw new Error('Can not find user with this email');

		if (checkEmail && checkEmail.email) {
			const checkPassword = compareSync(password, checkEmail.password);

			if (!checkPassword) {
				throw new Error('Password is wrong, Please check again');
			} else if (checkPassword) {
				const secretKey = process.env.SECRETKEY;
				const token = sign({ email }, secretKey);
				res.status(200).json({
					success: true,
					message: 'User LoggedIn Sucessfully',
					token,
				});
			}
		}
	} catch (error) {
		res.status(400).send({ error: true, message: error.message });
	}
};

const register = async (req, res) => {
	try {
		const { firstName, username, email, password } = req.body;

		const checkEmail = await authModel.findOne(
			{ email },
			{ _id: 0, email: 1 }
		);

		if (checkEmail && checkEmail.email) {
			throw new Error('Email already in use');
		}

		if (!checkEmail) {
			const saltRounds = 10;
			const hashPassword = hashSync(password, saltRounds);
			const addUser = new authModel({
				firstName,
				username,
				email,
				password: hashPassword,
			});

			const createUser = await addUser.save();

			createUser &&
				res.status(200).json({
					success: true,
					message: 'User Signup Successfully',
				});
		}
	} catch (error) {
		res.status(400).send({ error: true, message: error.message });
	}
};

export default { register, login };
