import React, { useEffect } from 'react';
import { useAuth } from "react-use-auth";
import Navbar from './Navbar';

const LandingPage = () => {
  const { login } = useAuth();

  useEffect(() => {
    document.body.id = "home";
  });

  const year = new Date().getFullYear();
  return (
    <div>
      {/* Title */}
      <section id="title" className="colored-section">
        <div className="container-fluid">
          <Navbar colored={true} />
          <div className="row">
            <div className="col-lg-6">
              <h1 className="big-heading">Make attendance a breeze.</h1>
              <a
                className="btn btn-dark btn-lg auth-button"
                role="button"
                href="#"
                onClick={login}
              >
                Login
          </a>
              <a
                className="btn btn-outline-light btn-lg auth-button"
                role="button"
                href="#"
                onClick={login}
              >
                Register
          </a>
            </div>
            <div className="col-lg-6">
              <img
                className="title-image"
                src="images/Christian_Endeavor_roll_call_and_record_of_attendance_at_the_monthly_consecration_meeting_(1889)_(14783476803).jpg"
                alt="roll call image"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features */}
      <section id="features" className="white-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 feature">
              <i className="fas fa-check-circle fa-4x feature-icon" />
              <h3 className="feature-title">Easy for hosts.</h3>
              <p>Create a meeting code in a snap.</p>
            </div>
            <div className="col-lg-4 feature">
              <i className="fas fa-bullseye fa-4x feature-icon" />
              <h3 className="feature-title">Easy for attendees.</h3>
              <p>Type in the meeting code to log your attendance.</p>
            </div>
            <div className="col-lg-4 feature">
              <i className="fas fa-heart fa-4x feature-icon" />
              <h3 className="feature-title">Get desired data.</h3>
              <p>Get attendee contact info as needed.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section id="cta" className="colored-section">
        <div className="container-fluid">
          <h3 className="big-heading">Try Attending Today.</h3>
          <a
            className="btn btn-dark btn-lg auth-button"
            role="button"
            href="#"
            onClick={login}
          >
            Login
      </a>
          <a
            className="btn btn-outline-light btn-lg auth-button"
            role="button"
            href="#"
            onClick={login}
          >
            Register
      </a>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;