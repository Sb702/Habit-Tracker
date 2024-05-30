const express = require('express');
const app = express();
const routes = require('./routes/habitroutes');
const connectDB = require('./db');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT;


app.use(cors());

connectDB();

app.use(express.json());


app.use('/', routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});