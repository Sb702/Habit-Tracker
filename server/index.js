const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const routes = require('./routes/habitroutes');
const connectDB = require('./db');
const cors = require('cors');

app.use(cors());

connectDB();

app.use(express.json());

app.use('/', routes);

app.use(express.static(path.join(__dirname, '../client/hb/build')));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});