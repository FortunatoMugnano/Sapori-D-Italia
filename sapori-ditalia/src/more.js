// componentDidMount() {
//     let userId = parseInt(sessionStorage.getItem('activeUser'));
//     APIManager.getCookBookRecipe(userId).then(recipes => {
//         let recipePromises = recipes.map((recipe) => {
//             return APIManager.getOneRecipe(recipe.myRecipeId)
//         })
//         Promise.all(recipePromises).then((cookbookRecipes) => {
//         this.setState({
//             MyRecipes: cookbookRecipes
//         })
//         })
//     })
// }