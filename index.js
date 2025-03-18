import userRouter from './router/user.router.js'
import engine from 'ejs-mate'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import Db from './dataBase/db.js'
import methodOverride from 'method-Override'


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

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const port = 4000;

app.use('/artistans/v2',userRouter)


Db();
app.listen(port, () => {
  console.log(`App is listening to port ${port}`)
})