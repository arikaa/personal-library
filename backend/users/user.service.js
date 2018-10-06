// User authentication and management in the api

import { getSecrets } from '../secrets.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../helpers/db';
const User = db.User;

module.exports = {
  authenticate,
  getById,
  create,
  update,
  delete: _delete,

};

// authenticate makes sure the username and password match
async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)){
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, getSecrets('secret'));
    return {
      ...userWithoutHash,
      token
    };
  }
}

// getById returns a user specified by their id
async function getById(id){
  return await User.findById(id).select('-hash');
}

// creates a new user
async function create(userParam){
  // validate the username
  if (await User.findOne({ username: userParam.username })){
    throw 'Username "' + userParam.username + '" is already being used.';
  }

  const user = new User(userParam);

  // hash the password
  if (userParam.password){
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  await user.save();
}

// updates the user when the book parameters have changed
async function update(id, userParam){
  const user = await User.findById(id);

  // validate if the user exists
  if (!user) throw 'User not found.';
  if (user.username !== userParam.username && await User.findOne({ username: userParam.username })){
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password){
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam book properties to user
  Object.assign(user.books, userParam.books);
  user.markModified('books');
  await user.save();

}

// delete a user based on id
async function _delete(id){
  await User.findByIdAndRemove(id);
}