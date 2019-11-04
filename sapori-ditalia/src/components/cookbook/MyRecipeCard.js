import React, { Component } from 'react';
import Rating from "react-rating";
import APIManager from "../../modules/APIManager"


class MyRecipeCard extends Component {
    state = {
        imageUrl: "",

    }


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
                    {/* <h2>Made by: {this.props.recipe.user.userName}</h2> */}
                    <h3>Ingredients:</h3><p> {this.props.recipe.ingredients}</p>
                    <h3>Directions:</h3><p> {this.props.recipe.direction}</p>
                    <h3>Difficulty:</h3><p>{this.props.recipe.difficulty}</p>
                    <h3>Rate:</h3> <br/><p>{this.props.recipe.rate} /5 stars</p>
                    {this.props.recipe.imageUrl === "" ? (
                        <div></div>
                    ) : (
                            <picture>
                                <img src={this.props.recipe.imageUrl} alt={this.props.recipe.name} />
                            </picture>
                        )}
                    <div className="buttonWrap">
                        <button className="ui icon button" onClick={() => this.handleDelete(this.props.recipeId)}><i aria-hidden="true" className="delete icon" ></i>Delete from Cookbook</button>
                    </div>
                </div>
            </>
        );
    }
}

export default MyRecipeCard