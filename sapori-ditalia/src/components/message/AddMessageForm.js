import React from 'react';
import APIManager from '../../modules/APIManager';



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
                .then(this.props.getData);
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
    };

    render() {
        return (
            <div className='addBtnContainer'>
                <form className="myForm">
                    <div className='msgSubmitRow'>
                        <div className='formField'>
                            <input
                                type='textarea'
                                required
                                onChange={this.handleFieldChange}
                                id='message'
                                placeholder='Message'
                                value={this.state.message}
                            />
                        </div>
                        <div className='formField'>
                            <input
                                type='datetime-local'
                                required
                                onChange={this.handleFieldChange}
                                id='date'
                                placeholder='Message'
                                value={this.state.date}
                            />
                        </div>

                        <div className='formField'>
                            <button
                                className="ui icon button"
                                disabled={this.state.loadingStatus}
                                onClick={this.handleClick}
                            ><i aria-hidden="true" className="add icon"></i>
                                Add a Message
							</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddMessageForm;