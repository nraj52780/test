
const express =require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const keys=require('./config/keys.js')
const exphbs= require('express-handlebars');
const User=require('./models/User.js');
const Story=require('./models/Story.js');
const cookieParser= require('cookie-parser');
const {truncate,stripTags,formatDate} = require('./helpers/hbs.js');
const session= require('express-session');
const path=require('path');
const passportConfig=require('./config/passport.js')(passport);
const bodyParser=require('body-parser');
const  methodOverride=require('method-override');


//passportConfig(passport);
// load the routes
const authRoute=require('./routes/auth.js');
const indexRoute=require('./routes/index.js');
const storyRoute=require('./routes/stories.js');

const app=express();


// mongoose connection

/*const MongoClient = require('mongodb').MongoClient;
const uri = keys.mongoUri;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("db").collection("users");
  // perform actions on the collection object
  client.close();
});*/

//mongoose.Promise = global.Promise;

//Mongoose connect
mongoose.connect(keys.mongoUri, {useNewUrlParser: true});



//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//method-override
app.use(methodOverride('_method'));

// middleware for the handlebars
app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate

    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.use(cookieParser());

app.use(session({
     secret: 'nitin', 
     resave: false, 
     saveUninitialized: false })
     );

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// global variables so that it can be used in all the pages
app.use((req, res, next)=> {
    res.locals.user = req.user || null;
    
    next();
 });

//use the static files
app.use(express.static(path.join(__dirname,'public')));

//use routes
app.use('/auth',authRoute);
app.use('/',indexRoute);
app.use('/stories',storyRoute);


const port= process.env.port||5000;
app.listen(port,()=>{

    console.log('hi guuyz');
    
});