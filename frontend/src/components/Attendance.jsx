import React, { useEffect, useState } from "react";
import AttendedMeeting from "./AttendedMeeting";
import HostedMeeting from "./HostedMeeting";

const Attendance = ({ user, attendedMeetings, hostedMeetings }) => {
  const [meetingsAttended, setMeetingsAttended] = useState([]);
  const [meetingsHosted, setMeetingsHosted] = useState([]);
  const getAttendedMeetings = () => {
    const mtgURL = "/users/" + user._id + "/meetingsAttended";
    fetch(mtgURL)
      .then(response => response.json())
      .then(meetings => {
        setMeetingsAttended(meetings.map(m => (
          <AttendedMeeting key={m._id} userId={user._id} meeting={m}
            deleteCallback={updateAttendedMeetingsCB} />
        )));
      });
  }
  const getHostedMeetings = () => {
    const mtgURL = "/users/" + user._id + "/meetingsHosted";
    fetch(mtgURL)
      .then(response => response.json())
      .then(meetings => {
        setMeetingsHosted(meetings.map(m => (
          <HostedMeeting key={m._id} userId={user._id} meeting={m}
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
    getAttendedMeetings();
    getHostedMeetings();
    document.body.id = "dashboard";
    return () => document.body.id = "";
  }, []);

  const attendMeeting = e => {
    e.preventDefault();
    fetch(`/users/${user._id}/attendEvent`, {
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
    })
      .catch(error => alert("Error: " + error));
  }

  const hostMeeting = e => {
    e.preventDefault();
    const fetchBody = {
      host: user._id,
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
      getHostedMeetings();
    }).catch(error => alert("Error: " + error));
  }

  return (
    <body id="attendance">
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
    </body>

  );
}

export default Attendance;