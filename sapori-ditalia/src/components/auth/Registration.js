import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';
import { withRouter } from "react-router-dom"
import "./login.css"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


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
                <section className="login-section">
                    <div className="body-login">
                        <Form className="ui form" onSubmit={this.handleRegistration}>
                        <div className="logo-wrapper">
                                <img className="logo-login" src="../images/Sapori-D-Italia_logo.jpg" alt="logo" />
                                </div>
                            <h3>Please Register </h3>
                            <FormGroup className="field">
                                <Label htmlFor="userName">Username</Label>
                                <Input placeholder="Username" onChange={this.handleFieldChange} required="" autoFocus="" id="regUserName" />
                            </FormGroup>
                            <FormGroup className="field">
                                <Label htmlFor="name">Name</Label>
                                <Input placeholder="Name" onChange={this.handleFieldChange} required="" autoFocus="" id="regName" />
                            </FormGroup>
                            <FormGroup className="field">
                                <Label htmlFor="password">Password</Label>
                                <Input placeholder="Password" onChange={this.handleFieldChange} type="password" required="" autoFocus="" id="regPassword" />
                            </FormGroup>
                            <FormGroup className="field">
                                <Label htmlFor="password">Confirm Password</Label>
                                <Input placeholder="Confirm Password" onChange={this.handleFieldChange} type="password" required="" autoFocus="" id="regPasswordConfirm" />
                            </FormGroup>
                            <Button type="submit" className="ui button" >Submit</Button><br />
                            <span className='regLink' onClick={this.props.hideReg} href=''>
                                Go to Login!
						    </span>
                        </Form>
                    </div>
                </section>
            </>
        );
    }
}

export default withRouter(Registration);
