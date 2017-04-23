/**
 * Created by LukeDogg on 2017/04/23.
 */
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');


const app            = express();

app.locals.moment = require('moment');

const port = 8000;

app.use(bodyParser.json()); // for parsing application/json

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

MongoClient.connect(db.url, function (err, database) {

    if (err) return console.log(err)

    require('./app/routes')(app, database);

app.listen(port, function(){
    console.log('We are live on ' + port);
});
})