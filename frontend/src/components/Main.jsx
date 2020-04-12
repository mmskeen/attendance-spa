import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth } from "react-use-auth";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from './LandingPage';
import Attendance from './Attendance';
import MeetingDetails from './MeetingDetails';
import Profile from './Profile';
import AUTHCallback from "./AUTHCallback";




const Main = () => {


  const { isAuthenticated, login, logout, user } = useAuth();
  const loginUser = {
    email: "mmskeen@gmail.com",
    _id: "5db88ff9e8f87b150d29d0df"
  }

  useEffect(() => {
    console.log("isAuthenticated: ", isAuthenticated());
    console.log("user: ", user);
  }, []);


  const Greeting = () => {
    useEffect(() => {
      console.log("isAuthenticatedGr: ", isAuthenticated());
      console.log("userGr: ", user);
    }, []);
    const greeting = isAuthenticated() ?
      <h1>Hi, {user.name}!</h1> :
      <h1>Hi there! Please login.</h1>;

    const loginButtons = isAuthenticated() ?
      <button onClick={logout}>Logout</button> :
      <button onClick={login}>Login</button>;
    return (
      <div>
        {greeting}
        {loginButtons}
      </div>
    );
  }



  return (
    <Switch>
      <Route exact path="/" component={Greeting} />
      <ProtectedRoute exact path="/attendance" render={props => (
        <Attendance {...props} user={loginUser} onLogin={LoginCB} />
      )} />
      <ProtectedRoute exact path="/meetings" render={props => (
        <MeetingDetails {...props} user={loginUser} />
      )} />
      <ProtectedRoute exact path="/profile" render={props => (
        <Profile {...props} user={loginUser} />
      )} />
      <Route exact path="/auth0_callback" component={AUTHCallback} />
    </Switch>
  );
}

export default Main;