import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";

const ProfileEdit = ({ user, onSaveUser }) => {

  useEffect(() => {
    document.body.id = "profile";
  });

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => { data[key] = value });
    fetch(`/api/users/${user._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(response => response.json()
    ).then(data => {
      onSaveUser(data);
      history.push("/profile");
    })
      .catch(error => alert("Error: " + error));

  }

  return (
    <div>
      <Navbar colored={false} />
      <div className="container">
        <h2>Profile</h2>
        <form className="profile-form form-horizontal mt-4 pt-4" onSubmit={handleSubmit}>
          <Link to="/profile" name="cancel" className="x">
            X
    </Link>
          <div className="form-group">
            <label htmlFor="firstName" className="col-sm-3 control-label">
              First Name
      </label>
            <div className="col-sm-9">
              <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                className="form-control"
                defaultValue={user.firstName}
                autoFocus
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="col-sm-3 control-label">
              Last Name
      </label>
            <div className="col-sm-9">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                className="form-control"
                defaultValue={user.lastName}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="col-sm-3 control-label">
              Preferred Email{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                name="preferredEmail"
                placeholder="Preferred Email"
                className="form-control"
                defaultValue={user.preferredEmail}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="birthDate" className="col-sm-3 control-label">
              Date of Birth*
      </label>
            <div className="col-sm-9">
              <input
                type="date"
                name="birthDate"
                className="form-control"
                defaultValue={user.birthDate}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cellNumber" className="col-sm-3 control-label">
              Cell number{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="phoneNumber"
                name="cellPhone"
                placeholder="Cell number"
                className="form-control"
                defaultValue={user.cellPhone}
              />
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
              <input
                type="number"
                name="schoolId"
                placeholder="Please write your school ID if applicable"
                className="form-control"
                defaultValue={user.schoolId}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-9 col-sm-offset-3">
              <span className="help-block">*Required fields</span>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Save
      </button>
            <Link to="/profile" name="cancel" className="btn btn-danger">
              Cancel
      </Link>
            <button type="reset" value="Reset" className="btn btn-secondary">
              Reset
      </button>
          </div>
        </form>
      </div>
    </div>
  )

}

export default ProfileEdit;