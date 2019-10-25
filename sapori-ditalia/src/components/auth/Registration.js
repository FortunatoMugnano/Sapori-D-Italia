import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';
import { withRouter } from "react-router-dom"
import "./login.css"


class Registration extends Component {
    // Set initial state
    state = {
        regUserName: '',
        regPassword: '',
        regName: '',
        regPasswordConfirm: '',
    };

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleRegistration = e => {
        e.preventDefault();
        let userName = this.state.regUserName;
        let password = this.state.regPassword;
        let name = this.state.regName;
        let passwordConfirm = this.state.regPasswordConfirm;
        // starting the if statement
        if (password !== passwordConfirm) {
            // if pass isn't equal to passConfirm
            alert('Please make sure  use the same password');
            // if both password fields are empty
        } else if (password === '' || passwordConfirm === '') {
            alert('Please fill the Password Form');
        } else if (userName === '') {
            alert('Please enter a valid user name');
        } else {
            const newUser = {
                userName: userName,
                password: password,
                name: name
            };
            APIManager.addUser(newUser).then(response => {
                this.setState({
                    userId: response.id
                })
                this.props.setUser(response.id);
                this.props.history.push(`/explore`);
            });
        }
    };

    render() {
        return (
            <>
                <div className="login-wrap">
                    <form className="ui form" onSubmit={this.handleRegistration}>
                        <h3>Please Register </h3>
                        <div className="field">
                            <label htmlFor="userName">Username</label>
                            <input placeholder="Username" onChange={this.handleFieldChange} required="" autoFocus="" id="regUserName" />
                        </div>
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <input placeholder="Name" onChange={this.handleFieldChange} required="" autoFocus="" id="regName" />
                        </div>
                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <input placeholder="Password" onChange={this.handleFieldChange} type="password" required="" autoFocus="" id="regPassword" />
                        </div>
                        <div className="field">
                            <label htmlFor="password">Confirm Password</label>
                            <input placeholder="Confirm Password" onChange={this.handleFieldChange} type="password" required="" autoFocus="" id="regPasswordConfirm" />
                        </div>
                        <button type="submit" className="ui button" >Submit</button><br />
                        <span className='regLink' onClick={this.props.hideReg} href=''>
                            Go to Login!
						    </span>
                    </form>
                </div>
            </>
        );
    }
}

export default withRouter(Registration);
