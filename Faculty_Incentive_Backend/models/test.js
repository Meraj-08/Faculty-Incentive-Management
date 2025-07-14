import User from './userSchema.js'
import mongoose  from 'mongoose';
const CONNECTION_URL = process.env.MONGO_URL;
const db = mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => console.log(`${error} - did not connect`));
User.find({})
    .then(users => {
        console.log(users);
    })
    .catch(err => {
        console.error('Error retrieving users:', err);
    });
