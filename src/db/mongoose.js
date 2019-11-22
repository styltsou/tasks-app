const mongoose = require('mongoose');

const DB_CONNECTION_URI =
  process.env.DB_CONNECTION_URI || 'mongodb://127.0.0.1:27017/task-manager';

mongoose.connect(DB_CONNECTION_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB.');
});
