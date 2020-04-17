import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Profile = ({ user }) => {

  useEffect(() => {
    console.log("user: ", user);
    document.body.id = "profile";
  });

  console.log(user);
  return (
    <div>
      <Navbar colored={false} />
      <div className="container">
        <h2>Profile</h2>
        <form className="form-horizontal mt-4 pt-4" role="form">
          <div className="form-group">
            <label htmlFor="firstName" className="col-sm-3 control-label">
              First Name
      </label>
            <div className="col-sm-9">
              <p className="col-sm-9">{user.firstName}</p>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="col-sm-3 control-label">
              Last Name
      </label>
            <div className="col-sm-9">
              <p className="col-sm-9">{user.lastName}</p>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="col-sm-3 control-label">
              Preferred Email{" "}
            </label>
            <div className="col-sm-9">
              <p className="col-sm-9">{user.preferredEmail}</p>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="birthDate" className="col-sm-3 control-label">
              Date of Birth*
      </label>
            <div className="col-sm-9">
              <p className="col-sm-9">{user.birthDate}</p>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cellNumber" className="col-sm-3 control-label">
              Cell number{" "}
            </label>
            <div className="col-sm-9">
              <p className="col-sm-9">{user.cellPhone}</p>
              <span className="help-block">
                Your cell number won't be disclosed anywhere{" "}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="schoolId" className="col-sm-3 control-label">
              School ID{" "}
            </label>
            <div className="col-sm-9">
              <p className="col-sm-9">{user.schoolId}</p>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-9 col-sm-offset-3">
              <span className="help-block">*Required fields</span>
            </div>
          </div>
          <Link to="/profile-edit" className="btn btn-primary btn-block">
            Edit
    </Link>
        </form>
      </div>
    </div>)

}

export default Profile;