// CSS
import '../styles/App.css';
import '../styles/pages.css';
import '../styles/inputTypes.css';

// React
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// Reusables
import { Navbar } from './reusable/nav/Navbar';

// Pages
import { Dashboard } from './pages/dashboard/Dashboard';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';
import { ListPage } from './pages/lists/ListPage';

// Handlers
import { UserHandler } from '../handlers/UserHandler';

// Types
import { User } from "../types/schemas"

// secrets
require('dotenv').config();

const App : React.FC = () => {

  // User object, determines logged in status
  const [user, setUser] = useState<User|undefined>();

  /**
   * Checks for token and gets user from server if token is set
   */
  const checkForUser = async () => {
    if (await UserHandler.checkForToken()) {
      let user = await UserHandler.getUserFromServer();
      if (user) {
        setUser(user);
      }
    }
  }

  /**
   * Removes token from localstorage,
   * sets user to undefined
   */
  const logoutUser = () => {
    UserHandler.removeToken();
    setUser(undefined);
  }

  /**
   * Check for user on load
   */
  useEffect(() => {
    checkForUser();
  }, []);

  return (
    <div className="App">
      <Router>  



        <Switch>

          <Route path='/login'>
            <LoginPage user={user} setUser={setUser} setToken={UserHandler.setToken} />
          </Route>
          <Route path='/register'>
            <RegisterPage user={user} setUser={setUser} setToken={UserHandler.setToken} />
          </Route>
          <Route path='/'>
            <Navbar title='Keep Connect'></Navbar>          
          </Route>
          <Route exact path='/'>
            {user===undefined?
              <Redirect to='/login'></Redirect>
              :null
            }
            <Dashboard/>
          </Route>
          <Route path='/lists'>
              <ListPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
