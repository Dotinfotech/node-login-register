import { Schema, model } from 'mongoose';

const authModel = new Schema(
	{
		firstName: { type: String },
		username: { type: String },
		email: { type: String },
		password: { type: String },
	},
	{ timestamps: true, versionKey: false }
);

const auth = new model('auth', authModel);

export default auth;
