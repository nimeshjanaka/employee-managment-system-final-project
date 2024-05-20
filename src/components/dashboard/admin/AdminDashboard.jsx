import React, { useState, useEffect } from "react";
import { Card, DatePicker, Input } from "antd";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import axios from "axios";
import moment from "moment";

const AdminDashboard = () => {
  const [filters, setFilters] = useState({ date: null, empNo: "" });
  const [todayEmployees, setTodayEmployees] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  useEffect(() => {
    const fetchTodayEmployees = async () => {
      const today = new Date().toISOString().slice(0, 10);
      console.log("Today's date: ", today);

      let data = JSON.stringify({
        inTime: "00:00:00",
        outTime: "11:59:59",
        date: today,
        task: "auth module",
        description: "jwt based authentication",
      });

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_BASE_URL}/attendance?page=1&limit=10`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      try {
        const response = await axios.request(config);
        console.log("fetchTodayEmployees : ", response.data.payload.items);
        setTodayEmployees(response.data.payload.items);
      } catch (error) {
        console.log(error);
      }

      // const data = [
      //   {
      //     empNo: 1,
      //     name: "John Doe",
      //     date: today,
      //     workingHours: "9 hours",
      //     description: "Full stack development tasks",
      //   },
      //   {
      //     empNo: 2,
      //     name: "Jane Smith",
      //     date: today,
      //     workingHours: "8 hours",
      //     description: "Frontend debugging",
      //   },
      //   {
      //     empNo: 3,
      //     name: "John Doe",
      //     date: today,
      //     workingHours: "9 hours",
      //     description: "Full stack development tasks",
      //   },
      //   {
      //     empNo: 4,
      //     name: "Jane Smith",
      //     date: today,
      //     workingHours: "8 hours",
      //     description: "Frontend debugging",
      //   },
      //   {
      //     empNo: 5,
      //     name: "John Doe",
      //     date: today,
      //     workingHours: "9 hours",
      //     description: "Full stack development tasks",
      //   },
      //   {
      //     empNo: 6,
      //     name: "Jane Smith",
      //     date: today,
      //     workingHours: "8 hours",
      //     description: "Frontend debugging",
      //   },
      //   {
      //     empNo: 7,
      //     name: "John Doe",
      //     date: today,
      //     workingHours: "9 hours",
      //     description: "Full stack development tasks",
      //   },
      //   {
      //     empNo: 8,
      //     name: "Jane Smith",
      //     date: today,
      //     workingHours: "8 hours",
      //     description: "Frontend debugging",
      //   },
      //   // Repeated data omitted for brevity
      // ];
      //setTodayEmployees(data);
    };

    if (accessToken) fetchTodayEmployees();
  }, [accessToken]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  const handleDateChange = (date, dateString) => {
    setFilters((prevFilters) => ({ ...prevFilters, date: dateString }));
  };

  const handleEmpNoChange = (e) => {
    setFilters((prevFilters) => ({ ...prevFilters, empNo: e.target.value }));
  };

  const filteredEmployees = todayEmployees.filter((employee) => {
    let matchesDate = true;
    let matchesEmpNo = true;

    if (filters.date) {
      matchesDate = employee.date === filters.date;
    }

    if (filters.empNo) {
      matchesEmpNo = employee.empNo.toString() === filters.empNo;
    }

    return matchesDate && matchesEmpNo;
  });

  const styles = {
    fullPage: {
      width: "100%",
      height: "auto",
      minHeight: "100vh",
      padding: "20px",
      color: "white",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
    },
    cardStyle: {
      width: "100%",
      background: "#0D0D0D",
      color: "white",
    },
    tableLayout: {
      width: "100%",
      tableLayout: "fixed",
    },
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

  return (
    <div style={{ background: "#0D0D0D", color: "white" }}>
      <div
        style={{
          gap: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to="/addemployee">
          <button
            type="button"
            className="btn btn-primary btn-lg outline-dark mt-4 mb-4"
          >
            Add new Employee
          </button>
        </Link>
        <Link to="/leavedetails">
          <button
            type="button"
            className="btn btn-primary btn-lg outline-dark mt-4 mb-4 ml-4"
          >
            Leave Details
          </button>
        </Link>
      </div>

      <div style={{ marginBottom: 20 }}>
        {" "}
        <DatePicker onChange={handleDateChange} />
        <Input
          placeholder="Employee No"
          value={filters.empNo}
          onChange={handleEmpNoChange}
          style={{ width: 200, marginLeft: 20 }}
        />
      </div>
      <Row>
        <Col>
          <Card
            className="border border-warning rounded"
            style={{ background: "#0D0D0D", color: "white" }}
          >
            <div className="px-6 py-4">
              <div className="fs-3">Total Employee</div>
              <p className="text-gray-700 text-base">15 Employee</p>
            </div>
          </Card>
        </Col>

        <Col>
          <Card
            className="border border-warning rounded"
            style={{ background: "#0D0D0D", color: "white" }}
          >
            <div className="px-6 py-4">
              <div className="fs-3">Permanent Employee</div>
              <p className="text-gray-700 text-base">10 Employees</p>
            </div>
          </Card>
        </Col>

        <Col>
          <Card
            className="border border-warning rounded"
            style={{ background: "#0D0D0D", color: "white" }}
          >
            <div className="px-6 py-4">
              <div className="fs-3">Intern Employee</div>
              <p className="text-gray-700 text-base">5 Employee</p>
            </div>
          </Card>
        </Col>
      </Row>
      <Card
        title={
          <span style={{ color: "white" }}>Today's Working Employees</span>
        }
        bordered={false}
        style={styles.cardStyle}
      >
        <table className="w-full" style={styles.tableLayout}>
          <thead>
            <tr>
              <th>Emp No</th>
              <th>Name</th>
              <th>Date</th>
              <th>Working Hours</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.id}</td>
                <td>
                  {employee.user.firstName + " " + employee.user.lastName}
                </td>
                <td>{employee.date}</td>
                <td>{calculateDuration(employee.inTime, employee.outTime)}</td>
                <td>{employee.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AdminDashboard;
