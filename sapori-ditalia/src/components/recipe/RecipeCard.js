import React, { Component } from 'react';
import Rating from "react-rating";
import APIManager from '../../modules/APIManager';
import { withRouter } from "react-router-dom"





class RecipeCard extends Component {
    state = {
        myCard: '',
        imageUrl: false
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
        APIManager.searchMyRecipeId(this.props.recipe.id, userId).then((results) => {
            if (results.length > 0) {
                alert("Recipe already in your Cookbook")
            } else {
                APIManager.addRecipeToYourCookbook(recipeObj).then(() => {
                    this.props.history.push("/cookbook")
                })
            }
        })
    }



    handleDelete = () => {
        console.log("recipeId", this.props.recipe.id)
        APIManager.deleteRecipe(this.props.recipe.id).then(() => {
            this.props.history.push("/explore")
        })
    }

    updateRate = (evt) => {
        let newRate = {
            rate: evt
        }; APIManager.patch(this.props.recipe.id, newRate).then(() => {
            this.props.getData()
        });
    }


    render() {


        return (
            <>
                {this.state.myCard ? (
                    <>
                        <div className="top"><h1 className="main">{this.props.regionName}</h1></div>
                        <div className="recipeCard">

                            <h2>{this.props.recipe.name}</h2>
                            <h3>Created By: <br /> <p>{this.props.recipe.user.userName}</p></h3>
                            <h3>Ingredients:</h3><p> {this.props.recipe.ingredients}</p>
                            <h3>Directions:</h3><p> {this.props.recipe.direction}</p>
                            <h3>Difficulty:</h3><p>{this.props.recipe.difficulty}</p>
                            <h3>Rate: </h3> <br />
                            <Rating className="rating"
                                id="rate"
                                emptySymbol={<span className="icon-text">-</span>}
                                fullSymbol={[1, 2, 3, 4, 5].map(n => <span className="icon-text">{n}</span>)}
                                initialRating={this.props.recipe.rate}
                                onClick={evt => this.updateRate(evt)}
                            />

                            {this.props.recipe.imageUrl === "" ? (
                                <div></div>
                            ) : (
                                    <picture>
                                        <img src={this.props.recipe.imageUrl} alt={this.props.recipe.name} />
                                    </picture>
                                )}
                            <div className="buttonWrap">
                                <button
                                    className="ui icon button" onClick={this.handleClick}
                                ><i aria-hidden="true" className="add icon"></i>
                                    Add to your CookBook
                    </button>
                            </div>
                        </div>
                    </>
                ) : (
                        <>
                            <div className="top"><h1 className="main">{this.props.regionName}</h1></div>
                            <div className="recipeCard">
                                <h2>{this.props.recipe.name}</h2>
                                <h3>Created By: <p>Me</p></h3>
                                <h3>Ingredients:</h3><p> {this.props.recipe.ingredients}</p>
                                <h3>Directions:</h3><p> {this.props.recipe.direction}</p>
                                <h3>Difficulty:</h3><p>{this.props.recipe.difficulty}</p>
                                <h3>Rate: <br />
                                    <p>{this.props.recipe.rate} /5 stars</p></h3>
                                {this.props.recipe.imageUrl === "" ? (
                                    <div></div>
                                ) : (
                                        <picture>
                                            <img src={this.props.recipe.imageUrl} alt={this.props.recipe.name} />
                                        </picture>
                                    )}
                                <div className="buttonWrap">
                                    <button
                                        className="ui icon button" onClick={this.handleDelete}
                                    ><i aria-hidden="true" className="delete icon"></i>
                                        Delete it
                                </button>
                                    <button type="button" className="ui icon button" onClick={() => { this.props.history.push(`/cookbook/${this.props.recipe.id}/edit`) }}><i aria-hidden="true" className="edit icon"></i>Edit</button>
                                </div>
                            </div>
                        </>
                    )}
            </>
        );
    }
}

export default withRouter(RecipeCard)