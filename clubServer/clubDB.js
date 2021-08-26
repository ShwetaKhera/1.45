const DataStore = require('nedb');
const eventsDB = new DataStore({
  filename: __dirname + '/eventsDB',
  autoload: true,
});
const clubUsersDB = new DataStore({
  filename: __dirname + '/clubUsersDB',
  autoload: true,
});

const events = require('./eventData.json');
const clubUsers = require('./clubUsersHash.json');

eventsDB.insert(events, function (err, newDocs) {
  if (err) {
    console.log('Something went wrong when writing');
    console.log(err);
  } else {
    console.log('Added ' + newDocs.length + ' events');
  }
});

clubUsersDB.insert(clubUsers, function (err, newDocs) {
  if (err) {
    console.log('Something went wrong when writing');
    console.log(err);
  } else {
    console.log('Added ' + newDocs.length + ' clubUsers');
  }
});

// export default { eventsDB, clubUsersDB };
