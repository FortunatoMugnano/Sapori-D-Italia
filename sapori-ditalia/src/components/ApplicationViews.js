import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import RegionList from "./explore/RegionList"
import MessageList from "./message/MessageList"
import MessageCard from "./message/MessageCard"
import AddMessageForm from "./message/AddMessageForm"


class ApplicationViews extends Component {

    render() {
        return (
            <>
                <Route exact path="/explore" render={props => {
                    return <RegionList {...props} />
                }} />
                <Route exact path="/messages" render={props => {
                    return <MessageList {...props} />
                }} />
                 <Route exact path="/messages/new" render={props => {
                    return <AddMessageForm {...props} />
                }} />
                 <Route exact path="/messages/new" render={props => {
                    return <MessageCard {...props} />
                }} />

            </>

        )

    }
}

export default withRouter(ApplicationViews)