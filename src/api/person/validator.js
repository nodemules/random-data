const _ = require('lodash');

const fields = ['id', 'firstName', 'lastName', 'dateOfBirth', 'dateCreated', 'dateModified'];

module.exports = {
  validate: (person) => {
    var valid = {};
    _.forEach(fields, (field) => {
      valid[field] = person[field];
    });
    return valid;
  }
};
