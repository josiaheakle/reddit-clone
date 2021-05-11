import '../styles/App.css';
import '../styles/pages.css';
import '../styles/inputTypes.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {LoginPage} from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';
require('dotenv').config();


const App : React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <h1>Home</h1>
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
