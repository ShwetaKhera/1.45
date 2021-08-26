const fetch = require('node-fetch');

let dummyData = {
  firstName: 'XYCC',
  lastName: 'CBSHH',
  email: 'chihuahua1899@gmail.com',
  password: "'KFNDSKJN",
  role: 'member',
};
fetch('http://localhost:3000/admin/member-management/members', {
  method: 'post',
  body: JSON.stringify(dummyData),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.text())
  .then((json) => console.log(json));
