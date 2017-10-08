{
  const express = require('express');

  const api = express.Router();

  const maria = require.main.require('./src/connections/mariadb');

  const personMapper = require.main.require('./src/api/person/mapper');

  const personValidator = require.main.require('./src/api/person/validator');

  const SQL_SELECT_PERSON = 'select * from PERSON where PERSON_ID=:id';

  const SQL_UPDATE_PERSON_STUB = 'FIRST_NAME=:firstName, LAST_NAME=:lastName, DATE_OF_BIRTH=:dateOfBirth';

  const SQL_UPDATE_PERSON = `update PERSON set ${SQL_UPDATE_PERSON_STUB}`;

  const SQL_INSERT_PERSON =
    `insert into PERSON (PERSON_ID, FIRST_NAME, LAST_NAME, DATE_OF_BIRTH)
      values (:id, :firstName, :lastName, :dateOfBirth) on duplicate key update ${SQL_UPDATE_PERSON_STUB}`;

  const SQL_DELETE_PERSON = 'delete from PERSON where PERSON_ID=:id';

  api.get('/', (req, res) => {
    maria.query('select * from PERSON;')
      .then((rows) => res.send(personMapper.mapRows(rows)))
      .catch((err) => {
        console.error(err);
        return res.send(500);
      });
  });

  api.get('/:id', (req, res) => {
    const query = {
      id: req.params.id
    };
    maria.query(SQL_SELECT_PERSON, query)
      .then((rows) => {
        return res.send(personMapper.parse(rows));
      })
      .catch((err) => {
        console.error(err);
        return res.send(500);
      });
  });

  api.post('/', (req, res) => {
    const person = personValidator.validate(req.body);
    maria.query(SQL_INSERT_PERSON, person)
      .then((rows) => {
        person.id = person.id || rows.info.insertId;
        return res.send(person);
      })
      .catch((err) => {
        console.error(err);
        return res.send(500);
      });
  });

  api.delete('/:id', (req, res) => {
    const query = {
      id: req.params.id
    };
    maria.query(SQL_DELETE_PERSON, query)
      .then((rows) => {
        console.log(rows);
        return res.send();
      })
      .catch((err) => {
        console.error(err);
        return res.send(500);
      });
  });

  module.exports = api;
}
