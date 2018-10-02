// define user routes for the api

import express from 'express';
import userService from './user.service';
const router = express.Router();

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/current', getCurrent); // TODO: use / for getCurrent
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next){
  userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

function register(req, res, next){
  userService.create(req.body)
  .then(() => res.json({}))
  .catch(err => next(err));
}

function getCurrent(req, res, next) {
  userService.getById(req.user.sub)
      .then(user => user ? res.json(user) : res.sendStatus(404))
      .catch(err => next(err));
}

function getById(req, res, next) {
  userService.getById(req.params.id)
      .then(user => user ? res.json(user) : res.sendStatus(404))
      .catch(err => next(err));
}

function update(req, res, next) {
  console.log('id: ', req.params.id);
  console.log('body: ', req.body);
  userService.update(req.params.id, req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
}

function _delete(req, res, next) {
  userService.delete(req.params.id)
      .then(() => res.json({}))
      .catch(err => next(err));
}