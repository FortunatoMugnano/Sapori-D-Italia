import React from 'react';
import APIManager from '../../modules/APIManager';
import moment from "react-moment"

class EditMessageForm extends React.Component {
	state = {
		userId: '',
		date: '',
		message: '',
		loadingStatus: true
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};


	updateExistingMessage = () => {

		this.setState({ loadingStatus: true });
		const editedMessage = {
			userId: this.state.userId,
			date: this.state.date,
			message: this.state.message,
			id: this.props.id
		};

		APIManager.updateMessages(editedMessage).then(this.props.getData);
	};

	componentDidMount() {
		APIManager.getMessagesById(this.props.id).then(message => {
			this.setState({
				userId: message.userId,
				date: message.date,
				message: message.message,
				loadingStatus: false
			});
		});
	}

	handleClick = evt => {
		evt.preventDefault();
		this.updateExistingMessage();
		this.setState({ loadingStatus: false });
	};

	render() {
		return (


					<form className='login-form'>
						<div className='formField'>
							<input type="datetime-local"
                        required onChange={this.handleFieldChange}
                        id="date" placeholder="Date"
                        value={this.state.date} />
						</div>
						<div className='formField'>
							<input
								type="textarea"
								required
								onChange={this.handleFieldChange}
								id='message'
								placeholder='Message'
								value={this.state.message}
							/>
						</div>

						<div className='formField'>
							<button className="ui icon button" disabled={this.state.loadingStatus}
								onClick={this.handleClick}><i aria-hidden="true" className="edit icon"></i>Edit</button>
						</div>
					</form>

		);
	}
}

export default EditMessageForm;