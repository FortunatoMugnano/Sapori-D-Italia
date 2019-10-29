import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import APIManager from "../../modules/APIManager";
import Registration from "../auth/Registration"
import "./login.css"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Login extends Component {
    // Set initial state
    state = {
        userName: "",
        password: "",
        name: "",
        hideReg: true
    }

    showLogin = () => {
        this.setState({ hideReg: false });
    };

    hideReg = () => {
        this.setState({ hideReg: true });
    };

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault()
        let userName = this.state.userName;
        let password = this.state.password;
        let name = this.state.name

        APIManager.searchUsername(userName)
            .then(response => {
                if (response.length === 0) {
                    alert('Please enter a valid User Name.');
                } else if (response.length === 1 && response[0].password !== password) {
                    alert('Password is incorrect, please try again.');
                } else if (password === '') {
                    alert('Please fill the Password Form');
                } else if (userName === '') {
                    alert('Please enter a valid user Name');
                } else if (name === '') {
                    alert('Please enter a valid Name');

                }
                else if (response[0].password === password) {
                    this.setState({
                        userId: response[0].id
                    })
                    this.props.setUser(response[0].id);
                    this.props.history.push(`/explore`);

                }
            }
            )
    }

    render() {
        return (
            <>

                {this.state.hideReg && (
                    <>
                        <div className="loginPic">
                            <div className="login-wrap">
                                <Form className="ui form" onSubmit={this.handleLogin}>
                                    <h3>Please Sign in</h3>
                                    <FormGroup className="field">
                                        <Label htmlFor="userName">Username</Label>
                                        <Input placeholder="Username" onChange={this.handleFieldChange} required="" autoFocus="" id="userName" />
                                    </FormGroup>
                                    <FormGroup className="field">
                                        <Label htmlFor="name">Name</Label>
                                        <Input placeholder="Name" onChange={this.handleFieldChange} required="" autoFocus="" id="name" />
                                    </FormGroup>
                                    <FormGroup className="field">
                                        <Label htmlFor="password">Password</Label>
                                        <Input placeholder="Password" onChange={this.handleFieldChange} type="password" required="" autoFocus="" id="password" />
                                    </FormGroup>
                                    <Button type="submit" className="ui button">Submit</Button><br />
                                    <span className='regLink' onClick={this.showLogin} href=''>
                                        Or Register now!
				            </span>
                                </Form>
                            </div>
                        </div>
                    </>

                )}


                {!this.state.hideReg && (
                    <>
                        <Registration {...this.props} hideReg={this.hideReg} />
                    </>
                )

                }
            </>
        )
    }
}

export default withRouter(Login)