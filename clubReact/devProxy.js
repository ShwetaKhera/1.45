const express = require('express');
const app = express();
const AJV = require('ajv');
const Bundler = require('parcel-bundler');
const { createProxyMiddleware } = require('http-proxy-middleware');

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

const forward = [
  getClubInfo,
  getUserLogin,
  getUserLogout,
  getUserApplicant,
  getAllActivities,
  addNewActivity,
  deleteActivity,
  getAllMembers,
  addNewMember,
  deleteMember,
];
app.use(forward, createProxyMiddleware({ target: 'http://127.0.0.1:3049' }));
const bundler = new Bundler('./index.html');
app.use(bundler.middleware());
app.listen(1234, function () {
  console.log('Example app listening on port 1234');
});
