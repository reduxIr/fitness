
const CONFIG = require('./Config/Config');



const express = require('express');
const app = express();
const Router = require('./App/Router/Router');
const DB = require('./App/Module/DB/DB');
const User = require('./App/Module/User/User');
const Training = require('./App/Module/Training/Training');

const db = new DB(CONFIG);
const bodyParser = require('body-parser');


app.use(bodyParser.json());


app.use(
    Router(express.Router(),    
    new User(db), 
    new Training(db))
    );
app.use(express.static('public'));

app.listen(CONFIG.express.port, () => console.log("It's work!"));