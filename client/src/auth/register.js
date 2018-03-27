import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './login'

class Register extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="login-panel panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Please Sign In</h3>
                            </div>
                            <div className="panel-body">
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="E-mail" name="email" type="email" autoFocus/>
                                    </div>

                                    <div className="form-group">
                                        <input className="form-control" placeholder="Name" name="name" type="text" autoFocus/>
                                    </div>

                                    <div className="form-group">
                                        <input className="form-control" placeholder="Password" name="password" type="password" value=""/>
                                    </div>

                                    <div className="form-group">
                                        <input className="form-control" placeholder="Confirm password" name="password-confirm" type="password" value=""/>
                                    </div>

                                    <div className="checkbox">
                                        <label>
                                            <input name="remember" type="checkbox" value="Remember Me"/>Remember Me
                                        </label>
                                    </div>
                                    <button className="btn btn-lg btn-success btn-block">Sign up</button>
                                    <Link className="btn btn-lg btn-success btn-block" to='/login'>Go to Login Page</Link>
                                    <Router>
                                        <Route exact path="/login" component={Login}/>
                                    </Router>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
