const express = require('express');
const path =  require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

// Initiliaziones
const server = express();
require('./database');

// Settings
server.set('PORT', process.env.PORT || 3000);
server.set('views',path.join(__dirname,'views'));
server.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(server.get('views'),'layouts'),
    partialsDir: path.join(server.get('views'),'partials'),
    extname: '.hbs'
}));

server.set('view engine','.hbs');


//Middlewares
server.use(express.urlencoded({extended: false}))
server.use(methodOverride('_method'));
server.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))

//Global Variables


//Routes
server.use(require('./routes/index'));
server.use(require('./routes/notes'));
server.use(require('./routes/users'));

//Static Files
server.use(express.static(path.join(__dirname,'public')));

//Server is listenning
server.listen(server.get('PORT'), ()=>{
    console.log('Server on port',server.get('PORT'));
    
});