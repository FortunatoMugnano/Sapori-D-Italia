import React, { Component } from 'react'
import APIManager from '../../modules/APIManager';
import MyRecipeCard from "./MyRecipeCard"
import AddRecipeForm from "./AddRecipeForm"

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
            console.log("recipes prop", recipes)
            this.setState({
                MyRecipes: recipes
            });
        });
    }



    render() {

        return (

            <>
                <section className="cookbook-section">
                    <h1>MY COOKBOOK</h1>
                    {this.state.MyRecipes.map(recipe => (
                        <MyRecipeCard
                            userName={recipe.user.userName}
                            key={recipe.id}
                            recipeId={recipe.id}
                            recipe={recipe.myRecipe}
                            {...this.props}
                            getData={this.getData}
                        />
                    ))}
                    <AddRecipeForm getData={this.getData}/>
                </section>
            </>
        )
    }
}
export default MyRecipeList