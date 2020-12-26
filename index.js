const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

//connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {console.log('Connected to DB')}
);

//Middleware 
app.use(express.json());

//route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3030, () => {
    console.log("Server up and running");
});