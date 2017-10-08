{
  const _ = require('lodash');
  const mariasql = require('mariasql');

  const config = require.main.require('./.config');

  let client;

  module.exports = {

    connect: () => {

      client = new mariasql(config.local.db.mariadb);

      client.connect();

    },

    ready: () => {
      return new Promise((resolve, reject) => {
        var debounced = _.debounce(isClientReady, 100);

        function isClientReady(c) {
          if (c.connected) {
            debounced.cancel();
            return resolve();
          }
          if (!c.connecting) {
            debounced.cancel();
            return reject();
          }
          debounced(client);
        }
        debounced(client);
      });
    },

    query: (sql, params) => {
      return new Promise((resolve, reject) => {
        client.query(sql, params, (err, rows) => {
          if (err) {
            return reject(err);
          }
          return resolve(rows, rows.info);
        });
      });
    }

  };
}
