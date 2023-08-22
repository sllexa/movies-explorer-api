require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const routes = require('./routes');
const handelError = require('./middlewares/handelError');
const { PORT, MONGO_DB } = require('./utils/config');

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(handelError);

async function start() {
  try {
    await mongoose.connect(MONGO_DB, { useNewUrlParser: true });
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
