import React, { Component } from 'react';
import { Rating } from 'semantic-ui-react'
import APIManager from '../../modules/APIManager';
import { withRouter } from "react-router-dom"


class RecipeCard extends Component {
    state = {
        myCard: ''
    };


    componentDidMount() {
        if (
            parseInt(sessionStorage.getItem('activeUser')) ===
            this.props.recipe.userId
        ) {
            this.setState({
                myCard: false
            });
        } else {
            this.setState(
                {
                    myCard: true
                },
            );
        }
    }

    handleClick = () => {
        let userId = parseInt(sessionStorage.getItem('activeUser'));
        const recipeObj = {
            userId: userId,
            myRecipeId: this.props.recipe.id
        }
        APIManager.searchMyRecipeId(this.props.recipe.id).then((results) => {
         if(results.length > 0) {
             alert("Recipe already in your Cookbook")
         }else{
            APIManager.addRecipeToYourCookbook(recipeObj).then(() => {
                this.props.history.push("/cookbook")
            })
         }
        })
    }

    handleDelete = () => {
        console.log("recipeId",this.props.recipe.id)
        APIManager.deleteRecipe(this.props.recipe.id).then(() => {
            this.props.history.push("/explore")
        })
    }

    render() {


        return (
            <>
                {this.state.myCard ? (
                    <div className="recipeCard">
                        <h2>{this.props.recipe.name}</h2>
                        {/* <h3>By:{this.props.recipe.user.name}</h3> */}
                        <h3>Ingredients:</h3><p> {this.props.recipe.ingredients}</p>
                        <h3>Directions:</h3><p> {this.props.recipe.direction}</p>
                        <h3>Difficulty:</h3><p>{this.props.recipe.difficulty}</p>
                        <h3>Rate:</h3><div className="ui star rating" role="radiogroup" tabIndex="-1">
                            <i
                                tabIndex="0"
                                aria-checked="false"
                                aria-posinset="1"
                                aria-setsize="4"
                                className="active icon"
                                role="radio"
                            ></i>
                            <i
                                tabIndex="0"
                                aria-checked="false"
                                aria-posinset="2"
                                aria-setsize="4"
                                className="active icon"
                                role="radio"
                            ></i>
                            <i
                                tabIndex="0"
                                aria-checked="false"
                                aria-posinset="3"
                                aria-setsize="4"
                                className="active icon"
                                role="radio"
                            ></i>
                            <i
                                tabIndex="0"
                                aria-checked="true"
                                aria-posinset="4"
                                aria-setsize="4"
                                className="icon"
                                role="radio"
                            ></i>
                        </div>
                        <div>{this.props.recipe.rate}</div>


                        <button
                            className="ui icon button" onClick={this.handleClick}
                        ><i aria-hidden="true" className="add icon"></i>
                            Add to your CookBook
                    </button>
                    </div>
                ) : (
                        <div className="recipeCard">
                            <h2>{this.props.recipe.name}</h2>
                            {/* <h3>Created By: <p>{this.props.recipe.user.name}</p></h3> */}
                            <h3>Ingredients:</h3><p> {this.props.recipe.ingredients}</p>
                            <h3>Directions:</h3><p> {this.props.recipe.direction}</p>
                            <h3>Difficulty:</h3><p>{this.props.recipe.difficulty}</p>
                            <h3>Rate:</h3><div className="ui star rating" role="radiogroup" tabIndex="-1">
                                <i
                                    tabIndex="0"
                                    aria-checked="false"
                                    aria-posinset="1"
                                    aria-setsize="4"
                                    className="active icon"
                                    role="radio"
                                ></i>
                                <i
                                    tabIndex="0"
                                    aria-checked="false"
                                    aria-posinset="2"
                                    aria-setsize="4"
                                    className="active icon"
                                    role="radio"
                                ></i>
                                <i
                                    tabIndex="0"
                                    aria-checked="false"
                                    aria-posinset="3"
                                    aria-setsize="4"
                                    className="active icon"
                                    role="radio"
                                ></i>
                                <i
                                    tabIndex="0"
                                    aria-checked="true"
                                    aria-posinset="4"
                                    aria-setsize="4"
                                    className="icon"
                                    role="radio"
                                ></i>
                            </div>
                            <div>{this.props.recipe.rate}</div>
                            <button
                                className="ui icon button" onClick={this.handleDelete}
                            ><i aria-hidden="true" className="add icon"></i>
                                Delete it
                    </button>
                    <button type="button" className="ui icon button" onClick={() => { this.props.history.push(`/cookbook/${this.props.recipe.id}/edit`) }}><i aria-hidden="true" className="edit icon"></i>Edit</button>

                        </div>
                    )}
            </>
        );
    }
}

export default withRouter(RecipeCard)