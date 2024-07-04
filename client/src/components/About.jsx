import React from "react";
import "./style.css";

export const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="div">
        <div className="navbar-container">
          <div className="navbar-content">
            <img className="navbar-brand" alt="Navbar brand" src="navbar-brand.png" />
            <div className="navbar-menu">
              <div className="navbar-link">
                <div className="text-wrapper">About</div>
              </div>
              <div className="navbar-link">
                <div className="text-wrapper">Buy</div>
              </div>
              <div className="navbar-link">
                <div className="text-wrapper">Sell</div>
              </div>
              <button className="navbar-button">
                <div className="text-wrapper-2">Login</div>
              </button>
            </div>
          </div>
        </div>
        <p className="welcome-to-dyno-the">
          <span className="span">
            {" "}
            <br />
            Welcome to Dyno, the leader in smart power management. We revolutionize energy management with blockchain
            technology, ensuring efficiency, sustainability, and transparency.
            <br />
          </span>
          <span className="text-wrapper-3">
            Our Vision
            <br />
          </span>
          <span className="span">
            <br />
            We aim for a decentralized, transparent, and efficient energy future. Our platform empowers users with
            secure, tamper-proof energy transactions and data management.
            <br />
          </span>
          <span className="text-wrapper-3">What We Do</span>
          <span className="span">
            {" "}
            <br />
            Smart Power Management: Real-time tracking and optimization of energy usage. Blockchain Technology: Secure,
            transparent, and immutable energy transactions. Dyno Coin: Facilitates secure transactions and rewards for
            energy savings.
            <br />{" "}
          </span>
          <span className="text-wrapper-3">Join Us</span>
          <span className="span">
            {" "}
            <br />
            Join Dyno in creating a smarter, more sustainable world by redefining energy management and making a lasting
            environmental impact.
          </span>
        </p>
        <img className="pic" alt="Pic" src="pic-1.png" />
        <div className="text-wrapper-4">About Us</div>
      </div>
    </div>
  );
};
