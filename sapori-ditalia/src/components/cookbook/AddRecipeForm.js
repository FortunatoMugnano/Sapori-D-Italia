import React from 'react';
import APIManager from '../../modules/APIManager';
import { withRouter } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
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
        loadingStatus: false,
        rate: 0,
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
                rate: this.state.rate,
                imageUrl: this.state.imageUrl,
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


                <div className="buttonWrap">
                    <Button color="danger" onClick={this.props.toggle}>Add a recipe</Button>
                    <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                        <ModalHeader toggle={this.props.toggle}>Share Your Creations with the World</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>

                                        <Label htmlFor="Recipe Name">Recipe Name: </Label>
                                        <Input type="text" required onChange={this.handleFieldChange} id="name" placeholder="Recipe Name" /> <br />
                                        <Label htmlFor="Ingredients">Ingredients: </Label>
                                        <Input type="textarea" required onChange={this.handleFieldChange} id="ingredients" placeholder="Ingredients" /> <br />
                                        <Label htmlFor="Directions">Directions: </Label>
                                        <Input type="textarea" required onChange={this.handleFieldChange} id="direction" placeholder="Directions" /> <br />
                                        <Label htmlFor="Difficulty">Difficulty: </Label>
                                        <Input type="text" required onChange={this.handleFieldChange} id="difficulty" placeholder="Difficulty" /> <br />
                                        <Label for="regionId">Region: </Label>
                                        <Input type="select"
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
                                            <Button type="button" color="primary" disabled={this.state.loadingStatus} onClick={this.constructNewRecipe}>Submit
                                            </Button>
                                        </div>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary"
                            onClick={this.props.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>














            </>
        )
    }
}

export default withRouter(AddRecipeForm);