import React, { useEffect, useState } from "react";
import AttendedMeeting from "./AttendedMeeting";
import HostedMeeting from "./HostedMeeting";

const Attendance = (props) => {
  const [dbUser, setDbUser] = useState({ email: "" });
  const [meetingsAttended, setMeetingsAttended] = useState([]);
  const [meetingsHosted, setMeetingsHosted] = useState([]);

  const updateDbUser = () => {
    console.log("props: ", props);
    console.log("props.dbUser.email: ", props.dbUser.email)
    console.log("props.loginUser.email: ", props.loginUser.email)
    console.log("dbUser.email: ", dbUser.email)
    if (props.dbUser.email === props.loginUser.email) {
      if (props.dbUser.email === dbUser.email) {
        console.log("All emails match!");
        return;
      }
      setDbUser(props.dbUser);
      return;
    }
    console.log("emails don't match!");
    fetch(`/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: props.loginUser.email }),
    }).then(response => response.json()
    ).then(data => {
      console.log("data.doc: ", data.doc);
      setDbUser(data.doc);
      return data;
    }).then(data => {
      console.log("data 2nd time: ", data);
      props.onLogin(data.doc);
    });
  }

  const getAttendedMeetings = () => {

    const mtgURL = "/users/" + dbUser._id + "/meetingsAttended";
    fetch(mtgURL)
      .then(response => response.json())
      .then(meetings => {
        setMeetingsAttended(meetings.map(m => (
          <AttendedMeeting key={m._id} userId={dbUser._id} meeting={m}
            deleteCallback={updateAttendedMeetingsCB} />
        )));
      });
  }
  const getHostedMeetings = () => {
    const mtgURL = "/users/" + dbUser._id + "/meetingsHosted";
    fetch(mtgURL)
      .then(response => response.json())
      .then(meetings => {
        setMeetingsHosted(meetings.map(m => (
          <HostedMeeting key={m._id} userId={dbUser._id} meeting={m}
            deleteCallback={updateHostedMeetingsCB} />
        )));
      });
  }
  const updateAttendedMeetingsCB = () => {
    getAttendedMeetings();
  }
  const updateHostedMeetingsCB = () => {
    getHostedMeetings();
  }
  useEffect(() => {
    updateDbUser();
    if (!dbUser.email) {
      return;
    }
    getAttendedMeetings();
    getHostedMeetings();
    document.body.id = "dashboard";
    return () => document.body.id = "";
  }, [dbUser.email]);

  const attendMeeting = e => {
    e.preventDefault();
    fetch(`/users/${dbUser._id}/attendEvent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: e.target.meetingCode.value }),
    }).then(response => response.json()
    ).then(data => {
      if (data.success) {
        alert("Successfully joined meeting: " + data.description + ": " + data.code);
      } else {
        alert("Error: " + data.error);
      }
      getAttendedMeetings();
      document.getElementById("attendMeeting").reset();
    })
      .catch(error => alert("Error: " + error));
  }

  const hostMeeting = e => {
    e.preventDefault();
    const fetchBody = {
      host: dbUser._id,
      title: e.target.meetingDescription.value
    }
    console.log("Fetchbody: ", fetchBody);
    fetch(`/meetings/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fetchBody),
    }).then(response => response.json()
    ).then(data => {
      alert("Successfully hosting meeting!\n Code is " + data.code);
      document.getElementById("hostMeeting").reset();
      getHostedMeetings();
    }).catch(error => alert("Error: " + error));
  }

  return (
    <div>
      &lt;%- include("partials/navbar-loggedIn") %&gt;
      {/* Features */}
      <h2>Dashboard</h2>
      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-7 mx-auto">
            <div className="card">
              <div className="card-body colored-section">
                {/* Makes POST request to /attendMeeting route */}
                <form id="attendMeeting" onSubmit={attendMeeting}>
                  <div className="form-group">
                    <label htmlFor="meetingCode">Join Meeting</label>
                    <input
                      className="form-control"
                      name="meetingCode"
                      placeholder="Enter 4 digit meeting code"
                      type="tel"
                      pattern="[0-9]{4}"
                    />
                    <input
                      type="hidden"
                      name="userId"
                      defaultValue="<%= user._id %>"
                    />
                  </div>
                  <button type="submit" className="btn btn-light">
                    Join
              </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-7 mx-auto">
            <div className="card">
              <div className="card-body">
                {/* Makes POST request to /hostMeeting route */}
                <form id="hostMeeting" onSubmit={hostMeeting}>
                  <div className="form-group">
                    <label htmlFor="meetingDescription">Host Meeting</label>
                    <input
                      className="form-control"
                      name="meetingDescription"
                      placeholder="Meeting Description"
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Host Meeting
            </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <h3>Meetings Attended</h3>
      <div className="list-group mx-5">
        {meetingsAttended}
      </div>
      <h3>Meetings Hosted</h3>
      <div className="list-group mx-5">
        {meetingsHosted}
      </div>
    </div>

  );
}

export default Attendance;