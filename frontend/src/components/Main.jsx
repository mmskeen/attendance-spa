import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth } from "react-use-auth";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from './LandingPage';
import Footer from './Footer';
import Attendance from './Attendance';
import MeetingDetails from './MeetingDetails';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import AUTHCallback from "./AUTHCallback";




const Main = () => {

  const [dbUser, setDbUser] = useState({});

  const { isAuthenticated, login, logout, user } = useAuth();
  // const dbUser = {
  //   email: "mmskeen@gmail.com",
  //   _id: "5db88ff9e8f87b150d29d0df"
  // }

  const updateUserCB = (userData) => {
    console.log("In Main.jsx, loginCB, data: ", userData);
    setDbUser(userData);
  }

  useEffect(() => {
    console.log("isAuthenticated: ", isAuthenticated());
    console.log("user: ", user);
    console.log("dbUser: ", dbUser);
  }, []);



  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <ProtectedRoute exact path="/attendance" component={Attendance}
          dbUser={dbUser} onLogin={updateUserCB} />
        )} />
        <ProtectedRoute exact path="/meetings" component={MeetingDetails}
          user={dbUser} />
        )} />
        <ProtectedRoute exact path="/profile" component={Profile}
          user={dbUser} />
        )} />
        <ProtectedRoute exact path="/profile-edit" component={ProfileEdit}
          user={dbUser} onSaveUser={updateUserCB} />
        )} />
        <Route exact path="/auth0_callback" component={AUTHCallback} />
      </Switch>
      <Footer />
    </div>
  );
}

export default Main;