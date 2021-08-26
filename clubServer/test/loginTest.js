const fetch = require('node-fetch');
const getCookies = require('./getCookies');
const assert = require('chai').assert;

const urlBase = 'http://localhost:3049';

describe('Login Tests', function () {
  let res;
  let cookies;
  before(async function () {
    res = await fetch(urlBase + '/info');
    cookies = getCookies(res);
  });
  it('Gets 200 status code', function () {
    assert.equal(res.status, 200);
  });
  it('Cookie with appropriate name is returned', function () {
    assert.include(cookies, 'pt9396Sid');
  });

  describe('Login Sequence', function () {
    before(async function () {
      let dummyDataCorrect = {
        email: 'tirrivees1820@outlook.com',
        password: '49OqspUq',
      };

      res = await fetch(urlBase + '/login', {
        method: 'post',
        body: JSON.stringify(dummyDataCorrect),
        headers: {
          'Content-Type': 'application/json',
          cookie: cookies,
        },
      });
    });
    it('Login Good', function () {
      assert.equal(res.status, 200);
    });
    it('User returned', async function () {
      let user = await res.json();
      assert.containsAllKeys(user, ['firstName', 'lastName', 'role']);
    });
    it('Cookie session ID changed', function () {
      let cookie = getCookies(res);
      assert.notEmpty(cookie);
      assert.notEqual(cookie, cookies);
    });

    it('Logout, cookie cleared', async function () {
      let res = await fetch(urlBase + '/logout');
      let cookie = getCookies(res);
      assert.doesNotHaveAnyKeys(cookie);
    });
  });

  describe('Bad Logins', function () {
    let dummyDataWrongEmail = {
      email: 'tirriv0@outlook.com',
      password: '49OqspUq',
    };

    let dummyDataWrongPass = {
      email: 'tirrivees1820@outlook.com',
      password: '49Oqs',
    };

    it('Bad Email', async function () {
      before(async function () {
        res = await fetch(urlBase + '/login', {
          method: 'post',
          body: JSON.stringify(dummyDataWrongEmail),
          headers: {
            'Content-Type': 'application/json',
            cookie: cookies,
          },
        });
        assert.equal(res.status, 401);
      });
    });
    it('Bad Password', async function () {
      before(async function () {
        res = await fetch(urlBase + '/login', {
          method: 'post',
          body: JSON.stringify(dummyDataWrongPass),
          headers: {
            'Content-Type': 'application/json',
            cookie: cookies,
          },
        });
        assert.equal(res.status, 401);
      });
    });
  });
});
