import React from 'react';
import APIManager from '../../modules/APIManager';
import moment from "react-moment"
import { Button, Form, Input } from 'reactstrap';


class EditMessageForm extends React.Component {
	state = {
		userId: '',
		timestamp: '',
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
		let timestamp = Date.now();
		let dateNow = new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		}).format(timestamp);
		const editedMessage = {
			userId: this.state.userId,
			timestamp: dateNow,
			message: this.state.message,
			id: this.props.id
		};

		APIManager.updateMessages(editedMessage).then(this.props.getData);
	};

	componentDidMount() {
		APIManager.getMessagesById(this.props.id).then(message => {
			this.setState({
				userId: message.userId,
				timestamp: message.timestamp,
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


					<Form className='edit-form'>
							<Input type="date"
                        required onChange={this.handleFieldChange}
                        id="timestamp" placeholder="Date"
                        value={this.state.timestamp}
                       />

							<Input
								type="textarea"
								required
								onChange={this.handleFieldChange}
								id='message'
								placeholder='Message'
								value={this.state.message}
							/>



							<Button className="ui icon button" disabled={this.state.loadingStatus}
								onClick={this.handleClick}><i aria-hidden="true" className="edit icon"></i>Edit</Button>

					</Form>

		);
	}
}

export default EditMessageForm;