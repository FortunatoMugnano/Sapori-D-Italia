import React, { Component } from 'react'
import APIManager from '../../modules/APIManager';
import RegionCard from "./RegionCard"

class RegionList extends Component {
    state = {
        regions: []
    }

    componentDidMount() {
        APIManager.getRegions().then(regions => {
            this.setState({
                regions: regions
            });
        });
    }


    render() {

        return (

            <>

                <div className="picture-content">
                    <img className="italyMap" src="../images/italy-map.gif" alt="map of italy" />
                </div>
                <section className="explore-section">
                    {this.state.regions.map(region => (
                        <RegionCard
                            key={region.id}
                            region={region}
                            {...this.props}
                        />
                    ))}
                </section>
            </>
        )
    }
}
export default RegionList