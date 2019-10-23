import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import RegionList from "./explore/RegionList"
import MessageList from "./message/MessageList"



class ApplicationViews extends Component {

    render() {
        return (
            <>
                <Route exact path="/explore" render={props => {
                    return <RegionList {...props} />
                }} />
                <Route exact path="/messages" render={props => {
                    return <MessageList {...props} activeUser={this.props.activeUser}/>
                }} />


            </>

        )

    }
}

export default withRouter(ApplicationViews)