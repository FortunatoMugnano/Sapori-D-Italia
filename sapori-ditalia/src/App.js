import React, {Component} from 'react';
import Login from './components/auth/Login'
import ApplicationViews from "./components/ApplicationViews"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../src/components/nav/navbar'


class App extends Component {
  state = {
    user: localStorage.getItem("credentials") !== null,
    userId: localStorage.getItem("credentials") !== null ? JSON.parse(localStorage.getItem("credentials")).id : false
  }

  // Check if credentials are in local storage
  //returns true/false
  isAuthenticated = () => localStorage.getItem("credentials") !== null


  setUser = (authObj) => {

    /*
      For now, just store the email and password that
      the customer enters into local storage.
    */
    localStorage.setItem(
      "credentials",
      JSON.stringify(authObj)
    )

    this.setState({
      user: this.isAuthenticated(),
      userId: authObj.id
    });
  }


  render() {

    return(
      <>
        {this.state.user ?
          <>
            <Navbar />
            <ApplicationViews userId={this.state.userId} />
          </>
          :
          <Login setUser={this.setUser} />
        }
      </>
    )
  }
}

export default App;
