// CSS
import '../styles/App.css';
import '../styles/pages.css';
import '../styles/inputTypes.css';

// React
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// Pages
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';

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
          <Route exact path='/'>
            {user===undefined?
            <Redirect to='/login'></Redirect>
            :null}
            <h1>{(user?.firstName)}</h1>
            <button onClick={logoutUser}>logout</button>
          </Route>
          <Route path='/login'>
            <LoginPage user={user} setUser={setUser} setToken={UserHandler.setToken} />
          </Route>
          <Route path='/register'>
            <RegisterPage user={user} setUser={setUser} setToken={UserHandler.setToken} />
          </Route>
          <Route path='/'>
            {user===undefined?
            <Redirect to='/login'></Redirect>
            :null}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
