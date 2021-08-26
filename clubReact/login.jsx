import React from 'react';
import ReactDOM from 'react-dom';
import { getUserLoginAPI } from './api';

import Refresh from './images/refresh.png';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  getUserLogin() {
    console.log('User login');
    let { email, password } = this.state;
    this.setState({ loading: true });
    fetch(getUserLoginAPI, {
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

  updateStateValue(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    let { email, password, loading } = this.state;
    return (
      <main className="login">
        <header>
          <h1>1.45 - Login Page</h1>
        </header>

        <form>
          <label>Email</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => this.updateStateValue(e)}
            spellCheck="false"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => this.updateStateValue(e)}
            required
          />

          <p />
          <button type="button" onClick={() => this.getUserLogin()}>
            Login
          </button>
          <p />
          <img src={Refresh} hidden={!loading} />
        </form>
      </main>
    );
  }
}
// export default Login;
