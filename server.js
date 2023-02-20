const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/connect-db');
const cors = require('cors');
// const cookieParser = require('cookie-parse');

const errorHandler = require('./middleware/error')
const configs = require('./router/configs');
const category = require('./router/category');
const teams = require('./router/teams');
const players = require('./router/players');
const match = require('./router/match');
const user = require('./router/user');

// lolad the config file 
dotenv.config({ path: path.join(__dirname, 'config', '.env') });

// connect to database 
connectDB();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
// Body parser 
app.use(express.json());

// cookie parser
// app.use(cookieParser());

// Mount routers 
app.use('/api/v1/configs', configs);
app.use('/api/v1/category', category);
app.use('/api/v1/team', teams);
app.use('/api/v1/players', players);
app.use('/api/v1/match', match);
app.use('/api/v1/user', user);
// app.use('/api/v1/teams', "");
// app.use('/api/v1/venue', "");
// app.use('/api/v1/match', "");
// app.use("/api/v1/user", "");
app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});






