import React, { Component } from 'react'
// import './login.css'
import Register from '../register/register'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { Api } from '../../../api/request'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import loginRequest from './actions'

class Login extends Component {
	// static propTypes = {
	// 	handleSubmit: PropTypes.func,
	// 	loginRequest: PropTypes.func,
	// 	login: PropTypes.shape({
	// 		requesting: PropTypes.bool,
	// 		successful: PropTypes.bool,
	// 		messages: PropTypes.array,
	// 		errors: PropTypes.array,
	// 	}),
	// }

	submit = (values) => {
		this.props.loginRequest(values)
	}

	login = async () => {
		let data = await Api.post('login', {email: this.state.email, password: this.state.password})
			.then((res) => {
				console.log('this is response' , res)
			})
	}

	render() {
		const {
			handleSubmit, // remember, Redux Form injects this into our props
			login: {
				requesting,
				successful,
				messages,
				errors,
			},
		} = this.props

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
									<form onSubmit={handleSubmit(this.submit)}>
										<div className="form-group">
											<label htmlFor="email">Email</label>
											<Field
												name="email"
												type="text"
												id="email"
												className="form-control"
												component="input"
											/>
										</div>
										<div className="form-group">
										<label htmlFor="password">Password</label>
											<Field
												name="password"
												type="password"
												id="password"
												className="form-control"
												component="input"
											/>
										</div>
										<div className="checkbox">
											<label>
												<input name="remember" type="checkbox" value="Remember Me"/>Remember Me
											</label>
										</div>
										<div className="form-group">
											<button className="btn btn-lg btn-success btn-block" action="submit">Login</button>
										</div>
									</form>
									<div className="form-group">
										<Link className="btn btn-lg btn-success btn-block" to='/register'>Register</Link>
									</div>
								</fieldset>
							</div>
						</div>
					</div>
				</div>

				<Router>
					<Route exact path="/register" component={Register}/>
				</Router>
			</div>
		)
	}
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
	login: state.login,
})

// make Redux state piece of `login` and our action `loginRequest`
// available in this.props within our component
const connected = connect(mapStateToProps, { loginRequest })(Login)

// in our Redux's state, this form will be available in 'form.login'
const formed = reduxForm({
	form: 'login',
})(connected)

export default formed
