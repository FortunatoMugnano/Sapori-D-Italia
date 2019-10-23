import React, { Component } from 'react';


class RecipeCard extends Component {
    render() {


        return (
            <>
                <div className="recipeCard">
                    <h2>{this.props.recipe.name}</h2>
                    <h3>By:{this.props.recipe.user.name}</h3>
                    <h3>Ingredients:</h3><p> {this.props.recipe.ingredients}</p>
                    <h3>Directions:</h3><p> {this.props.recipe.direction}</p>
                    <h3>Difficulty:</h3><p>{this.props.recipe.difficulty}</p>
                    <h3>Rate:</h3><p> {this.props.recipe.rate}</p>
                    <button
                        className="ui icon button"
                    ><i aria-hidden="true" className="add icon"></i>
                        Add to your CookBook
							</button>
                </div>
            </>
        );
    }
}

export default RecipeCard