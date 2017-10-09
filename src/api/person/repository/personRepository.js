{

  const maria = require('mules-sql-wrapper').Connection;

  const personValidator = require.main.require('./src/api/person/validator');
  const personMapper = require.main.require('./src/api/person/mapper');

  const SQL_SELECT_PERSON_BY_ID = 'select * from PERSON where PERSON_ID=:id';

  const SQL_SELECT_ALL_PERSON = 'select * from PERSON;';

  const SQL_UPDATE_PERSON_STUB = 'FIRST_NAME=:firstName, LAST_NAME=:lastName, DATE_OF_BIRTH=:dateOfBirth';

  const SQL_UPDATE_PERSON = `update PERSON set ${SQL_UPDATE_PERSON_STUB} where PERSON_ID=:id`;

  const SQL_INSERT_PERSON =
    `insert into PERSON (PERSON_ID, FIRST_NAME, LAST_NAME, DATE_OF_BIRTH)
      values (:id, :firstName, :lastName, :dateOfBirth)`;

  const SQL_DELETE_PERSON = 'delete from PERSON where PERSON_ID=:id';

  module.exports = {
    add,
    findById,
    findAll,
    remove,
    update
  };

  function add(person) {
    return new Promise((resolve, reject) => {
      let validated = personValidator.validate(person);
      maria.query(SQL_INSERT_PERSON, validated)
        .then((rows) => {
          validated.id = validated.id || rows.info.insertId;
          return resolve(validated);
        })
        .catch((err) => {
          console.error(err);
          return reject(err);
        });
    });
  }

  function findAll() {
    return new Promise((resolve, reject) => {
      maria.query(SQL_SELECT_ALL_PERSON)
        .then((rows) => resolve(personMapper.mapRows(rows)))
        .catch((err) => {
          console.error(err);
          return reject(err);
        });
    });
  }

  function findById(id) {
    return new Promise((resolve, reject) => {
      maria.query(SQL_SELECT_PERSON_BY_ID, {
        id
      }).then((rows) => resolve(personMapper.mapRows(rows)))
        .catch((err) => {
          console.error(err);
          return reject(err);
        });
    });
  }

  function remove(id) {
    return new Promise((resolve, reject) => {
      const query = {
        id
      };
      maria.query(SQL_DELETE_PERSON, query)
        .then(() => {
          return resolve();
        })
        .catch((err) => {
          console.error(err);
          return reject(err);
        });
    });
  }

  function update(person) {
    return new Promise((resolve, reject) => {
      let validated;
      try {
        validated = personValidator.validate(person);
        console.log('attmempting to validate');
      } catch (e) {
        console.log('validation error', e);
        return reject(e);
      }
      maria.query(SQL_UPDATE_PERSON, validated)
        .then((rows) => {
          validated.id = validated.id || rows.info.insertId;
          return resolve(validated);
        })
        .catch((err) => {
          console.error('something bad happened with mariadb');
          console.error(err);
          return reject(err);
        });
    });
  }
}
