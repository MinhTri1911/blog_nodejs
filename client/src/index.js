import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter, Route, Switch } from 'react-router-dom'
import {Login, Register} from './auth'
import {DashBoard} from './pages'



// ReactDOM.render(<App />, document.getElementById('root'));


ReactDOM.render((
    <HashRouter>
      <Switch>
        <Route exact path="/" name="Wellcome Page" render={(props) => <App location='/'/>} />
        <Route exact path="/login" name="Login Page" render={(props) => <Login location='/auth'/>} />
        <Route exact path="/register" name="Register Page" render={(props) => <Register location='/auth'/>} />

        <Route exact path="/dashboard" name="Dashboard Page" component={DashBoard} />
        {/* <Route exact path='/logout' component={Logout} />
        <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/500" name="Page 500" component={Page500} />
        <Route path="/" name="Home" component={Full} /> */} */}
      </Switch>
    </HashRouter>
  ), document.getElementById('root'));


registerServiceWorker();
