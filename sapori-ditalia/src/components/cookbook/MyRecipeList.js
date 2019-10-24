import React, { Component } from 'react'
import APIManager from '../../modules/APIManager';
import MyRecipeCard from "./MyRecipeCard"

class MyRecipeList extends Component {
    state = {
        MyRecipes: []
    }

    getData = () => {
        let userId = parseInt(sessionStorage.getItem('activeUser'));
		APIManager.getMyRecipes(userId).then(recipes => {
			this.setState({
				MyRecipes: recipes
			});
		});
	};

    componentDidMount() {
     let userId = parseInt(sessionStorage.getItem('activeUser'));
        APIManager.getMyRecipes(userId).then(recipes => {
            this.setState({
                MyRecipes: recipes
            });
        });
    }



    render() {

        return (

            <>

                <section className="cookbook-section">
                    {this.state.MyRecipes.map(recipe => (
                        <MyRecipeCard
                            key={recipe.id}
                            recipe={recipe.myRecipe}
                            {...this.props}
                            getData={this.getData}
                        />
                    ))}
                </section>
            </>
        )
    }
}
export default MyRecipeList