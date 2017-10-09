const express = require('express');

const {
  json
} = require('body-parser');

const api = require('./src/api/main');

const mariadbConnection = require('mules-sql-wrapper').Connection;

{

  const app = express();

  const config = require.main.require('./.config');

  app.use(json());

  app.use('/api', api);

  mariadbConnection.configure({
    db: config.local.db.mariadb
  });

  mariadbConnection.connect();

  mariadbConnection.ready().then(() => {
    console.log('connected to mariadb');
  }, () => {
    console.log('failed to connect to mariadb');
  });

  app.listen(8080);

}
