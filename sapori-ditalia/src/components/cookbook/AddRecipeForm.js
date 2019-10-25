import React from 'react';
import APIManager from '../../modules/APIManager';
import { withRouter } from "react-router-dom"



class AddRecipeForm extends React.Component {
    state = {
        name: "",
        ingredients: "",
        direction: "",
        difficulty: "",
        rate: "",
        loadingStatus: false,
        regionId: "1",
        regions: []

    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    componentDidMount() {
        APIManager.getRegions()
            .then((allRegions) => {
                this.setState({
                    regions: allRegions
                }
                )
            })
    }

    constructNewRecipe = evt => {
        evt.preventDefault();
        if (this.state.name === "" || this.state.ingredients === "" || this.state.difficulty === "" || this.state.rate === "" || this.state.direction === "") {
            window.alert("Please fill up all the fields");
        } else {
            const recipe = {
                name: this.state.name,
                ingredients: this.state.ingredients,
                regionId: parseInt(this.state.regionId),
                difficulty: this.state.difficulty,
                rate: this.state.rate,
                direction: this.state.direction
            };
            APIManager.postRecipe(recipe)
                .then(() => this.props.history.push("/explore"))


        }
    };

    render() {


        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <label htmlFor="Recipe Name">Name: </label>
                            <input type="text" required onChange={this.handleFieldChange} id="name" placeholder="Recipe Name" /> <br />
                            <label htmlFor="Ingredients">Ingredients: </label>
                            <input type="text" required onChange={this.handleFieldChange} id="ingredients" placeholder="Ingredients" /> <br />
                            <label htmlFor="Directions">Directions: </label>
                            <input type="text" required onChange={this.handleFieldChange} id="direction" placeholder="Directions" /> <br />
                            <label htmlFor="Difficulty">Difficulty: </label>
                            <input type="text" required onChange={this.handleFieldChange} id="difficulty" placeholder="Difficulty" /> <br />
                            <label htmlFor="Rate">Rate it: </label>
                            <input type="text" required onChange={this.handleFieldChange} id="rate" placeholder="Rate" /> <br />
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
                            <button type="button" disabled={this.state.loadingStatus} onClick={this.constructNewRecipe}>Submit
                            </button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default withRouter(AddRecipeForm);