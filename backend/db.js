const mongoose = require('mongoose');
const loadInitData = require('./initData');

const connectToDB = (dbUri) => {
  console.log('Connecting to ', dbUri);
  mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});
  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Successfully connected to the database ', dbUri);
    loadInitData();
  });

  db.on('error', (err) => {
    console.log('Trouble connecting to the db: ' + err);
    connectToDB(dbUri);
    process.exit();
  });
};

module.exports = connectToDB;
