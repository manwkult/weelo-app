import './App.css';

import { Fragment } from 'react';
import { Route, Switch } from 'react-router';

import Login from './pages/Authentication/Login';
import Home from './pages/Home/Home';

import LayoutTemplate from './parts/Layout/LayoutTemplate';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path='/login' component={Login} />
        <div>
          <LayoutTemplate>
            <Route exact path='/' component={Home} />
          </LayoutTemplate>
        </div>  
      </Switch>
    </Fragment> 
  );
}

export default App;
