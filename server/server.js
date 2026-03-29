import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import DefaultData from './default.js';
import Router from './routes/route.js';

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

const PORT = process.env.PORT || 8080;

Connection();

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

DefaultData();

export const paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;