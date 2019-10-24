import React, { Component } from 'react';
import { Rating } from 'semantic-ui-react'
import APIManager from "../../modules/APIManager"


class MyRecipeCard extends Component {


    handleDelete = (id) => {
        APIManager.deleteRecipeFromCookbook(id).then(() => {
            this.props.getData();
        });
    };


    render() {



        return (
            <>
                <div className="MyRecipeCard">
                    <h2>{this.props.recipe.name}</h2>
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
                    <div>
                        <button className="ui icon button" onClick={ () => this.handleDelete(this.props.recipeId)}><i aria-hidden="true" className="delete icon" ></i>Delete Recipe</button>
                        <button className="ui icon button"
                            onClick={this.handleClick}><i aria-hidden="true" className="edit icon"></i>Edit Recipe</button>
                    </div>
                </div>
            </>
        );
    }
}

export default MyRecipeCard