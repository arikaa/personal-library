// user authentication and management in the api

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

async function getById(id){
  return await User.findById(id).select('-hash');
}

async function create(userParam){
  // validate
  if (await User.findOne({ username: userParam.username })){
    throw 'Username "' + userParam.username + '" is already being used.';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password){
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}

async function update(id, userParam){
  const user = await User.findById(id);

  // validate
  if (!user) throw 'User not found.';
  if (user.username !== userParam.username && await User.findOne({ username: userParam.username })){
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password){
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }
  console.log('books: ', userParam.books);
  await User.updateOne({ _id: id }, { books: userParam.books }, { upsert: true }, function(err, raw){
    if (err) return err;
    console.log('response: ', raw);
  })

  const newuser = await User.findById(id);
  console.log('new user:', newuser);


  // copy userParam properties to user
  /*   Object.assign(user.books, userParam.books);
  user.markModified('books');
  console.log('updated user: ', user);
  await user.save();
  console.log('user: ', user); */

}

async function _delete(id){
  await User.findByIdAndRemove(id);
}