import React, { Component } from 'react';
import './App.css';
import AuthHelperMethods from './components/AuthHelperMethods';
import withAuth from './components/withAuth';

class App extends Component {

  Auth = new AuthHelperMethods();
  /* Create a new instance of the 'AuthHelperMethods' compoenent*/
  state = {
    username: "",
    password: ""
  }

/* Here will want to add a method to log the user out upon clicking 'Logout' */
  _handleLogout = () => {
    
    this.Auth.logout();
    this.props.history.replace('/login');
  }

  //Render the protected component
  render() {
    let name = null;

    //This will be null until we set up authentication...
    if (this.props.confirm) {
      name = this.props.confirm.username;
    }

    return (
      <div className="App">
        <div className="main-page">
          <div className="top-section">
            <h1>Welcome, {name}</h1>
          </div>
          <div className="bottom-section">
            <button onClick={this._handleLogout}>LOGOUT</button>
          </div>
        </div>
      </div>
    );
  }
}

//In order for this component to be protected, we must wrap it with what we call a 'Higher Order Component' or HOC.
export default withAuth(App);