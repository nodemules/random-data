{
  const _ = require('lodash');

  module.exports = {
    'name': 'Person',
    'model': {
      'id': {
        'type': Number
      },
      'firstName': {
        'type': String,
        'required': true
      },
      'lastName': {
        'type': String,
        'required': true
      },
      'dateOfBirth': {
        'type': Date
      },
      'dateCreated': {
        'type': Date
      },
      'dateModified': {
        'type': Date
      }
    },
    getValidFields: function() {
      let fields = [];
      _.forEach(module.exports.model, (v, k) => {
        fields.push(k);
      });
      return fields;
    }
  };
}
