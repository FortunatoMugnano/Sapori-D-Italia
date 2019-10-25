import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { withRouter } from 'react-router-dom';


class EditRecipeForm extends Component {
    //set the initial state
    state = {
        name: "",
        ingredients: "",
        difficulty: "",
        rate: "",
        loadingStatus: true,
        direction: "",
        regionId: "",
        regions: [],
        userId: ""
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingRecipe = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        let userId = parseInt(sessionStorage.getItem('activeUser'));
        const editedRecipe = {
            id: this.props.match.params.myRecipeId,
            name: this.state.name,
            ingredients: this.state.ingredients,
            difficulty: this.state.difficulty,
            regionId: parseInt(this.state.regionId),
            rate: this.state.rate,
            direction: this.state.direction,
            userId: userId
        };

        APIManager.updateRecipe(editedRecipe)
            .then(() => this.props.history.push("/explore"))
    }

    componentDidMount() {
        APIManager.getRegions()
            .then(allRegions => {
                APIManager.getSingleRecipe(this.props.match.params.myRecipeId)
                    .then(recipe => {
                        this.setState({
                            name: recipe.name,
                            ingredients: recipe.ingredients,
                            difficulty: recipe.difficulty,
                            rate: recipe.rate,
                            direction: recipe.direction,
                            regionId: recipe.regionId,
                            regions: allRegions,
                            loadingStatus: false,

                        })
                    })
            })
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="name"
                                value={this.state.name}
                            />
                            <label htmlFor="Name">Name</label>

                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="ingredients"
                                value={this.state.ingredients}
                            />
                            <label htmlFor="ingredients">Ingredients</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="direction"
                                value={this.state.direction}
                            />
                            <label htmlFor="direction">Direction</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="difficulty"
                                value={this.state.difficulty}
                            />
                            <label htmlFor="difficulty">Difficulty</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="rate"
                                value={this.state.rate}
                            />
                            <label htmlFor="Rate">Rate</label>
                            <select
                                className="form-control"
                                id="regionId"
                                value={this.state.regionId}
                                onChange={this.handleFieldChange}
                            >
                                {this.state.regions.map(regions =>
                                    <option key={regions.id} value={regions.id}>
                                        {regions.name}
                                    </option>
                                )}
                            </select>
                        </div>

                        <div className="alignRight">
                            <button
                                type="button" disabled={this.state.loadingStatus}
                                onClick={this.updateExistingRecipe}
                                className="btn btn-primary"
                            >Submit</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default withRouter(EditRecipeForm)