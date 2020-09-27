import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import routes from './routes';
import OutroMain from './pages/outroPage/OutroMain';
import DashboardMain from './pages/dashboardPage/DashboardMain';
import LoginMain from './pages/loginPage/LoginMain';
import FrontPageMain from './pages/frontPage/FrontPageMain';
import ProfileSettingsMain from './pages/profileSettingsPage/ProfileSettingsMain';
import LobbyMain from './pages/lobbyPage/LobbyMain';
import SignUpMain from './pages/signUpPage/SignUpMain';
import Arena from './pages/arenaPage/ArenaMain';
import RoomMain from './pages/roomPage/RoomMain';
import VetoMain from './pages/vetoPage/VetoMain';
import WinLoseMain from './pages/winLosePage/WinLoseMain';
import 'rsuite/lib/styles/index.less';
import './App.css';

const componentRegistry = {
  OutroMain: OutroMain,
  DashboardMain: DashboardMain,
  LoginMain: LoginMain,
  SignUpMain: SignUpMain,
  Arena: Arena,
  LobbyMain: LobbyMain,
  WinLoseMain: WinLoseMain,
  RoomMain: RoomMain,
  VetoMain: VetoMain,
  ProfileSettingsMain: ProfileSettingsMain,
  FrontPageMain: FrontPageMain,
};

const App = () => {
  return (
    <Provider store={store}>
      <div data-testid='App' className='App'>
        <Router>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                exact
                path={route.path}
                component={componentRegistry[route.component]}
              />
            ))}
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
