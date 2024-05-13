import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/employee-management-system-home-page.png";
import { Row, Col } from "reactstrap";

const Style = {
  imageBlurWrapper: {
    position: "relative",
    width: "100%",
    height: "350px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  blurEffect: {
    position: "absolute",
    top: "-15px",
    left: "-15px",
    right: "-15px",
    bottom: "-15px",
    background: `url(${backgroundImage})`,
    filter: "blur(8px)",
    zIndex: 0,
  },
  imageStyle: {
    position: "relative",
    width: "calc(100% + 8px)",
    height: "calc(100% + 8px)",
    objectFit: "cover",
    filter: "blur(0)",
    margin: "-8px",
    zIndex: 2,
  },
};

const Homepage = () => {
  return (
    <div
      className="bg-gradient-to-r from-pink-500 to-pink-300 ..."
      style={{
        background: "linear-gradient(to right, #c026d3, #e0aaff)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ color: "#d6d3d1", fontSize: "46px" }}>
        Welcome to Perfectus Team...
      </h1>
      <div style={{ display: "flex ", justifyContent: "flex-end" }}>
        <div
          className="container "
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div>
            <Link
              to="/admin-login"
              className="btn btn-primary mr-4 mt-4"
              style={{ marginRight: "15px" }}
            >
              Admin Login
            </Link>
            <Link to="/employee-login" className="btn btn-primary mt-4">
              Employee Login
            </Link>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <Row className="justify-content-center">
          <Col md="6">
            <div
              className="p-4 text-white"
              style={{ color: "white", textAlign: "left" }}
            >
              <div className="px-6 py-4 ">
                <div className="font-bold text-4xl fs-1 ">
                  <span>Employee</span>
                  <br />
                  <span>Management</span>
                  <br />
                  <span>System</span>
                </div>
                <br />
                <p className="text-gray-700 text-base">
                  In the rapidly evolving landscape of technology, our vision is
                  to become the pinnacle of innovation in the software
                  development industry. We envision a world where our software
                  solutions are not just tools for efficiency but catalysts for
                  transformation, driving businesses towards unprecedented
                  levels of growth, productivity, and competitiveness.
                </p>
              </div>
            </div>
          </Col>

          <Col md="6">
            <div style={Style.imageBlurWrapper}>
              <div style={Style.blurEffect}></div>
              <img
                src={backgroundImage}
                alt="Employee Management System"
                style={Style.imageStyle}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Homepage;
