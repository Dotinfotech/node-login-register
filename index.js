import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import authRoute from './routes/auth.route';
require('dotenv').config({ path: '.env' });

const server = express();

import './config/connection';

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

server.use(json());
server.use(helmet());
server.use(cors());

server.use('/auth', authRoute);

server.listen(PORT, () => {
	console.log(`Server Running at http://${HOST}:${PORT}/`);
});
