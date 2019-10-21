import React, { Component } from 'react';
import { Route } from 'react-router-dom';


class ApplicationViews extends Component {

    render() {
        console.log("userId", (sessionStorage.getItem("activeUser")))
        return (
            <>
                <Route exact path="/explore" render={props => {
                    return <img src="../images/italy-map.gif" alt="map of italy" />
                }} />

            </>

        )

    }
}

export default ApplicationViews;