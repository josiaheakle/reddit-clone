import '../styles/App.css';
import '../styles/pages.css';
import '../styles/inputTypes.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {LoginPage} from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';
import { UserHandler } from '../handlers/UserHandler';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { User } from "../types/schemas"
require('dotenv').config();


const App : React.FC = () => {

  const [user, setUser] = useState<User|undefined>();

  const checkForUser = async () => {
    if (await UserHandler.checkForToken()) {
      let user = await UserHandler.getUserFromServer();
      if (user) {
        setUser(user);
      }
    }
  }

  const logoutUser = () => {
    UserHandler.removeToken();
    setUser(undefined);
  }

  useEffect(()=>{
    console.log({user:user})
  }, [user])

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
