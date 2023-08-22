const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { PORT = 3000, MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb'} = process.env

app.use(express.json());

async function start() {
  try {
    await mongoose.connect(MONGO_DB, { useNewUrlParser: true });
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
