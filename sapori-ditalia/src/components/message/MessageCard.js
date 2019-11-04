import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';
import moment from 'react-moment';
import EditMessageForm from "./EditMessageForm"




class MessageCard extends Component {
    state = {
        myCard: ''
    };

    handleDelete = id => {
        APIManager.deleteMessages(id).then(() => {
            this.props.getData();
        });
    };

    componentDidMount() {
        if (
            parseInt(sessionStorage.getItem('activeUser')) ===
            this.props.message.userId
        ) {
            this.setState({
                myCard: true
            });
        } else {
            this.setState(
                {
                    myCard: false
                },
            );
        }
    }

    render() {


        return (
            <>
                {this.state.myCard ? (
                    <div className='myCard'>
                        <h4>{this.props.message.timestamp} </h4>
                        <h3>{this.props.message.message}</h3>
                        <div className='cardButtonRow'>
                            <EditMessageForm
                                {...this.props.message}
                                getData={this.props.getData}
                            />
                            <button className="ui icon button" onClick={() => this.handleDelete(this.props.message.id)}><i aria-hidden="true" className="delete icon" ></i>Delete</button>
                        </div>

                    </div>
                ) : (
                        <>
                            <div className='friendCard'>
                                <div className='msgHeader'>
                                <h4>{this.props.message.timestamp} </h4>
                                    <h3>From:<p>{this.props.message.user.userName}</p> </h3>
                                </div>
                                <div className='msgBody'>
                                    <h3>{this.props.message.message}</h3>
                                </div>
                            </div>
                        </>
                    )}
            </>
        );
    }
}

export default MessageCard;