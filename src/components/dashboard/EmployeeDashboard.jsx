import React, { useState, useRef, useEffect } from "react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeDashboard = () => {
  const { TextArea } = Input;
  const navigate = useNavigate();

  const [time, setTime] = useState(
    Number(localStorage.getItem("working_hours"))
  );
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [description, setDescription] = useState("");
  const [today, setToday] = useState(new Date().toLocaleDateString());
  const timerRef = useRef(null);
  const [accessToken, setAccessToken] = useState(null);

  const startTimer = () => {
    setIsRunning(true);
    setStartTime(new Date().toLocaleTimeString());
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setStopTime(new Date().toLocaleTimeString());
    localStorage.setItem("working_hours", time);
  };

  const formatTime = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const calculateDuration = () => {
    if (startTime && stopTime) {
      const durationInSeconds = Math.floor((stopTime - startTime) / 1000);
      return durationInSeconds;
    }
    return 0;
  };

  const handleSubmit = async () => {
    setTime(0);
    localStorage.setItem("working_hours", 0);
    setDescription("");

    console.log("start time : ", startTime);
    console.log("stop time : ", stopTime);
    console.log("today : ", today);
    console.log("description : ", description);

    if (accessToken) {
      try {
        let data = JSON.stringify({
          inTime: startTime,
          outTime: stopTime,
          date: today,
          task: "auth module",
          description: description,
        });

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_API_BASE_URL}/attendance`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          data: data,
        };

        const response = await axios.request(config);
        console.log("fetchTodayEmployees : ", response.data);
      } catch (error) {
        console.log(error);
      }
    }

    navigate("/attendance");
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  return (
    <div>
      <div className="ml-3">
        <div className="fs-3">Working Hours</div>
        <div className="fs-4">{formatTime(time)}</div>
        {!isRunning ? (
          <button
            type="button"
            className={`btn btn-${isRunning ? "dark" : "primary"}`}
            onClick={startTimer}
          >
            Start
          </button>
        ) : (
          <button
            type="button"
            className={`btn btn-${isRunning ? "primary" : "dark"}`}
            onClick={stopTimer}
          >
            Stop
          </button>
        )}
      </div>

      <div className="mt-5">
        <span className="fs-4 ml-3">Description</span>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </div>
      <div style={{ display: "flex", marginTop: "40px", gap: "10px" }}>
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button type="button" className="btn btn-primary ml-4">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
