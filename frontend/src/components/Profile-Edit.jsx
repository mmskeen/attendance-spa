import React, { useEffect, useState } from "react";

const Profile = ({ user }) => {

  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = () => {
    const URL = "/users/" + queries.id;
    console.log("mtgURL: ", mtgURL);
    fetch(mtgURL)
      .then(response => response.json())
      .then(meeting => {
        console.log(meeting);
        setMeetingDetails({
          ...meeting,
          attendees: meeting.attendees.map(a => (
            <Attendee key={a._id}
              attendee={a}
              deleteCallback={deleteAttendeeCB} />
          ))
        });
      });

  }
  useEffect(() => {
    document.body.id = "profile";
    getUserInfo();
    return () => document.body.id = "";
  });

  console.log(user);
  return (
    <div className="container">
      <h2>Profile</h2>
      <form className="form-horizontal mt-4 pt-4">
        <div className="form-group">
          <label htmlFor="firstName" className="col-sm-3 control-label">
            First Name
      </label>
          <div className="col-sm-9">
            <p className="col-sm-9">{userInfoInfo.firstName}</p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="col-sm-3 control-label">
            Last Name
      </label>
          <div className="col-sm-9">
            <p className="col-sm-9">{userInfo.lastName}</p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="col-sm-3 control-label">
            Preferred Email{" "}
          </label>
          <div className="col-sm-9">
            <p className="col-sm-9">{userInfo.preferredEmail}</p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="birthDate" className="col-sm-3 control-label">
            Date of Birth*
      </label>
          <div className="col-sm-9">
            <p className="col-sm-9">{userInfo.birthDate}</p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="cellNumber" className="col-sm-3 control-label">
            Cell number{" "}
          </label>
          <div className="col-sm-9">
            <p className="col-sm-9">{userInfo.cellPhone}</p>
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
            <p className="col-sm-9">{userInfo.schoolId}</p>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-9 col-sm-offset-3">
            <span className="help-block">*Required fields</span>
          </div>
        </div>
        <a href="/profile-edit" className="btn btn-primary btn-block">
          Edit
    </a>
      </form>
    </div>
  )

}

export default Profile;