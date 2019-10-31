import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import Sessions from './pages/Sessions/Sessions';
import Login from './pages/Auth/Login';
import Logout from './pages/Auth/Logout'
import Register from './pages/Auth/Register';
import MySessions from './pages/MySessions/MySessions'
import MySpeakers from './pages/MySpeakers/MySpeakers'
import NewSession from './pages/NewSession/NewSession';
import EditSession from './pages/EditSession/EditSession';
import EditSpeaker from './pages/EditSpeaker/EditSpeaker'
import NewSpeaker from './pages/NewSpeaker/NewSpeaker';
import Header from './components/Header/Header';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  const [userName, setUserName] = useState ('')
  const [userToken, setUserToken] = useState(window.localStorage['token'])

  const checkLogin = () =>{
    if (window.localStorage.token){
      setUserToken(window.localStorage['token'])
      axios.get('http://localhost:8000/users/api/user/', {
        headers: {
            Authorization: `Token ${userToken}` 
        }
    })
    .then(res => {
          setLoggedIn(true)
          setUserName(res.data[0].first_name)
      }).catch(res =>{
        setLoggedIn(false)
        console.log("I logged you out")
      })
    }
  }
  window.addEventListener('load', checkLogin) 

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      loggedIn ? <Component {...props} /> : <Redirect to='/login' />  
    )} />)

  return (
    <Router>
      <Header loggedIn={loggedIn} userName={userName}></Header>
      <Switch>
          <Route exact path = '/' component={Home}/>
          <PrivateRoute path='/my-sessions' component={MySessions} />
          <PrivateRoute path='/my-speakers' component={MySpeakers} />
          <PrivateRoute path='/new-session' component={NewSession} />
          <PrivateRoute path='/new-speaker' component={NewSpeaker} />
          <PrivateRoute path='/session/:id/edit' component={EditSession} />
          <PrivateRoute path='/speakers/:id/edit' component={EditSpeaker} />
          <Route exact path = '/login' component={Login}/>
          <Route exact path = '/logout' render={(props)=> <Logout {...props} setLoggedIn={setLoggedIn}/>}/>
          <Route exact path = '/logout' component={Logout}/>
          <Route exact path = '/register' component={Register}/>
          <Route exact path = '/Sessions/:id' render={(props)=> <Sessions {...props} loggedIn={loggedIn}/>}/>
      </Switch>
    </Router>
  );
}

export default App;
