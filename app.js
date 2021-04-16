require('dotenv').config();
const express = require('express');
const cors = require('cors');
const  mongoose  = require('mongoose');
require('./passport');

const app = express();

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const mongoDb = process.env.DB_CONNECTION_STRING;
mongoose.connect(mongoDb, {useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.listen(process.env.PORT || 3000, () => console.log('Server running'));