import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom"
import { Login, Register } from './pages/auth'

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
			<div className="row">
				<div className="container">
					<Link className="btn btn-primary" to='/login'>Login</Link>
					<Link className="btn btn-primary" to='/register'>Register</Link>
				</div>
			</div>
		</div>
    );
  }
}

export default App;
