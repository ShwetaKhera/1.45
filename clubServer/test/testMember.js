const { expect } = require('chai');
const fetch = require('node-fetch');
const getCookies = require('./getCookies');
const assert = require('chai').assert;

const urlBase = 'http://localhost:3049';

describe('Member Testing', function () {
  let res;
  let body;
  let cookie;
  before(function () {
    fetch(urlBase + '/info').then((res) => (cookie = getCookies(res)));
  });
  describe('Get Member Tests', function () {
    it('Try to access as member', function () {
      let dummyCorrectLoginData = {
        email: 'thrower1972@yahoo.com',
        password: ']:_272-,',
      };
      fetch(urlBase + '/login', {
        method: 'post',
        body: JSON.stringify(dummyCorrectLoginData),
        headers: {
          'Content-Type': 'application/json',
          cookie: cookie,
        },
      }).then((res) => {
        if (res.status == 200) {
          fetch(urlBase + '/admin/member-management/members').then((res) =>
            assert.isArray(res.json())
          );
        }
      });
    });

    it('Login as admin', function () {
      let dummyCorrectLoginData = {
        email: 'tirrivees1820@outlook.com',
        password: '49OqspUq',
      };
      fetch(urlBase + '/login', {
        method: 'post',
        body: JSON.stringify(dummyCorrectLoginData),
        headers: {
          'Content-Type': 'application/json',
          cookie: cookie,
        },
      }).then((res) => {
        assert.equal(res.status, 200);
      });
    });
    it('Returns an array', () => {
      fetch(urlBase + '/admin/member-management/members').then((res) => {
        body = res.json();
        assert.isArray(body);
      });
    });
    it('All Activity elements have email and firstName', function () {
      fetch(urlBase + '/admin/member-management/members').then((res) => {
        body = res.json();
        body.forEach((element) => {
          expect(element).to.deep.includes.keys('email', 'firstName');
        });
      });
    });
  });

  describe('Add Member Tests', function () {
    let dummyData = {
      firstName: 'XYCC',
      lastName: 'CBSHH',
      email: 'chihuahua1899@gmail.com',
      password: "'KFNDSKJN",
      role: 'member',
    };

    let dummyBigData = {
      firstName: 'XYCCXYCCXYCCX',
      lastName: 'CSHHCBSHHCBSHH',
      email:
        'chihuahuaCBSHHCBSHHCBuahuaCBSYCCXYCCXYCCXYCCXYCSHHCBSHHCBuahuaCBSYCCXYCCXYCCXYCCXYCSHHCBSHHCBuahuaCBSYCCXYCCXYCCXYCCXYCHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSCXYCCXYCCXYCCXYCCXYCCXYCCHHCBSHHchihuahuaCBSHHCBSHHCBuahuaCBSYCCXYCCXYCCXYCCXYCHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSHHCBSCXYCCXYCCXYCCXYCCXYCCXYCCHHCBSHHCBuahuaCBSHHCBSHHCBuahuaCBSHHCBSHHCBSHHCBSHH1899@gmail.com',
      password: 'HHHCBSHH',
      role: 'member',
    };

    let dummyMissingData = {
      firstName: '',
      lastName: 'CBSHH',
      email: 'chihuahua1899@gmail.com',
      password: '',
      role: 'member',
    };

    it('Try add member w/o logging in', function () {
      fetch(urlBase + '/admin/member-management/members', {
        method: 'post',
        body: JSON.stringify(dummyData),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => assert.equal(res.status, 404));
    });
    describe('Login and Add member', function () {
      let dummyCorrectLoginData = {
        email: 'tirrivees1820@outlook.com',
        password: '49OqspUq',
      };

      it('Add good member', function (done) {
        this.timeout(10000);
        fetch(urlBase + '/login', {
          method: 'post',
          body: JSON.stringify(dummyCorrectLoginData),
          headers: {
            'Content-Type': 'application/json',
            cookie: cookie,
          },
        }).then((res) => {
          cookie = getCookies(res);
          fetch(urlBase + '/admin/member-management/members', {
            method: 'post',
            body: JSON.stringify(dummyData),
            headers: {
              'Content-Type': 'application/json',
              cookie: cookie,
            },
          })
            .then((r) => {
              assert.equal(r.status, 200);
              done();
            })
            .catch(done);
        });
      });

      it('Add too big member', function (done) {
        this.timeout(5000);
        fetch(urlBase + '/login', {
          method: 'post',
          body: JSON.stringify(dummyCorrectLoginData),
          headers: {
            'Content-Type': 'application/json',
            cookie: cookie,
          },
        }).then((res) => {
          cookie = getCookies(res);
          fetch(urlBase + '/admin/member-management/members', {
            method: 'post',
            body: JSON.stringify(dummyBigData),
            headers: {
              'Content-Type': 'application/json',
              cookie: cookie,
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
            cookie: cookie,
          },
        }).then((res) => {
          cookie = getCookies(res);
          fetch(urlBase + '/admin/member-management/members', {
            method: 'post',
            body: JSON.stringify(dummyMissingData),
            headers: {
              'Content-Type': 'application/json',
              cookie: cookie,
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

  describe('Delete Member Tests', function () {
    let dummyCorrectData = 'oTn7ecmJJ4yJHiWg';
    let dummyWrongData = 'oTn7ecmJJ4yJHi';

    it('Try delete w/o logging in', function () {
      fetch(urlBase + '/admin/member-management/members/' + dummyCorrectData, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => assert.equal(res.status, 401));
    });
    it('Login and Delete member', function () {
      let dummyCorrectLoginData = {
        email: 'tirrivees1820@outlook.com',
        password: '49OqspUq',
      };
      fetch(urlBase + '/login', {
        method: 'post',
        body: JSON.stringify(dummyCorrectLoginData),
        headers: {
          'Content-Type': 'application/json',
          cookie: cookie,
        },
      }).then((res) => {
        if (res.status == 200) {
          fetch(
            urlBase + '/admin/member-management/members/' + dummyCorrectData,
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
    it('Login and Bad Delete member', function () {
      let dummyCorrectLoginData = {
        email: 'tirrivees1820@outlook.com',
        password: '49OqspUq',
      };
      fetch(urlBase + '/login', {
        method: 'post',
        body: JSON.stringify(dummyCorrectLoginData),
        headers: {
          'Content-Type': 'application/json',
          cookie: cookie,
        },
      }).then((res) => {
        if (res.status == 200) {
          fetch(
            urlBase + '/admin/member-management/members/' + dummyWrongData,
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
