const express = require('express');
const app = express();
const session = require('express-session');
const bcrypt = require('bcryptjs');
var AJV = require('ajv');

const memberSchema = require('./memberDataSchema.json');
const activitySchema = require('./activityDataSchema.json');
const applicantSchema = require('./applicantDataSchema.json');

const DataStore = require('nedb');
const eventsDB = new DataStore({
  filename: __dirname + '/eventsDB',
  autoload: true,
});
const clubUsersDB = new DataStore({
  filename: __dirname + '/clubUsersDB',
  autoload: true,
});

// Deployment
// let activities = require('../clubReact/eventData.json');
let port = process.env.PORT || 3049;

// Local
let activities = require('./eventData.json');
let users = require('./clubUsersHash.json');
// let port = 3000;

const cookieName = 'pt9396Sid';
app.use(
  session({
    secret: 'csueb 651 club development',
    resave: false,
    saveUninitialized: false,
    name: cookieName,
    role: 'guest',
  })
);
const setUpSessionMiddleware = function (req, res, next) {
  // console.log(`session object: ${JSON.stringify(req.session)}`);
  // console.log(`session id: ${req.session.id}`);
  if (!req.session.user) {
    req.session.user = { role: 'guest' };
  }
  next();
};

// User this middlewave to restrict paths only to admins
const checkAdminOrMemberMiddleware = function (req, res, next) {
  if (req.session.user.role !== 'admin' && req.session.user.role !== 'member') {
    res.status(401).json({ error: 'Forbidden' });
  } else {
    next();
  }
};

const checkAdminOnlyMiddleware = function (req, res, next) {
  if (req.session.user.role !== 'admin') {
    res.status(401).json({ error: 'Forbidden' });
  } else {
    next();
  }
};

app.use(setUpSessionMiddleware);
app.use(express.static('public'));
app.use(express.static('/'));
// app.use('/static', express.static(path.join(__dirname, 'public')));
//  APIs
const getClubInfo = '/info';

const getUserLogin = '/login';
const getUserLogout = '/logout';
const getUserApplicant = '/applicants';

const getAllActivities = '/user/activity-management/activities';
const addNewActivity = '/admin/activity-management/activities';
const deleteActivity = '/admin/activity-management/activities/:id';

const getAllMembers = '/admin/member-management/members';
const addNewMember = '/admin/member-management/members';
const deleteMember = '/admin/member-management/members/:id';

app.get(getClubInfo, function (req, res) {
  res.send({
    clubName: '1.45 - Silicon Valley Movie Marathon Club',
    ownerName: 'Shweta Khera',
    ownerNetId: 'pt9396',
  });
});

// LOGIN
// {"email": "user@email.com", "password": "Not123456!!!"}
app.post(getUserLogin, express.json({ limit: '2kb' }), function (req, res) {
  console.log(
    `path ` + getUserLogin + ` received: ${JSON.stringify(req.body)}`
  );
  let inputEmail = req.body.email;
  let inputPassword = req.body.password;
  let obj = users.find((o) => {
    let comp = bcrypt.compareSync(inputPassword, o.hashedPassword);
    if (comp && o.email == inputEmail) return o;
  });

  if (obj == undefined) {
    res.status(401).json({ error: true, message: 'User/Password error' });
  } else {
    let oldInfo = req.session.user;
    req.session.regenerate(function (err) {
      if (err) {
        console.log(err);
      }
      let newUserInfo = Object.assign(oldInfo, obj);
      delete newUserInfo.passHash;
      // TODO: remove passhash from data
      req.session.user = newUserInfo;
      res.json(newUserInfo);
    });
  }
});

app.post(
  getUserApplicant,
  express.json({ limit: '0.5kb' }),
  jsonErrors,
  function (req, res) {
    console.log(
      `path ` + getUserApplicant + ` received: ${JSON.stringify(req.body)}`
    );
    var ajv = new AJV();
    let valid = ajv.validate(applicantSchema, req.body);

    if (valid) {
      console.log('Valid data');
      res.sendStatus(200);
    } else {
      console.log(ajv.errors);
      res.sendStatus(422);
    }
  }
);

app.get(getUserLogout, async function (req, res) {
  let options = req.session.cookie;
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    res.clearCookie(cookieName, options); // the cookie name and options
    res.json({ message: 'Goodbye' });
  });
});

// ACTIVITY
app.get(getAllActivities, function (req, res) {
  eventsDB.find({}, function (err, docs) {
    if (err) {
      console.log('something is wrong');
      res.sendStatus(404).statusMessage('Data not found');
    } else {
      console.log('We found ' + docs.length + ' documents');
      console.log(docs);
      res.send(docs);
    }
  });
});

app.post(
  addNewActivity,
  checkAdminOnlyMiddleware,
  express.json({ limit: '1kb' }),
  jsonErrors,
  function (req, res) {
    console.log(
      `path ` + addNewActivity + ` received: ${JSON.stringify(req.body)}`
    );

    var ajv = new AJV();
    let valid = ajv.validate(activitySchema, req.body);
    if (valid) {
      eventsDB.insert(req.body, function (err, docs) {
        if (err) {
          console.log('Err 404: ' + err.message);
          res.sendStatus(404);
        } else {
          console.log('We found ' + docs.length + ' documents');
          console.log(docs);
          res.send(docs);
        }
      });
    } else {
      console.log(ajv.errors);
      res.sendStatus(422);
    }
  }
);

app.delete(
  deleteActivity,
  checkAdminOnlyMiddleware,
  express.json({ limit: '2kb' }),
  jsonErrors,
  function (req, res) {
    console.log(
      `path ` + deleteActivity + ` received: ${JSON.stringify(req.params)}`
    );
    let id = req.params.id;
    eventsDB.remove({ _id: id }, function (err, numRemoved) {
      if (err) {
        console.log('something is wrong');
        res.sendStatus(404).statusMessage('Data not added');
      } else {
        console.log('removed ' + numRemoved);
        res.sendStatus(200);
      }
    });
  }
);

// MEMBERS
app.get(getAllMembers, checkAdminOnlyMiddleware, function (req, res) {
  clubUsersDB.find({}, function (err, docs) {
    if (err) {
      console.log('something is wrong');
      res.statusMessage('Data not found');
      res.sendStatus(404);
    } else {
      console.log('We found ' + docs.length + ' documents');
      console.log(docs);
      res.send(docs);
      // res.sendStatus(201);
    }
  });
});

app.post(
  addNewMember,
  checkAdminOnlyMiddleware,
  express.json({ limit: '0.5kb' }),
  jsonErrors,
  function (req, res) {
    console.log(
      `path ` + addNewMember + ` received: ${JSON.stringify(req.body)}`
    );
    let data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
    };
    data.hashedPassword = bcrypt.hashSync(req.body.password);

    var ajv = new AJV();
    let valid = ajv.validate(memberSchema, data);
    if (valid) {
      clubUsersDB.insert(data, function (err, docs) {
        if (err) {
          console.log('Err 404: ' + err.message);
          res.sendStatus(404);
        } else {
          console.log('We found ' + docs + ' documents');
          console.log(docs);
          res.send(docs);
        }
      });
    } else {
      console.log(ajv.errors);
      res.sendStatus(422);
    }
  }
);

app.delete(
  deleteMember,
  checkAdminOnlyMiddleware,
  express.json({ limit: '2kb' }),
  jsonErrors,
  function (req, res) {
    console.log(
      `path ` + deleteMember + ` received: ${JSON.stringify(req.params)}`
    );
    let id = req.params.id;
    clubUsersDB.remove({ _id: id }, function (err, numRemoved) {
      if (err) {
        console.log('something is wrong');
        res.sendStatus(404).statusMessage('Data not added');
      } else {
        console.log('removed ' + numRemoved);
        res.sendStatus(200);
      }
    });
  }
);

function jsonErrors(err, req, res, next) {
  // prepare and send error response here, i.e.,
  // set an error code and send JSON message
  res.sendStatus(413);
  console.log('JSON err: ' + err);
  return;
}

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
