const keys = require('../keys');


// pg client setup
const { Pool } = require('pg');
const pgClient = new Pool({
	user: keys.pgUser,
	host: keys.pgHost,
	database: keys.pgDatabase,
	password: keys.pgPassword,
	port: keys.pgPort
});

pgClient.on('error', (err) => {
	console.log('Lost PG connection');
	console.log('Error: ', err);
});

pgClient
	.query('CREATE TABLE IF NOT EXISTS values (number INT)')
	.catch((error) => console.log('error: ', error));

module.exports = pgClient;
