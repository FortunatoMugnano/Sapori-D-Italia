import React from 'react';
import APIManager from '../../modules/APIManager';
import Moment from 'react-moment';
import 'moment-timezone';

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
		// evt.preventDefault();
		if (this.state.message === '') {
			window.alert('Please fill out all the fields');
		} else {
			let userId = parseInt(sessionStorage.getItem('activeUser'));
			const message = {
				date: Moment(new Date()),
				message: this.state.message,
				userId: userId,
				editTimeStamp: ''
			};
			APIManager.postMessages(message).then(this.props.getData);
		}
	};
	handleClick = evt => {
		evt.preventDefault();
		this.addNewMessage();
		document.querySelector('#message').value = '';
	};

	render() {
		return (
			<div className='addBtnContainer'>
				<form>
					<div className='msgSubmitRow'>
						<div className='formField'>
							<input
								type='text'
								required
								onChange={this.handleFieldChange}
								id='message'
								placeholder='Message'
							/>
						</div>

						<div className='formField'>
							<button
								className='login-form-button'
								type='primary'
								disabled={this.state.loadingStatus}
								onClick={this.handleClick}
								icon='add'
							>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default AddMessageForm;