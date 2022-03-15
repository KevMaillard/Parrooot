const express = require('express');
// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
require('dotenv').config({path: './config/.env'})
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const app = express();
const cors = require('cors');


// Auth d'acces à la BDD
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
  app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



//Token d'auth
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});



//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


// Server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})