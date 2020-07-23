import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FrontMain from './pages/frontPage/FrontMain';
import LoginMain from './pages/loginPage/LoginMain';
import ProfileSettingsMain from './pages/profileSettingsPage/ProfileSettingsMain';
import LobbyMain from './pages/lobbyPage/LobbyMain';
import DashboardMain from './pages/dashboardPage/DashboardMain';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/dashboard' component={DashboardMain} />
          <Route exact path='/login' component={LoginMain} />
          <Route exact path='/lobby' component={LobbyMain} />
          <Route exact path='/settings' component={ProfileSettingsMain} />
          <Route exact path='' component={FrontMain} />
          <Route exact path='/' component={FrontMain} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
