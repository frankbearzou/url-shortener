const newRoutes = require('./new_routes');

module.exports = (app, db) => {

  newRoutes(app, db);
  // ... ...
};