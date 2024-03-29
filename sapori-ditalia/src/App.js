import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Login from './components/auth/Login'
import ApplicationViews from "./components/ApplicationViews"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../src/components/nav/navbar'
import "./App.css"

//starting the App main page
class App extends Component {
	state = {
		user: sessionStorage.getItem('activeUser') !== null,
		activeUser: ''
	};

	isAuthenticated = () => sessionStorage.getItem('activeUser') !== null;

	setUser = id => {
		sessionStorage.setItem('activeUser', id);
		this.setState({ activeUser: this.getUser(), user: true });
	};

	getUser() {
		if (sessionStorage.getItem('activeUser')) {
			return parseInt(sessionStorage.getItem('activeUser'));
		} else {
			return '';
		}
	}

	clearUser = () => {
		sessionStorage.removeItem('activeUser');
		this.setState({
			user: this.isAuthenticated()
		});
	};

	render() {
		return (
			<div className='App'>
				{this.state.user ? (
					<>
						<Navbar
							clearUser={this.clearUser}
							user={this.state.user}
							{...this.props}
							activeUser={this.state.activeUser}
						/>
						<ApplicationViews
							user={this.state.user}
							{...this.props}
							activeUser={this.state.activeUser}
						/>
					</>
				) : (
					<Login
						getUser={this.getUser}
						setUser={this.setUser}
						user={this.state.user}
						{...this.props}
						activeUser={this.state.activeUser}
					/>
				)}
			</div>
		);
	}
}

export default withRouter(App);
