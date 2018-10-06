
import { getSecrets } from '../secrets.js';
import mongoose from 'mongoose';

// Data base configuration connecting based on local URI
mongoose.connect(getSecrets('dbUri'), { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/users.model')
};