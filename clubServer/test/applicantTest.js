const fetch = require('node-fetch');
const getCookies = require('./getCookies');
const assert = require('chai').assert;

const urlBase = 'http://localhost:3049';

describe('Applicant Testing', function () {
  let res;
  let cookies;

  describe('Add Applicant Tests', function () {
    // before(async function () {

    // });
    it('Add good applicant', async function () {
      let dummyDataCorrect = {
        name: "Isidra O'neal",
        email: 'antonin2059@yahoo.com',
        password: '[gbPmf`;',
        area: 'Palo Alto',
      };

      res = await fetch(urlBase + '/applicants', {
        method: 'post',
        body: JSON.stringify(dummyDataCorrect),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      assert.equal(res.status, 200);
    });
    it('Too Long JSON Applicant', async function () {
      let dummyDataCorrect = {
        name: "Isidra O'nealksdweofwofwiefwoe",
        email: 'antonin2059@yahoo.comfwewefniwewe',
        password:
          '[gbPmf`;wiefjwiefjweofjwoeuroweskdjcjnsdicsdncdscjnsdye8hqmkdjqeh47fndkjwiurhfnxop9i90r09jdcmwiefjwiefjweofjwoeuroweskdjcjnsdicsdncdscjnsdye8hqmkdjqeh47fndkjwiurhfnxop9i90r09jdcmwiefjwiefjweofjwoeuroweskdjcjnsdicsdncdscjnsdye8hqmkdjqeh47fndkjwiurhfnxop9i90r09jdcmwiefjwiefjweofjwoeuroweskdjcjnsdicsdncdscjnsdye8hqmkdjqeh47fndkjwiurhfnxop9i90r09jdcmwiefjwiefjweofjwoeuroweskdjcjnsdicsdncdscjnsdye8hqmkdjqeh47fndkjwiurhfnxop9i90r09jdcmwiefjwiefjweofjwoeuroweskdjcjnsdicsdncdscjnsdye8hqmkdjqeh47fndkjwiurhfnxop9i90r09jdcmwiefjwiefjweofjwoeuroweskdjcjnsdicsdncdscjnsdye8hqmkdjqeh47fndkjwiurhfnxop9i90r09jdcm',
        area: 'Palo Alto',
      };

      res = await fetch(urlBase + '/applicants', {
        method: 'post',
        body: JSON.stringify(dummyDataCorrect),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      assert.equal(res.status, 413);
    });
    it('Missing Info applicant', async function () {
      let dummyDataCorrect = {
        name: "Isidra O'neal",
        email: 'antonin2059@yahoo.com',
        password: '[gbPmf`;',
        area: '',
      };

      res = await fetch(urlBase + '/applicants', {
        method: 'post',
        body: JSON.stringify(dummyDataCorrect),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      assert.equal(res.status, 422);
    });
    it('Bad email applicant', async function () {
      let dummyDataCorrect = {
        name: "Isidra O'neal",
        email: 'antonin2059oo.com',
        password: '[gbPmf`;',
        area: '',
      };

      res = await fetch(urlBase + '/applicants', {
        method: 'post',
        body: JSON.stringify(dummyDataCorrect),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      assert.equal(res.status, 422);
    });
  });
});
