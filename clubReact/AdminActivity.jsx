import React from 'react';
import ReactDOM from 'react-dom';

import {
  getAllActivitiesAPI,
  deleteActivityAPI,
  addNewActivityAPI,
} from './api.js';
import events from './eventData.json';

class AdminActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: events,
    };
  }

  componentDidMount() {
    console.log('componentDidMount called');
    this.getClubActivities();
  }

  getClubActivities() {
    fetch(getAllActivitiesAPI)
      .then((res) => res.json())
      .then((value) => {
        console.log(value);
        this.setState({ events: value });
      });
  }

  formatData() {
    let data = [];
    let { events } = this.state;
    console.log(events);
    events.forEach((element) => {
      data.push(
        <tr>
          <td>{element.date}</td>
          <td>{element.movie}</td>
          <td>{element.description}</td>
          <td>{element.time}</td>
          <td>
            <button
              onClick={(e) => {
                this.deleteDataFromList(e, element._id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return data;
  }

  deleteDataFromList(e, id) {
    e.preventDefault();

    fetch(deleteActivityAPI + id, {
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
  addDataToList(e) {
    e.preventDefault();
    let newFormData = {};
    newFormData.date = document.getElementsByName('date')[0].value;
    newFormData.movie = document.getElementsByName('movie')[0].value;
    newFormData.description = document.getElementsByName('desc')[0].value;
    newFormData.time = document.getElementsByName('time')[0].value;
    let newArr = this.state.events;

    fetch(addNewActivityAPI, {
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
  render() {
    return (
      <main>
        <header>
          <h1>1.45 - Activity Management</h1>
        </header>

        <form className="addDataForm">
          <label>Date</label>
          <input name="date" required />
          <label>Movie</label>
          <input name="movie" required />
          <label>Description</label>
          <input name="desc" required />
          <label>Time</label>
          <input name="time" required />

          <p />
          <button onClick={(event) => this.addDataToList(event)}>Add</button>
        </form>
        <table>
          <caption>September Movie Schedule</caption>
          <thead>
            <tr>
              <th>Date</th>
              <th>Movie</th>
              <th>Description</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="tableBody">{this.formatData()}</tbody>
        </table>
      </main>
    );
  }
}

export default AdminActivity;
