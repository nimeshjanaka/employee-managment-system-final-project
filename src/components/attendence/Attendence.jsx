import React from "react";
import { Card, DatePicker } from "antd";
import moment from "moment";
import { useState } from "react";

const Attendence = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);

  const records = [
    {
      date: "2024-04-08",
      startTime: "09:00",
      stopTime: "17:00",
      duration: "8 hours",
      description: "Full workday",
    },
    {
      date: "2024-04-09",
      startTime: "09:30",
      stopTime: "17:30",
      duration: "8 hours",
      description: "Worked on project X",
    },
    {
      date: "2024-04-10",
      startTime: "10:00",
      stopTime: "16:00",
      duration: "6 hours",
      description: "medical appointment",
    },
    {
      date: "2024-04-08",
      startTime: "09:00",
      stopTime: "17:00",
      duration: "8 hours",
      description: "Full workday",
    },
    {
      date: "2024-04-09",
      startTime: "09:30",
      stopTime: "17:30",
      duration: "8 hours",
      description: "Worked on project X",
    },
    {
      date: "2024-04-10",
      startTime: "10:00",
      stopTime: "16:00",
      duration: "6 hours",
      description: "medical appointment",
    },
    {
      date: "2024-04-09",
      startTime: "09:30",
      stopTime: "17:30",
      duration: "8 hours",
      description: "Worked on project X",
    },
    {
      date: "2024-04-10",
      startTime: "10:00",
      stopTime: "16:00",
      duration: "6 hours",
      description: "medical appointment",
    },
    {
      date: "2024-04-08",
      startTime: "09:00",
      stopTime: "17:00",
      duration: "8 hours",
      description: "Full workday",
    },
    {
      date: "2024-04-09",
      startTime: "09:30",
      stopTime: "17:30",
      duration: "8 hours",
      description: "Worked on project X",
    },
    {
      date: "2024-04-10",
      startTime: "10:00",
      stopTime: "16:00",
      duration: "6 hours",
      description: "medical appointment",
    },
    {
      date: "2024-04-08",
      startTime: "09:00",
      stopTime: "17:00",
      duration: "8 hours",
      description: "Full workday",
    },
    {
      date: "2024-04-09",
      startTime: "09:30",
      stopTime: "17:30",
      duration: "8 hours",
      description: "Worked on project X",
    },
    {
      date: "2024-04-10",
      startTime: "10:00",
      stopTime: "16:00",
      duration: "6 hours",
      description: "medical appointment",
    },
  ];

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
                <td>{record.startTime}</td>
                <td>{record.stopTime}</td>
                <td>{record.duration}</td>
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
