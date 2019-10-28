import React from 'react';
import APIManager from '../../modules/APIManager';
import { withRouter } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const uploadPreset = 'sapori';
const uploadURL = 'https://api.cloudinary.com/v1_1/fortunato/image/upload';


class AddRecipeForm extends React.Component {
    state = {
        name: "",
        ingredients: "",
        direction: "",
        difficulty: "",
        uploadURL: null,
        file: null,
        rate: "",
        loadingStatus: false,
        imageUrl: "",
        regionId: "1",
        regions: [],
        userId: ""

    };
    // this is the functionality for react-dropzone to upload images
    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }


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

    // this uploads the image to cloudinary, and sends a URL to the image back in its place
    handleImageUpload(file) {
        let upload = request.post(uploadURL)
            .field('upload_preset', uploadPreset)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    imageUrl: response.body.secure_url
                });
            }
        });
    }


    constructNewRecipe = evt => {
        evt.preventDefault();
        if (this.state.name === "" || this.state.ingredients === "" || this.state.difficulty === "" || this.state.rate === "" || this.state.direction === "") {
            window.alert("Please fill up all the fields");
        } else {
            let userId = parseInt(sessionStorage.getItem('activeUser'));
            const recipe = {
                name: this.state.name,
                ingredients: this.state.ingredients,
                regionId: parseInt(this.state.regionId),
                difficulty: this.state.difficulty,
                imageUrl: this.state.imageUrl,
                rate: this.state.rate,
                direction: this.state.direction,
                userId: userId
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
                        <section className="formgrid">
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
                            <div>
                                <div className="FileUpload">
                                    <Dropzone
                                        onDrop={this.onImageDrop.bind(this)}
                                        accept="image/*"
                                        multiple={false}>
                                        {({ getRootProps, getInputProps }) => {
                                            return (
                                                <div
                                                    {...getRootProps()}
                                                >
                                                    <input {...getInputProps()} /> ADD PICTURES:
                                                    {
                                                        <p>Try dropping some files here, or click to select files to upload.</p>
                                                    }
                                                </div>
                                            )
                                        }}
                                    </Dropzone>

                                </div>

                                <div>
                                    {this.state.imageUrl === '' ? null :
                                        <div>
                                            <p>{this.state.name}</p>
                                            <img src={this.state.imageUrl} />
                                        </div>}
                                </div>
                            </div>
                            <div className="alignRight">
                                <button type="button" disabled={this.state.loadingStatus} onClick={this.constructNewRecipe}>Submit
                            </button>
                            </div>
                        </section>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default withRouter(AddRecipeForm);