import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controlers/register.js';
import handleSignin from './controlers/signin.js';
import handleProfileGet from './controlers/profile.js';
import handleImage from './controlers/image.js';
import handleApiCall from './controlers/apiCall.js';

const db = knex({
  client: 'postgres',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'logmeinyahya',
    database : 'face_detector'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('it works!')
})

app.post('/signin', (req, res) => {
	handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
	handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
	handleProfileGet(req, res, db)
})

app.put('/image', (req, res) => {
	handleImage(req, res, db)
})

app.post('/apiCall', (req, res) => {
	handleApiCall(req, res)
})

app.listen(process.env.PORT || 3001, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})