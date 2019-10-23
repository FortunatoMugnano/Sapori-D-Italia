import React, { Component } from 'react';
import { Link } from "react-router-dom"

class RegionCard extends Component {
    render() {


        return (
            <>
                <div className="regionCard">
                    <h2>{this.props.region.name}</h2>
                    <p>{this.props.region.description}</p>
                    <Link to={`/recipes/${this.props.region.id}`}><button
                        className="ui icon button"
                    ><i aria-hidden="true" className="explore icon"></i>
                        Explore
							</button></Link>
                </div>
            </>
        );
    }
}

export default RegionCard