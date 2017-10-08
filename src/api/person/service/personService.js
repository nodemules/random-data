{
  const personRepository = require('../repository/personRepository');

  module.exports = {
    add,
    findById,
    findAll,
    persist,
    remove,
    update
  };

  function add(person) {
    return new Promise((resolve, reject) => {
      personRepository.add(person).then(resolve, reject);
    });
  }

  function findById(id) {
    return new Promise((resolve, reject) => {
      personRepository.findById(id).then(resolve, reject);
    });
  }

  function findAll() {
    return new Promise((resolve, reject) => {
      personRepository.findAll().then(resolve, reject);
    });
  }

  function persist(person) {
    return new Promise((resolve, reject) => {
      if (person.id) {
        return update(person).then(resolve, reject);
      }
      return add(person).then(resolve, reject);
    });
  }

  function remove(id) {
    return new Promise((resolve, reject) => {
      personRepository.remove(id).then(resolve, reject);
    });
  }

  function update(person) {
    return new Promise((resolve, reject) => {
      personRepository.update(person).then(resolve, reject);
    });
  }
}
