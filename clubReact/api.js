const base = 'https://www.drbsclasses.org/student49/node';

const getUserLoginAPI = base + '/login';
const getUserLogoutAPI = base + '/logout';

const getAllActivitiesAPI = base + '/user/activity-management/activities';
const addNewActivityAPI = base + '/admin/activity-management/activities';
const deleteActivityAPI = base + '/admin/activity-management/activities/:id';

export {
  getUserLoginAPI,
  getUserLogoutAPI,
  getAllActivitiesAPI,
  addNewActivityAPI,
  deleteActivityAPI,
};
