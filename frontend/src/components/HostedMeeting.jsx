import React from "react";
import { Link } from "react-router-dom";

const HostedMeeting = ({ userId, meeting, deleteCallback }) => {
  const handleDelete = e => {
    // console.log("Meeting: ", meeting);
    e.preventDefault();
    if (window.confirm(`Delete meeting ${meeting.title}?`)) {
      fetch(`/api/meetings/${meeting._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }).then(data => console.log(data.text()))
        .then(deleteCallback())
        .catch(error => console.log("error: ", error));
    }
  };
  return (<li className="list-group-item list-group-item-action">
    <form onSubmit={handleDelete}>
      <Link className="name" to={"/meetings?id=" + meeting._id}>{meeting.title}: {meeting.code} </Link>
      <button type="submit" className="btn btn-danger btn-xs pull-right remove-item"> Delete <span className="glyphicon glyphicon-remove"></span>
      </button>
    </form>
  </li>);
};

export default HostedMeeting;