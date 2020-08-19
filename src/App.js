import React from 'react';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './app.scss';
import EmployeeList from './components/employeelist';
import Employee from './components/employee';
import AppHeader from './components/header';

function App() {
  return (
    <>
      <Router>
        <AppHeader />
        <Content>
          <Switch>
            <Route exact path='/'>
              <Redirect to='/employees' />
            </Route>
            <Route exact path='/employees' component={EmployeeList} />
            <Route exact path='/employee/new' component={Employee} />
            <Route exact path='/employee/:id' component={Employee} />
          </Switch>
        </Content>
      </Router>
    </>
  );
}

export default App;
