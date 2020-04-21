import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import queryString from "query-string";

const Attendee = ({ attendee }) => {
  return (
    <li className="list-group-item list-group-item-action">
      <form className="row-form">
        <div className="attribute-container names">
          <div className="name">
            {attendee.lastName}, {attendee.firstName}
          </div>
          <div>
            {attendee.preferredEmail}
          </div>
        </div>
        <div className="attribute-container numbers">
          <div>{attendee.birthDate}</div>
          <div>{attendee.schoolId}</div>
        </div>
        <div className="attribute-container numbers">
          <div>{attendee.cellPhone}</div>
          <div>
            <button
              type="submit"
              className="btn btn-danger btn-xs pull-right remove-item"
              name="meetingCode"
            >Delete<span className="glyphicon glyphicon-remove" />
            </button>
          </div>
        </div>
      </form>
    </li>
  )

}

const MeetingDetails = (props) => {
  const [meetingDetails, setMeetingDetails] = useState({
    attendees: [],
    title: "",
    host: {
      username: "",
      preferredEmail: ""
    },
  });

  useEffect(() => {
    getMeetingDetails();
    document.body.id = "meetingDetails";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteAttendeeCB = () => {
    getMeetingDetails();
  }

  const getMeetingDetails = () => {
    const queries = queryString.parse(props.location.search);
    const mtgURL = "/api/meetings/" + queries.id;
    fetch(mtgURL)
      .then(response => response.json())
      .then(meeting => {
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


  return (
    <div>
      <Navbar colored={false} />
      <h2>Meeting Details</h2>
      <h3>{"Title: " + meetingDetails.title}</h3>
      <h4>{"Code: " + meetingDetails.code}</h4>
      <h4>
        {"Host: " + (meetingDetails.host.username ? meetingDetails.host.username :
          meetingDetails.host.preferredEmail)}
      </h4>
      <br />
      <h3>Attendees</h3>
      <div className="list-group">
        {meetingDetails.attendees}
      </div>
    </div>
  )

}

export default MeetingDetails;