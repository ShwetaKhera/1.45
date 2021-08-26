**Student Name: Shweta Khera**

**NetID: pt9396**

# Homework #12 Solutions

## Question 1

### (a)

Method called on click of login button:

```js
getUserLogin() {
   console.log('User login');
   let { email, password } = this.state;
   this.setState({ loading: true });
   fetch('/login', {
     method: 'POST',
     headers: {
       'Content-type': 'application/json',
     },
     body: JSON.stringify({
       email,
       password,
    }),
  })
    .then((res) => res.json())
    .then((value) => {
      if (value.role) {
        this.props.changeRole(value.role);
      }
    })
    .finally(() => this.setState({ loading: false }));
}
```

Result of login

![Result of login](./images/Q1a.jpg)

### (b)

Logout calls

![Logout calls](./images/Q1b.jpg)

## Question 2

### (a)

### (b)

Fetching Activities

![Fetching Activities](./images/Q2b.jpg)

```js
import React from 'react';
import ReactDOM from 'react-dom';

let formatData = (events) => {
  let data = [];
  events.forEach((element) => {
    data.push(
      <tr>
        <td>{element.date}</td>
        <td>{element.movie}</td>
        <td>{element.description}</td>
        <td>{element.time}</td>
      </tr>
    );
  });
  return data;
};

export default class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
    };
  }

  componentDidMount() {
    console.log('componentDidMount called');
    this.getClubActivities();
  }

  getClubActivities() {
    fetch('/user/activity-management/activities')
      .then((res) => res.json())
      .then((value) => {
        console.log(value);
        // changeRole('guest');
        // displayPage('home');
        this.setState({ activities: value });
      });
  }

  render() {
    return (
      <main>
        <header>
          <h1>1.45 - Club Activities</h1>
        </header>

        <svg
          height="21"
          viewBox="0 0 21 21"
          width="21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke="#2a2e3b"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(4 2)"
          >
            <path d="m6.5 16.5407715c4-4.4500928 6-7.78586659 6-10.00732153 0-3.33218241-2.6862915-6.03344997-6-6.03344997s-6 2.70126756-6 6.03344997c0 2.22145494 2 5.55722873 6 10.00732153z" />
            <circle cx="6.5" cy="6.5" r="2.5" />
          </g>
        </svg>
        <svg
          height="21"
          viewBox="0 0 21 21"
          width="21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke="#2a2e3b"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(1 2)"
          >
            <path d="m7.5.5c1.65685425 0 3 1.34314575 3 3v1c0 1.65685425-1.34314575 3-3 3s-3-1.34314575-3-3v-1c0-1.65685425 1.34314575-3 3-3zm7 14c0-.2427251 0-.4854502 0-.7281753 0-3.1864098-3.6862915-5.2718247-7-5.2718247s-7 2.0854149-7 5.2718247v.7281753c0 .5522847.44771525 1 1 1h12c.5522847 0 1-.4477153 1-1z" />
            <path
              d="m11.5199327.67783074c1.1547685.41741154 1.9800673 1.52341097 1.9800673 2.82216926v1c0 1.29707884-.8231657 2.40189702-1.9755891 2.82054652.6579909-.79913412.9865095-1.90625342.9855555-3.32135789s-.3309652-2.52222377-.9900337-3.32135789zm4.9800673 14.82216926h1c.5522847 0 1-.4477153 1-1 0-.2427251 0-.4854502 0-.7281753 0-2.1698712-1.7094418-3.82917861-3.8465775-4.66705336 0 0 2.8465775 2.39522866 1.8465775 6.39522866z"
              fill="#2a2e3b"
            />
          </g>
        </svg>
        <svg
          height="21"
          viewBox="0 0 21 21"
          width="21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke="#2a2e3b"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(2 2)"
          >
            <circle cx="8.5" cy="8.5" r="8" />
            <circle cx="8.5" cy="8.5" r="4" />
            <path d="m11.5 5.5 2.5-2.5" />
            <path d="m11.5 14 2.5-2.5" transform="matrix(0 1 -1 0 25.5 0)" />
            <path d="m3 14 2.5-2.5" transform="matrix(-1 0 0 -1 8.5 25.5)" />
            <path d="m3 5.5 2.5-2.5" transform="matrix(0 -1 1 0 0 8.5)" />
          </g>
        </svg>

        <h3>Activity Types</h3>
        <ul>
          <li>Harry Potter Mania</li>
          <li>The Hobbit World</li>
        </ul>

        <h3>Activity Schedule</h3>
        <table>
          <caption>September Movie Schedule</caption>
          <thead>
            <tr>
              <th>Date</th>
              <th>Movie</th>
              <th>Description</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody id="tableBody">{formatData(this.state.activities)}</tbody>
        </table>
      </main>
    );
  }
}
```

## Question 3

### (a)

```js
  addDataToList(e) {
    e.preventDefault();
    let newFormData = {};
    newFormData.date = document.getElementsByName('date')[0].value;
    newFormData.movie = document.getElementsByName('movie')[0].value;
    newFormData.description = document.getElementsByName('desc')[0].value;
    newFormData.time = document.getElementsByName('time')[0].value;
    let newArr = this.state.events;

    fetch('/admin/activity-management/activities', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newFormData),
    })
      .then((res) => res.json())
      .then((value) => {
        this.state.events.push(value);
        this.setState({
          events: this.state.events,
        });
      });
  }
```

### (b)

![Before](./images/Q3b1.jpg)

![After](./images/Q3b2.jpg)

## Question 4

### (a)

```js
deleteDataFromList(e, id) {
    e.preventDefault();

    fetch('/admin/activity-management/activities/' + id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    }).then(() => {
      let newArr = this.state.events.filter((item) => item._id !== id);
      console.log(newArr);
      this.setState({ events: newArr });
    });
  }
```

### (b)

![Before](./images/Q4b1.jpg)

![After](./images/Q4b2.jpg)

## Question 5

### (a)

### (b)

[Student 49 Club App](https://www.drbsclasses.org/student49/node/)
