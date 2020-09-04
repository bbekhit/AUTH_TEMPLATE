const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControllers');

dotenv.config();
const app = express();

const auth = require('./routes/authRoutes');

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const DB = process.env.MONGO_URI;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(err));

app.use('/api/auth/', auth);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html', err => {
      if (err) res.status(500).send(err);
  })
})

app.use(globalErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on port: ${port}`));
