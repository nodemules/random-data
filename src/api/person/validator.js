const _ = require('lodash');

const Person = require('./model');

const model = Person.model;

function validateType(type, value) {
  switch (type) {
    case Number:
    case String:
      return value === type(value);
    case Date:
      try {
        let d = type(value);
        return !!d;
      } catch (e) {
        return false;
      }
  }
}

module.exports = {
  validate: (person) => {
    _.forEach(model, (v, k) => {
      if (!person[k] && v.required) {
        throw new Error(`Key ${k} is required for ${Person.name} model`);
      }
      if (person[k] && !validateType(v.type, person[k])) {
        throw new Error(`Invalid type ${v.type} found for key: ${k}`);
      }
    });
    _.forEach(person, (v, k) => {
      if (!Person.getValidFields().includes(k)) {
        console.error(`Invalid key ${k} found for ${Person.name} model`);
        delete person[k];
      }
    });
    return person;
  }
};
