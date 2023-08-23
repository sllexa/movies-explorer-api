require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const handelError = require('./middlewares/handelError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const { PORT, MONGO_DB, CORS_OPTIONS } = require('./utils/config');

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use(limiter);
app.use(cors(CORS_OPTIONS));
app.use(routes);
app.use(errorLogger);
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
