import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { withRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const uploadPreset = 'sapori';
const uploadURL = 'https://api.cloudinary.com/v1_1/fortunato/image/upload';


class EditRecipeForm extends Component {
    //set the initial state
    state = {
        name: "",
        ingredients: "",
        difficulty: "",
        rate: "",
        loadingStatus: true,
        uploadURL: null,
        file: null,
        imageUrl: "",
        direction: "",
        regionId: "",
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
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
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

    updateExistingRecipe = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        let userId = parseInt(sessionStorage.getItem('activeUser'));
        const editedRecipe = {
            id: this.props.match.params.myRecipeId,
            name: this.state.name,
            imageUrl: this.state.imageUrl,
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
                            imageUrl: recipe.imageUrl,
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
                <Form>
                    <FormGroup>
                    <Label htmlFor="Name">Name</Label>
                            <Input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="name"
                                value={this.state.name}
                            />

<Label htmlFor="ingredients">Ingredients</Label>
                            <Input
                                type="textarea"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="ingredients"
                                value={this.state.ingredients}
                            />
<Label htmlFor="direction">Direction</Label>
                            <Input
                                type="textarea"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="direction"
                                value={this.state.direction}
                            />
                            <Label htmlFor="difficulty">Difficulty</Label>
                            <Input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="difficulty"
                                value={this.state.difficulty}
                            />
                            <Label htmlFor="Rate">Rate</Label>
                            <Input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="rate"
                                value={this.state.rate}
                            />
                            <Label htmlFor="regionId">Region </Label>
                            <Input type="select"
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
                            </Input>
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
                                                    <input {...getInputProps()} /> EDIT THE PICTURE:
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
                            <Button
                                type="button" color="primary" disabled={this.state.loadingStatus}
                                onClick={this.updateExistingRecipe}
                                className="btn btn-primary"
                            >Submit</Button>
                        </div>
                    </FormGroup>
                </Form>
            </>
        );
    }
}

export default withRouter(EditRecipeForm)