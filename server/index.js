const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const routes = require('./routes/habitroutes');
const connectDB = require('./db');
const cors = require('cors');
const dotenv = require('dotenv');

app.use(cors());
dotenv.config();

connectDB();

app.use(express.json());

app.use('/', routes);

app.use(express.static(path.join(__dirname, '../client/hb/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/hb/build', 'index.html'));
  });

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});