import React, { Component } from 'react';
import { Nav } from "react-bootstrap"
import { withRouter } from "react-router-dom"


class Navbar extends Component {

    handleLogout = () => {
        this.props.clearUser();
      }



    render() {
        console.log("My Active user number", (sessionStorage.getItem("activeUser")));
        return (

            <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/explore">Explore</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/cookbook">My CookBook</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/messages">Messages</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={this.handleLogout}>Log Out</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }

}

export default withRouter(Navbar)