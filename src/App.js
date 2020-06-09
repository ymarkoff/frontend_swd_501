import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import Header from './components/layout/Header'
import Login from './components/pages/Login'
import Points from './components/pages/Points'
import AddPoint from './components/pages/AddPoint'
import Review from './components/pages/Review'
import PointReviews from './components/pages/PointReviews'
import UnaprovedReviews from './components/pages/UnaprovedReviews'
// import * as uuid from 'uuid'
import * as jsCookie from 'js-cookie'
import * as axios from 'axios'

class App extends Component {
  state = {
    userData: {},
    isLogged: false,
    isLoading: null
  }

  constructor(props) {
    super(props);

    this.API_LINK = 'https://edward2.solent.ac.uk/~assign260/rest_api/public/api';
    this.subroute = '/~assign260';
    // this.API_LINK = 'http://rest-api.local/api'; //Vhost config
    // this.subroute = '';


    // this.setState({isLoading: true});

    var isAuth = jsCookie.get('isAuth');
    if(isAuth === 'true') {
      var securityToken = localStorage.getItem('securityToken');

        axios.get(this.API_LINK + `/auth?token=${securityToken}`)
          .then((res) => {
            var userData = res.data;

            // this.setState({userData: userData});
            this.state.userData = userData;

            this.state.isLogged = true;
            this.setState({ isLogged: true });
          },
          function(error) {
            jsCookie.set('isAuth', 'false');
            localStorage.removeItem('securityToken');
          })
    } else {
      var userData = {
        username: 'Guest'
      }
      // this.setState({ userData: userData });
      this.state.userData = userData;
    }
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  //Fetch User Data
  login = (userData) => {
    axios.post(this.API_LINK + '/auth', userData)
      .then((res) => {
        var authData = res.data;
        if(authData.success) {
          this.setState({ userData: authData.user_data});
          localStorage.setItem('securityToken', authData.security_token.access_token);
          jsCookie.set('isAuth', 'true');
          this.setState({ isLogged: true })
          alert('Welcome, ' + authData.user_data.username);
        }
        else {
          alert(authData.error_message)
        }
      });
  }

  logout = () => {
    var securityToken = localStorage.getItem('securityToken');

    axios.delete(`${ this.API_LINK }/auth?token=${ securityToken }`)
      .then((res) => {
        var resData = res.data;
        if(resData.success) {
          localStorage.removeItem('securityToken');
          this.setState({ userData: {
            username: 'Guest' 
          }});
          jsCookie.set('isAuth', 'false');
          this.setState({ isLogged: false });
          alert(resData.response_message);
        }
        else {
          alert('An unexpected server error occured');
        }
      });
  }

  //Toggle Complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }

      return todo;
    }) });
  }

  render () {
    var token = localStorage.getItem('securityToken');

    return (
      <Router>
          <div className="App">
            <Header userData={ this.state.userData } isLogged={ this.state.isLogged } logout={ this.logout } API_LINK= { this.API_LINK } subroute={ this.subroute }/>

            <Route exact path={ `${this.subroute}/` } render={ props => (
              <React.Fragment>
                <Redirect to={ `${this.subroute}/points` } />
              </React.Fragment>
            )} />

            <Route exact path={ `${this.subroute}/login` } render={ props => (
              <React.Fragment>
                  {!this.state.isLogged 
                    ?<Login login={ this.login } isLoading={ this.state.isLoading }/>
                    :<Redirect to={ `${this.subroute}/points` } />
                  }
              </React.Fragment>
            )} />

            <Route exact path={`${this.subroute}/points`} render={ props => (
              <React.Fragment>
                <Points API_LINK={this.API_LINK} subroute={ this.subroute } token={ token } isLoading={ this.state.isLoading }/>
              </React.Fragment>
            )} />

            <Route exact path={ `${this.subroute}/points/:id/review` } render={ props => (
              <React.Fragment>
                <Review params={ props.match.params } API_LINK={ this.API_LINK } subroute={ this.subroute } />
              </React.Fragment>
            )} />

            <Route exact path={ `${this.subroute}/points/review` } render={ props => (
              <React.Fragment>
                <Review params={ props.match.params } API_LINK={ this.API_LINK } />
              </React.Fragment>
            )} />

            <Route exact path={ `${this.subroute}/points/:pointID/reviews` } render={ props => (
              <React.Fragment>
                <PointReviews params={ props.match.params } API_LINK={ this.API_LINK } token={ token }/>
              </React.Fragment>
            )} />

            <Route exact path={ `${this.subroute}/points/add-point` } render={ props => (
              <React.Fragment>
                {this.state.isLogged 
                  ?<AddPoint API_LINK={ this.API_LINK } subroute={ this.subroute } isLogged={ this.state.isLogged }/>
                  :<Redirect to={ `${this.subroute}/login` } />
                }
              </React.Fragment>
            )} />

            <Route exact path={ `${this.subroute}/reviews/unaproved` } render={ props => (
              <React.Fragment>
                <UnaprovedReviews token={ token } API_LINK={ this.API_LINK }/>
              </React.Fragment>
            )} />
        </div>
      </Router>
    );
  }
}

export default App;
