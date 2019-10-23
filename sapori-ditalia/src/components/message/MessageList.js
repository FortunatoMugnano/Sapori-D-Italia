import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';
import MessageCard from '../message/MessageCard';
import AddMessageForm from '../message/AddMessageForm';

class MessagesList extends Component {
	//define what this component needs to render
	state = {
		messages: []
	};

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

	scrollToMyRef = () => {
        window.scrollTo({
            top: 5000,
            behavior: 'smooth'
        });
    };

	render() {
		return (
			<div className='mainContainer'>
				<div className='sectionHeader'>
					<h1>MESSAGES</h1>
				</div>
                <AddMessageForm getData={this.getData} />
				{this.state.messages.map(message => (
					<MessageCard
						key={message.id}
						message={message}
						{...this.props}
						getData={this.getData}
					/>
				))}

			</div>
		);
	}
}

export default MessagesList;