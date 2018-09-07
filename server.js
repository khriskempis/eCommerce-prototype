const express = require('express');
const mongoose = require('mongoose'); 
const morgan = require('morgan'); 
const passport = require('passport'); 


const { router: itemsRouter } = require('./items');
// const { router: usersRouter } = require('./users');
// const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

mongoose.Promise = global.Promise; 

const { PORT, DATABASE_URL } = require('./config'); 


const app = express();

app.use(express.static('public'));

app.use(morgan('common')); 

// CORS 
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE'); 
	if (req.method === 'OPTIONS') {
		return res.send(204);
	}
	next(); 
});

// passport.use(localStrategy); 
// passport.use(jwtStrategy);

app.use('/items', itemsRouter);
// app.use('/users', usersRouter);
// app.use('/auth', authRouter);

// const jwtAuth = passport.authenticate('jwt', { session: false });

app.use('*', (req, res) => {
	return res.status(404).json({ message: "Not Found"});
});

let server;

function runServer(databaseUrl, port = PORT) {

	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, { useNewUrlParser: true }, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening on port ${port}`);
				resolve(); 
			})
				.on('error', err => {
					mongoose.disconnect();
					reject(err); 
				});
		});
	});
}

function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing Server');
			server.close(err => {
				if (err) {
					return reject(err); 
				}
				resolve();
			});
		});
	});
}

if (require.main === module) {
	runServer(DATABASE_URL).catch(err => console.error(err));
}


module.exports = { app, runServer, closeServer };