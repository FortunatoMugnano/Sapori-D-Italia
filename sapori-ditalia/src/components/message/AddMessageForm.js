import React from 'react';
import APIManager from '../../modules/APIManager';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { withRouter } from "react-router-dom"



class AddMessageForm extends React.Component {
    state = {
        userId: '',
        date: '',
        message: '',
        loadingStatus: false,
        editTimeStamp: ''
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
            const message = {
                date: this.state.date,
                message: this.state.message,
                userId: userId,
                editTimeStamp: ''
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
                                <FormGroup className='formField'>
                                    <Input
                                        type='datetime-local'
                                        required
                                        onChange={this.handleFieldChange}
                                        id='date'
                                        placeholder='Message'
                                        value={this.state.date}
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