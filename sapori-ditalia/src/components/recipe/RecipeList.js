import React, { Component } from 'react'
import APIManager from '../../modules/APIManager';
import RecipeCard from "./RecipeCard"

class RecipeList extends Component {
    state = {
        recipes: []
    }

    componentDidMount() {
        APIManager.getRecipesByRegionId(this.props.regionId).then(recipes => {
            this.setState({
                recipes: recipes
            });
        });
    }

    getData = () => {
        APIManager.getRecipesByRegionId(this.props.regionId).then(recipes => {
            this.setState({
                recipes: recipes
            });
        })
	};


    render() {

        return (

            <>

                <section className="recipes-section">
                    {this.state.recipes.map(recipe => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            {...this.props}
                            getData={this.getData}
                        />
                    ))}
                </section>
            </>
        )
    }
}
export default RecipeList