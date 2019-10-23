import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import RegionList from "./explore/RegionList"
import MessageList from "./message/MessageList"
import RecipeList from "./recipe/RecipeList"



class ApplicationViews extends Component {

    render() {
        return (
            <>
                <Route exact path="/explore" render={props => {
                    return <RegionList {...props} activeUser={this.props.activeUser} />
                }} />
                <Route exact path="/messages" render={props => {
                    return <MessageList {...props} activeUser={this.props.activeUser} />
                }} />
                <Route path="/recipes/:regionId(\d+)" render={(props) => {
                    return <RecipeList regionId={parseInt(props.match.params.regionId)} activeUser={this.props.activeUser}/>
                }} />


            </>

        )

    }
}

export default withRouter(ApplicationViews)