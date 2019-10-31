import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';
import MessageCard from '../message/MessageCard';
import AddMessageForm from '../message/AddMessageForm';

class MessagesList extends Component {
	//define what this component needs to render
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			messages: [],

		};

		this.toggle = this.toggle.bind(this);

	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	}

	componentDidMount() {
		APIManager.getMessages(this.props.activeUser).then(messages => {
			this.setState({
				messages: messages
			});
		});
	}

	getData = () => {
		APIManager.getMessages(this.props.activeUser).then(messages => {
			this.setState({
				messages: messages
			});
		});
	};



	render() {
		return (
			<div className='mainContainer'>
				<div className='sectionHeader'>
					<h1>MESSAGES</h1>
				</div>
				<AddMessageForm getData={this.getData} modal={this.state.modal}
					toggle={this.toggle} />
				<div className="body-messages">
					{this.state.messages.map(message => (
						<MessageCard
							key={message.id}
							message={message}
							{...this.props}
							getData={this.getData}
						/>
					))}
				</div>

			</div>
		);
	}
}

export default MessagesList;