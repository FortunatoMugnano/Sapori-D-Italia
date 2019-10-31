import React, { Component } from 'react'
import APIManager from '../../modules/APIManager';
import RecipeCard from "./RecipeCard"

class RecipeList extends Component {
    state = {
        recipes: [],
        region: "",
    }

    componentDidMount() {
        APIManager.getRecipesByRegionId(this.props.regionId).then(recipes => {
            this.setState({
                recipes: recipes
            });
        }).then(
            APIManager.getRegionsById(this.props.regionId).then(region => {
                this.setState({
                    region: region
                });
            })
        )
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
                            regionName={this.state.region.name}
                        />
                    ))}
                </section>
            </>
        )
    }
}
export default RecipeList