import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { useState } from "react";

const Leave = () => {
  const [leaveBalances, setLeaveBalances] = useState({
    casual: 7,
    annual: 14,
    sick: 14,
  });

  return (
    <Row>
      <Col>
        <Card
          className="border border-warning rounded"
          style={{ background: "#0D0D0D", color: "white" }}
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Casual Leave</div>
            <p className="text-gray-700 text-base">
              You have 7 casual leave(s) remaining.
            </p>
          </div>
        </Card>
      </Col>

      <Col>
        <Card
          className="border border-warning rounded"
          style={{ background: "#0D0D0D", color: "white" }}
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Annual Leave</div>
            <p className="text-gray-700 text-base">
              You have 14 annual leave(s) remaining.
            </p>
          </div>
        </Card>
      </Col>

      <Col>
        <Card
          className="border border-warning rounded"
          style={{ background: "#0D0D0D", color: "white" }}
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Sick Leave</div>
            <p className="text-gray-700 text-base">
              You have 14 sick leave(s) remaining.
            </p>
          </div>
        </Card>
      </Col>

      <Link to="/apply">
        <button className="btn btn-primary mt-4">Apply Leave</button>
      </Link>
    </Row>
  );
};

export default Leave;
