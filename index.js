import engine from 'ejs-mate'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url';
import Db from './dataBase/db.js'
import methodOverride from 'method-override'
import postRouter from './router/post.router.js'
import userRouter from './router/user.router.js'
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();
//session imports
import User from './models/User.model.js'
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import flash from "connect-flash";
// import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);



const app = express();
//for ejs-mate
app.engine('ejs', engine);

app.use(express.static(path.join(__dirname, '/public')));
// console.log("Path directory: ", path.join(__dirname, '/public'))
app.set('views', path.join(__dirname, 'views'))
// console.log('Views Directory:', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//cors
const corsOptions = {
  origin: process.env.BASE_URL
}

app.use(cors(corsOptions))


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(cookieParser())

//session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
}));
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



// Passport Local Strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash messages middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  // console.log(req.user);
  // console.log("res.locals.currUser:", res.locals.currUser);
  next();
});


const port = process.env.PORT || 5000;

app.use('/artistans/v2',postRouter)
app.use('/artistans/v2', userRouter)

app.get("/", (req, res) => {
  res.redirect("/artistans/v2/home");
});

// app.use((req, res, next) => { //This middleware checks the local user
//   res.locals.currUser = req.user
//   next()
// })

await Db();
app.listen(port, () => {
  console.log(`App is listening to port ${port}`)
})