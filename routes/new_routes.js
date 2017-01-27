const validator = require('validator');

module.exports = (app, db) => {
  app.route('/:url').get((req, res) => {
    const url = req.params.url;
    if (!validator.isNumeric(url)) {
      res.json({'error': 'wrong short url format.'});
    } else {
      let short_url = process.env.APP_URL + url;
      console.log('url: ', url);

      db.collection('url-shortener').findOne({
        'short_url': short_url
      }, (err, doc) => {
        if (err) throw err;

        if (!doc) {
          res.json({'error': `This url ${url} is not in the database.`});
        } else {
          res.redirect(doc.original_url);
        }

      });
    }



  });

  app.get('/new/:url*', function (req, res) {
    const url = req.params.url + req.param(0);
    console.log('new: ', url);

    // invalid url
    if (!validator.isURL(url)) {
      const ret = {
        error: "Wrong url format, make sure you have a valid protocol and real site."
      };

      res.json(ret);
    } else {
      let short_url = process.env.APP_URL + short_link();

      const ret = {
        'original_url': url,
        'short_url': short_url
      };

      save(db, ret);
      res.json({
        'original_url': url,
        'short_url': short_url
      });
    }
    
  });

};

function short_link() {
  return Math.floor(Math.random() * 1000) + 1000;
}

// save obj to db
function save(db, obj) {
  db.collection('url-shortener').insertOne(obj);
}