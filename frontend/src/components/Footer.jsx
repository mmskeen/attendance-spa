import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer" className="white-section">
      <div className="container-fluid">
        <i className="fab fa-twitter contact-icon"></i>
        <i className="fab fa-facebook contact-icon"></i>
        <i className="fab fa-instagram contact-icon"></i>
        <i className="fas fa-envelope contact-icon"></i>
        <p className="copyright">© Copyright {year} Attending</p>
      </div>
    </footer>

  );
}

export default Footer;