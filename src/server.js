const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './config/.env' });
require('./db/mongoose');

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up cookie-parser middleware
app.use(cookieParser(process.env.COOKIE_SECRET));

// Mount Auth Router
app.use('/api', authRouter);
// Mount User Router
app.use('/api/users', userRouter);
// Mount Task Router
app.use('/api/tasks', taskRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
