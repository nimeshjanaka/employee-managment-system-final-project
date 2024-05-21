import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import axios from "axios";

const Leavecheck = () => {
  const [leaves, setLeaves] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  //fetch data from backend

  const fetchLeaves = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_BASE_URL}/leave-request?page=1&limit=10&status=PENDING`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.request(config);
      console.log("fetchLeaves : ", response.data.payload.items);
      setLeaves(response.data.payload.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchLeaves();
    }
  }, [accessToken]);

  const handleApprove = async (leaveId, suggestedEmployeeId) => {
    console.log("leaveId", leaveId);
    console.log("suggestedEmployeeId", suggestedEmployeeId);

    let data = JSON.stringify({
      SuggestedCoworkerId: suggestedEmployeeId,
      status: "GRANTED",
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_BASE_URL}/leave-request/admin/${leaveId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log("handleApprove : ", response.data);
      // Refresh leave requests after approval
      fetchLeaves();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle rejection
  const handleReject = async (leaveId, suggestedEmployeeId) => {
    console.log("leaveId", leaveId);
    console.log("suggestedEmployeeId", suggestedEmployeeId);

    let data = JSON.stringify({
      SuggestedCoworkerId: suggestedEmployeeId,
      status: "GRANTED",
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_BASE_URL}/leave-request/admin/${leaveId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log("handleApprove : ", response.data);
      // Refresh leave requests after rejection
      fetchLeaves();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: "24px" }}>Employee Leave Request Details</h1>
      {leaves.map((leave, index) => (
        <Card key={index} style={{ marginBottom: "16px" }}>
          Employee ID: {leave.employee?.id} <br />
          Full Name:{" "}
          {leave.employee?.firstName + " " + leave.employee?.lastName} <br />
          Date: {leave.fromDate} to {leave.toDate} <br />
          Reason: {leave.reason}
          <br />
          Assign To : {leave.SuggestedCoworker.firstName}
          <div style={{ marginTop: "16px" }}>
            <Button
              type="primary"
              onClick={() =>
                handleApprove(leave.id, leave.SuggestedCoworker.id)
              }
              style={{
                marginRight: "8px",
                backgroundColor: "blue",
                borderColor: "blue",
              }}
            >
              Approve
            </Button>
            <Button
              type="primary"
              onClick={() => handleReject(leave.id, leave.SuggestedCoworker.id)}
              style={{ backgroundColor: "red", borderColor: "red" }}
            >
              Reject
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Leavecheck;
