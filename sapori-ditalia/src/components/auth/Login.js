import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import APIManager from "../../modules/APIManager";

class Login extends Component {
    // Set initial state
    state = {
        userName: "",
        password: "",
        name: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault()
        /*
            For now, just store the email and password that
            the customer enters into local storage.
        */
        let credentials = {
            userName: this.state.userName,
            password: this.state.password,
            name: this.state.name
        }
        APIManager.searchUsername(this.state.userName)
            .then(result => {
                if (result.length > 0) {
                    //this returns an array - we only need object
                    this.props.setUser(result[0]);
                    this.props.history.push("/explore");
                } else {
                    APIManager.addUser(credentials)
                        .then(result => {
                            //this returns an object
                            this.props.setUser(result);
                        })
                    this.props.history.push("/explore");
                }
            })
    }

    render() {
        return (
            <form className="ui form" onSubmit={this.handleLogin}>
                <h3>Please sign in</h3>
                <div className="field">
                    <label htmlFor="userName">Username</label>
                    <input placeholder="Username" onChange={this.handleFieldChange} required="" autoFocus="" id="userName" />
                </div>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input placeholder="Name" onChange={this.handleFieldChange} required="" autoFocus="" id="name" />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input placeholder="Password" onChange={this.handleFieldChange} type="password" required="" autoFocus="" id="password" />
                </div>
                <button type="submit" className="ui button">Submit</button>
            </form>

        )
    }
}

export default withRouter(Login);