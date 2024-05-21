import React from "react";
import { Card, DatePicker } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";

const Attendence = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [data, setData] = useState([]);

  const userEmail = localStorage.getItem("email");

  // useEffect(() => {
  //   const userEmail = localStorage.getItem("email");
  //   setUseremail(userEmail);
  //   console.log(userEmail);
  // }, []);

  useEffect(() => {
    fetchAttendanceData();
  }, [userEmail]);

  useEffect(() => {
    if (userEmail && data) {
      console.log("userEmail ", userEmail);
      console.log("data : ", data);

      const filteredArray = data?.filter(
        (item) => item.user && item.user.email === userEmail.replace(/"/g, "")
      );
      console.log("filterd array :", filteredArray);
      setRecords(filteredArray);
    }
  }, [userEmail, data]);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/attendance`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const data = response.data.payload.items;
      setData(data);

      // Log the response to inspect its structure
      //console.log("API Response: ", response.data.payload.items);

      // Check if the response data is an array
    } catch (error) {
      console.error("Error fetching attendance data: ", error);
    }
  };

  const calculateDuration = (inTime, outTime) => {
    const format = "HH:mm:ss";
    const start = moment(inTime, format);
    const end = moment(outTime, format);
    const duration = moment.duration(end.diff(start));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    const filtered = records.filter((record) => record.date === dateString);
    setFilteredRecords(filtered);
  };

  const styles = {
    fullPage: {
      width: "100%",
      height: "auto",
      minHeight: "100vh",
      padding: "20px",
      color: "#33DAFF",
      display: "flex",
      boxSizing: "border-box",
      flexDirection: "column",
      backgroundColor: "#41A0B6",
    },
    cardStyle: {
      width: "100%",
    },
    tableHead: {
      backgroundColor: "#41A0B6",
      color: "white",
    },

    tableHeader: {
      width: "20%",
      height: "10%",
      backgroundColor: "#41A0B6",
    },
    tableLayout: {
      width: "100%",
      tableLayout: "fixed",
      backgroundColor: "#41A0B6",
      color: "white",
    },
  };

  return (
    <div style={styles.fullPage}>
      <DatePicker onChange={handleDateChange} />
      <Card
        title={`Attendance for ${selectedDate || "All Dates"}`}
        style={styles.cardStyle}
      >
        <table className="w-full" style={styles.tableLayout}>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Date</th>
              <th style={{ width: "20%" }}>Start Time</th>
              <th style={{ width: "20%" }}>Stop Time</th>
              <th style={{ width: "20%" }}>Duration</th>
              <th style={{ width: "20%" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {(selectedDate ? filteredRecords : records).map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.inTime}</td>
                <td>{record.outTime}</td>
                <td>{calculateDuration(record.inTime, record.outTime)}</td>
                <td>{record.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Attendence;
