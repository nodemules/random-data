const express = require('express');

const {
  json
} = require('body-parser');

const api = require('./src/api/main');

const mariadbConnection = require('./src/connections/mariadb');

{

  const app = express();

  const config = require.main.require('./.config');

  app.use(json());

  app.use('/api', api);

  // mariadbConnection.configure(config.local.db.mariadb);

  mariadbConnection.connect(config.local.db.mariadb);

  mariadbConnection.ready().then(() => {
    console.log('connected to mariadb');
  }, () => {
    console.log('failed to connect to mariadb');
  });

  // mariadbConnection.testConnection();
  //

  app.listen(8080);

}
