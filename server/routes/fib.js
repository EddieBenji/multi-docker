const express = require('express');
const router = express.Router();

const pgClient = require('../db/pgSetup');
const redisClient = require('../db/redisSetup');
const redisPublisher = redisClient.duplicate();

// MAIN ROUTE: /api/fib
router.get('/', (req, res, next) => {
	res.send('HI');
});

router.get('/all', async (req, res, next) => {
	const values = await pgClient.query('SELECT * FROM values');
	res.send(values.rows);
});

router.get('/values/current', async (req, res, next) => {
	redisClient.hgetall('values', (err, values) => {
		res.send(values);
	});
});

router.post('/values', (req, res, next) => {
	const index = req.body.index;
	if (index > 20) {
		// just for testing purposes.. don't want to lock down my laptop
		return res.status(422).send({
			msg: 'Index too high'
		});
	}
	redisClient.hset('values', index, 'Nothing yet!');

	redisPublisher.publish('insert', index);
	pgClient
		.query('INSERT INTO values(number) VALUES($1)', [index]);

	res.send({
		working: true
	});
});


module.exports = router;
