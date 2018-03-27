import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import {Login, Register} from './auth'


// import {
//     BrowserRouter as Router,
//     Route,
//     Link,
//     Redirect,
//     withRouter
// } from "react-router-dom";

class App extends Component {

render() {
    return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className="App-title">Welcome to React</h1>
			</header>
			<p className="App-intro">
				To get started, edit <code>src/App.js</code> and save to reload.
			</p>
			{/* <Link className="btn btn-lg btn-success btn-block" to='/register'>Go to Login Page</Link>
			<Link className="btn btn-lg btn-success btn-block" to='/login'>Go to Login Page</Link>
			<Router>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/regiser" component={Register}/>
			</Router> */}
		</div>
    );
  }
}

export default App;
