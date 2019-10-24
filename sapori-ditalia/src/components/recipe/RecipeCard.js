import React, { Component } from 'react';
import { Rating } from 'semantic-ui-react'


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

    render() {


        return (
            <>
                {this.state.myCard ? (
                    <div className="recipeCard">
                        <h2>{this.props.recipe.name}</h2>
                        <h3>By:{this.props.recipe.user.name}</h3>
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
                            className="ui icon button"
                        ><i aria-hidden="true" className="add icon"></i>
                            Add to your CookBook
                    </button>
                    </div>
                ) : (
                        <div className="recipeCard">
                            <h2>{this.props.recipe.name}</h2>
                            <h3>Created By: <p>{this.props.recipe.user.name}</p></h3>
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

                        </div>
                    )}
            </>
        );
    }
}

export default RecipeCard