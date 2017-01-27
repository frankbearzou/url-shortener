const path = require('path');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



const url = process.env.MONGOLAB_URI;

app.set('PORT', process.env.PORT || 5000);

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  console.log(url);

  require('./routes')(app, db);


  app.listen(app.get('PORT'), () =>
    console.log('Example app listening on port 5000!')
  );
});


