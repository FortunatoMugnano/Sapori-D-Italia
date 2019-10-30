import React, { Component } from 'react'
import APIManager from '../../modules/APIManager';
import MyRecipeCard from "./MyRecipeCard"
import AddRecipeForm from "./AddRecipeForm"

class MyRecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            MyRecipes: []

        };

        this.toggle = this.toggle.bind(this);

    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
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
        })
    }



    render() {


        return (

            <>
                <section className="cookbook-section">
                    <h1 className="main">MY COOKBOOK</h1>
                    <AddRecipeForm getData={this.getData}
                        modal={this.state.modal}
                        toggle={this.toggle} />
                </section>
                <div>
                    {this.state.MyRecipes.map(recipe => (
                        <MyRecipeCard
                            key={recipe.id}
                            recipeId={recipe.id}
                            recipe={recipe.myRecipe}
                            {...this.props}
                            getData={this.getData}
                        />
                    ))}

                </div>

            </>
        )
    }
}
export default MyRecipeList