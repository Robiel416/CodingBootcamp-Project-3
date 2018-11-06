import React, { Component } from "react";
import axios from "axios";

import './App.css';

import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import PrivateRoute from './components/playgroundcomps/PrivateRoute';

import Home from './components/Home';
import Restaurant from './components/Restaurant';
import Customer from './components/Customer';
import Messages from './components/Messages';

class App extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            username: null
        }

        this.getUser = this.getUser.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.updateUser = this.updateUser.bind(this)
    }

    componentDidMount() {
        this.getUser()
    }

    updateUser(userObject) {
        this.setState(userObject)
    }

    getUser() {
        axios.get('/find').then(response => {
            console.log('Get user response: ')
            console.log(response.data)
            if (response.data.user) {
                console.log('Get User: There is a user saved in the server session: ')
                this.setState({
                    loggedIn: true,
                    username: response.data.user.username
                })
            } else {
                console.log('Get user: no user');
                this.setState({
                    loggedIn: false,
                    username: null
                })
            }
        })
    }

    render() {
        // const { from } = this.props.location.state || { from: { pathname: '/' } }

        // if (this.state.loggedIn === true) {
        //   return <Redirect to={ from } />
        // }

        return (
            <div>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <PrivateRoute exact path="/Restaurant" component={Restaurant} />
                        <Route exact path="/Customer" component={Customer} />
                        <Route exact path="/Messages" component={Messages} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
