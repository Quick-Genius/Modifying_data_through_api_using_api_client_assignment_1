const mongoose = require('mongoose');
require('dotenv').config();

const database = mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error(err));

module.exports = database;