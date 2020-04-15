import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth } from "react-use-auth";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from './LandingPage';
import Navbar from './Navbar';
import Attendance from './Attendance';
import MeetingDetails from './MeetingDetails';
import Profile from './Profile';
import AUTHCallback from "./AUTHCallback";




const Main = () => {

  const [dbUser, setDbUser] = useState({});

  const { isAuthenticated, login, logout, user } = useAuth();
  // const dbUser = {
  //   email: "mmskeen@gmail.com",
  //   _id: "5db88ff9e8f87b150d29d0df"
  // }

  const loginCB = (userData) => {
    console.log("In Main.jsx, loginCB, data: ", userData);
    setDbUser(userData);
  }

  useEffect(() => {
    console.log("isAuthenticated: ", isAuthenticated());
    console.log("user: ", user);
    console.log("dbUser: ", dbUser);
  }, []);


  const Greeting = () => {
    useEffect(() => {
      console.log("isAuthenticatedGr: ", isAuthenticated());
      console.log("userGr: ", user);
      console.log("email: ", user.email);
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
    <div>
      <Navbar isAuthenticated={isAuthenticated} />
      <Switch>
        <Route exact path="/" component={Greeting} />
        <Route exact path="/attendance" render={props => (
          <Attendance {...props} loginUser={user} dbUser={dbUser} onLogin={loginCB} />
        )} />
        <Route exact path="/meetings" render={props => (
          <MeetingDetails {...props} user={dbUser} />
        )} />
        <Route exact path="/profile" render={props => (
          <Profile {...props} user={dbUser} />
        )} />
        <Route exact path="/auth0_callback" component={AUTHCallback} />
      </Switch>
    </div>
  );
}

export default Main;