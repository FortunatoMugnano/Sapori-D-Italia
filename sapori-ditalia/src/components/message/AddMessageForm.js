import React from 'react';
import APIManager from '../../modules/APIManager';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { withRouter } from "react-router-dom"



class AddMessageForm extends React.Component {
    state = {
        userId: '',
        // date: '',
        message: '',
        loadingStatus: false,
        timestamp: "",
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    addNewMessage = () => {
        console.log("my props", this.props)
        if (this.state.message === '') {
            window.alert('Please fill out all the fields');
        } else {
            let userId = parseInt(sessionStorage.getItem('activeUser'));
            let timestamp = Date.now();
            let dateNow = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }).format(timestamp);
            const message = {
                message: this.state.message,
                timestamp: dateNow,
                userId: userId,
            };
            APIManager.postMessages(message)
                .then(this.props.getData)
                .then(() => this.props.history.push("/messages"))
        }
    };

    clearForms = () => {

        this.setState({
            date: '',
            message: ''
        })

    }

    handleClick = evt => {
        evt.preventDefault();
        this.addNewMessage();
        this.clearForms();
        this.props.toggle()
    };

    render() {
        return (

            <div className="buttonWrap">
                <Button color="danger" onClick={this.props.toggle}>Add a Message</Button>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>Share your message</ModalHeader>
                    <ModalBody>
                        <div className='addBtnContainer'>
                            <Form className="myForm">

                                <FormGroup className='formField'>
                                    <Input
                                        type='textarea'
                                        required
                                        onChange={this.handleFieldChange}
                                        id='message'
                                        placeholder='Message'
                                        value={this.state.message}
                                    />
                                </FormGroup>


                            </Form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            disabled={this.state.loadingStatus}
                            onClick={this.handleClick}
                        >
                            Add a Message
							</Button>
                        <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>












        );
    }
}

export default withRouter(AddMessageForm);