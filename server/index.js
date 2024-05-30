const express = require('express');
const app = express();
const routes = require('./routes/habitroutes');
const connectDB = require('./db');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT;


app.use(cors());

connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/hb/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/hb/build/index.html'));
});
app.use('/', routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});