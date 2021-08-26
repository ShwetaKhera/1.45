const { expect } = require('chai');
const fetch = require('node-fetch');
const getCookies = require('./getCookies');
const assert = require('chai').assert;

const urlBase = 'http://localhost:3049';

let dummyData = {
  date: '30/10/2020',
  movie: 'Avenger Series',
  description:
    "Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name.",
  time: '10 hours',
};

let dummyBigData = {
  date: '30/10/2020',
  movie: 'Avengers Series',
  description:
    "Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name.Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name.Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name.Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name.Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name.Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name.Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name.Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name.",
  time: '10 hours',
};

let dummyMissingData = {
  date: '30/10/2020',
  movie: '',
  description:
    "Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name.",
  time: '10 hours',
};

describe('Activity Testing', function () {
  let res;
  let body;
  let cookies;
  before(async function () {
    res = await fetch(urlBase + '/user/activity-management/activities');
    body = await res.json();
    fetch(urlBase + '/info').then((res) => (cookies = getCookies(res)));
  });

  describe('Get Activity Tests', function () {
    it('Everything is OK', function () {
      assert.equal(res.status, 200);
    });
    it('Returns an array', function () {
      assert.isArray(body);
    });
    it('All Activity elements have _id, date, description, movie and time', function () {
      body.forEach((element) => {
        expect(element).to.deep.keys(
          'date',
          '_id',
          'description',
          'movie',
          'time'
        );
      });
    });
  });

  describe('Add Activity Tests', function () {
    it('Try add activity w/o logging in', function () {
      fetch(urlBase + '/user/activity-management/activities', {
        method: 'post',
        body: JSON.stringify(dummyData),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        assert.equal(res.status, 404);
      });
    });

    describe('Login and Add activity', function () {
      let dummyCorrectLoginData = {
        email: 'tirrivees1820@outlook.com',
        password: '49OqspUq',
      };

      it('Add good activity', function (done) {
        fetch(urlBase + '/login', {
          method: 'post',
          body: JSON.stringify(dummyCorrectLoginData),
          headers: {
            'Content-Type': 'application/json',
            cookie: cookies,
          },
        }).then((res) => {
          cookies = getCookies(res);
          fetch(urlBase + '/admin/activity-management/activities', {
            method: 'post',
            body: JSON.stringify(dummyData),
            headers: {
              'Content-Type': 'application/json',
              cookie: cookies,
            },
          })
            .then((r) => {
              assert.equal(r.status, 200);
              done();
            })
            .catch(done);
        });
      });

      it('Add too big activity', function (done) {
        fetch(urlBase + '/login', {
          method: 'post',
          body: JSON.stringify(dummyCorrectLoginData),
          headers: {
            'Content-Type': 'application/json',
            cookie: cookies,
          },
        }).then((res) => {
          cookies = getCookies(res);
          fetch(urlBase + '/admin/activity-management/activities', {
            method: 'post',
            body: JSON.stringify(dummyBigData),
            headers: {
              'Content-Type': 'application/json',
              cookie: cookies,
            },
          })
            .then((r) => {
              assert.equal(r.status, 413);
              done();
            })
            .catch(done);
        });
      });

      it('Add missing stuff activity', function () {
        fetch(urlBase + '/login', {
          method: 'post',
          body: JSON.stringify(dummyCorrectLoginData),
          headers: {
            'Content-Type': 'application/json',
            cookie: cookies,
          },
        }).then((res) => {
          cookies = getCookies(res);
          fetch(urlBase + '/admin/activity-management/activities', {
            method: 'post',
            body: JSON.stringify(dummyMissingData),
            headers: {
              'Content-Type': 'application/json',
              cookie: cookies,
            },
          })
            .then((r) => {
              assert.equal(r.status, 422);
              done();
            })
            .catch(done);
        });
      });
    });
  });

  describe('Delete Activity Tests', function () {
    let dummyCorrectData = '6GSwnS0oNyYKIVAY';
    let dummyWrongData = '100';

    it('Try delete w/o logging in', function () {
      fetch(
        urlBase + '/user/activity-management/activities/' + dummyCorrectData,
        {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => assert.equal(res.status, 401));
    });
    it('Login and Delete activity', function () {
      let dummyCorrectLoginData = {
        email: 'tirrivees1820@outlook.com',
        password: '49OqspUq',
      };
      fetch(urlBase + '/login', {
        method: 'post',
        body: JSON.stringify(dummyCorrectLoginData),
        headers: {
          'Content-Type': 'application/json',
          cookie: cookies,
        },
      }).then((res) => {
        if (res.status == 200) {
          fetch(
            urlBase +
              '/user/activity-management/activities/' +
              dummyCorrectData,
            {
              method: 'delete',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          ).then((res) => assert.equal(res.status, 200));
        }
      });
    });
    it('Login and Bad Delete activity', function () {
      let dummyCorrectLoginData = {
        email: 'tirrivees1820@outlook.com',
        password: '49OqspUq',
      };
      fetch(urlBase + '/login', {
        method: 'post',
        body: JSON.stringify(dummyCorrectLoginData),
        headers: {
          'Content-Type': 'application/json',
          cookie: cookies,
        },
      }).then((res) => {
        if (res.status == 200) {
          fetch(
            urlBase + '/user/activity-management/activities/' + dummyWrongData,
            {
              method: 'delete',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          ).then((res) => assert.equal(res.status, 200));
        }
      });
    });
  });
});
