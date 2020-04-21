import React from "react";


const AttendedMeeting = ({ userId, meeting, deleteCallback }) => {
  const handleDelete = e => {
    e.preventDefault();
    if (window.confirm(`Delete attendance at meeting ${meeting.title}?`)) {
      fetch(`/api/users/${userId}/attendEvent`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meetingCode: meeting.code })
      }).then(data => console.log(data.text()))
        .then(deleteCallback())
        .catch(error => console.log("error: ", error));
    }
  };
  return (<li className="list-group-item list-group-item-action">
    <form onSubmit={handleDelete}>
      <span className="name">{meeting.title}: {meeting.code} </span>
      <button type="submit" className="btn btn-danger btn-xs pull-right remove-item"> Delete <span className="glyphicon glyphicon-remove"></span>
      </button>
    </form>
  </li>);
};

export default AttendedMeeting;
