const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const { PORT, MONGO_DB } = require('./utils/config');

const app = express();

app.use(express.json());
app.use(routes);
async function start() {
  try {
    await mongoose.connect(MONGO_DB, { useNewUrlParser: true });
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
