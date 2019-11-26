import React, { Component } from 'react';
import '../styles/Dashboard.scss'
import Header from './Header.js';
import Notes from './Notes.js';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <Header />
        <Notes />
      </div>
    )
  }
}

export default Dashboard;