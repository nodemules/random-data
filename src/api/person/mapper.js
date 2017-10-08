const _ = require('lodash');

function parse(row) {
  return {
    id: parseInt(row.PERSON_ID),
    firstName: row.FIRST_NAME,
    lastName: row.LAST_NAME,
    dateOfBirth: new Date(row.DATE_OF_BIRTH),
    dateCreated: new Date(row.DATE_CREATED),
    dateModified: new Date(row.DATE_MODIFIED)
  };
}

module.exports = {
  parse: (rows) => {
    if (!rows || !rows.length) {
      return {};
    }
    return parse(rows[0]);
  },
  mapRows: (rows) => {
    let persons = [];
    _.forEach(rows, (row) => {
      persons.push(parse(row));
    });
    return persons;
  }
};
