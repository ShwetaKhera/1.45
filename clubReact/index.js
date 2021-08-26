import React from 'react';
import ReactDOM from 'react-dom';

import Menu from './menu';
import Home from './home';
import Activities from './activities';
import Login from './login';
import Membership from './membership';
import AdminActivity from './AdminActivity';

import events from './eventData.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    // Application state variables:
    // *role* is for RBAC == "role based access control"
    // we have "guest", "member", and "admin"
    //
    this.state = { role: 'guest', show: 'home' };
    this.changeRole = this.changeRole.bind();
  }

  displayPage(show) {
    this.setState({ show });
  }

  changeRole = (role) => {
    console.log('Role: ' + role);
    this.setState({ role: role, show: 'activities' });
  };
  render() {
    let content = <Home />;
    let { role, show } = this.state;
    if (show == 'home') content = <Home />;
    else if (show == 'activities') content = <Activities events={events} />;
    else if (show == 'login') content = <Login changeRole={this.changeRole} />;
    else if (show == 'membership') content = <Membership />;
    else if (show == 'manage_activities') content = <AdminActivity />;

    return (
      <>
        <Menu
          role={role}
          show={show}
          displayPage={this.displayPage.bind(this)}
          changeRole={this.changeRole}
        />
        {content}
        {/* <AdminActivity events={events}/> */}
      </>
    );
  }
}
// Now rendering the App component!
ReactDOM.render(<App />, document.getElementById('root'));
