const keys = require('./keys');

// express app setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/fib');

const app = express();
app.use(cors());
app.use(bodyParser.json());


// pg client setup
// const pgClient = require('./db/pgSetup');

// Redis client setup (connection pg-redis)
// const redisClient = require('./db/redisSetup');

// express route handlers
app.use('/fib', routes);

app.listen(5000, err => {
	console.log('listening');
});
