import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { CardFooter } from 'reactstrap';
import RegionList from "./explore/RegionList"
import MessageList from "./message/MessageList"
import RecipeList from "./recipe/RecipeList"
import MyRecipeList from "./cookbook/MyRecipeList"
import EditRecipeForm from "./cookbook/EditRecipeForm"





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
                    return <RecipeList regionId={parseInt(props.match.params.regionId)} activeUser={this.props.activeUser} />
                }} />
                <Route exact path="/cookbook" render={props => {
                    return <MyRecipeList {...props} activeUser={this.props.activeUser} />
                }} />
                <Route path="/cookbook/:myRecipeId(\d+)/edit" render={props => {
                    return <EditRecipeForm {...props} myRecipeId={parseInt(props.match.params.myRecipeId)} />
                }} />

                <CardFooter className="text-muted"> &copy; Fortunato Mugnano, Cohort 35</CardFooter>


            </>

        )

    }
}

export default withRouter(ApplicationViews)