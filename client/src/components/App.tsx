// CSS
import '../styles/App.css';
import '../styles/pages.css';
import '../styles/inputTypes.css';

// React
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useLocation } from 'react-router';
import React, { useEffect, useState } from 'react';

// Reusables
import { Navbar } from './reusable/nav/Navbar';

// Pages
import { Dashboard } from './pages/dashboard/Dashboard';
import { AuthPage } from './pages/login/';
import { ListPage } from './pages/lists/ListPage';

import { TokenHandler, useUserToken } from '../handlers/TokenHandler';

// Types
import { User } from "../types/schemas"

// secrets
require('dotenv').config();



const App : React.FC = () => {

  // User object, determines logged in status
  const [user, setUser] = useUserToken();
  const authPages = [
    '/', '/households', '/lists', '/account'
  ]

  return (
    <div className="App">
      <Router>
      {!user?
        <AuthPage user={user} setUser={setUser} setToken={TokenHandler.setToken}/>
      :
        <Switch>
          <Navbar validRoutes={authPages}>
            <Route exact path='/'>
              <Dashboard/>
            </Route>
            <Route path='/lists'>
              <ListPage />
            </Route>
          </Navbar>
        </Switch>

      }
      </Router>
    </div>
  );
}

export default App;
