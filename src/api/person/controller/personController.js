{
  const express = require('express');

  const api = express.Router();

  const personService = require('../service/personService');

  api.get('/', (req, res) => {
    personService.findAll()
      .then((persons) => res.send(persons))
      .catch((err) => res.send(500, err));
  });

  api.get('/:id', (req, res) => {
    personService.findById(req.params.id)
      .then((persons) => res.send(persons))
      .catch((err) => res.send(500, err));
  });

  api.post('/', (req, res) => {
    personService.persist(req.body)
      .then((person) => res.send(person))
      .catch((err) => res.status(500).send(err));
  });

  api.delete('/:id', (req, res) => {
    personService.remove(req.params.id)
      .then(res.send())
      .catch((err) => res.status(500).send(err));
  });

  module.exports = api;
}
