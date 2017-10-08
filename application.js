const express = require('express');

const {
  json
} = require('body-parser');

const api = require('./src/api/main');

const mariadbConnection = require('./src/connections/mariadb');

{

  const app = express();

  app.use(json());

  app.use('/api', api);

  mariadbConnection.connect();

  mariadbConnection.ready().then(() => {
    console.log('connected to mariadb');
  }, () => {
    console.log('failed to connect to mariadb');
  });

  // mariadbConnection.testConnection();
  //

  app.listen(8080);

}
