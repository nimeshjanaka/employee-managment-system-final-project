import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import Pages from "./Pages";
import Profile from "./components/profile/Profile";
import backgroundImage from "./assets/bg-image.png";

const { Header, Content, Sider } = Layout;

const MainLayoutEmployee = ({ children }) => {
  const [collapsed] = useState(false);

  const [currentDateTime, setCurrentDateTime] = useState(
    moment().format("MMMM Do YYYY, h:mm:ss a")
  ); // Initialize current date and time
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(moment().format("MMMM Do YYYY, h:mm:ss a")); // Update current date and time every second
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // useEffect(() => {
  //   switch (selectedMenuItem) {
  //     case "1":
  //       navigate("/dashboard");
  //       break;
  //     case "2":
  //       navigate("/attendance");
  //       break;
  //     case "3":
  //       navigate("/leave");
  //       break;
  //     case "4":
  //       navigate("/about");
  //       break;
  //     default:
  //       navigate("/");
  //   }
  // }, [navigate, selectedMenuItem]);

  const onClick = (e) => {
    navigate(e.key);
  };

  const shouldHideHeaderAndSider =
    location.pathname === "/" ||
    location.pathname === "/admin-login" ||
    location.pathname === "/employee-login";

  return (
    <Layout>
      {!shouldHideHeaderAndSider && (
        <Header
          style={{
            background: "#cbd5e1",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Profile />
            <span style={{ marginLeft: "-80px" }}></span>
          </div>
          <div>{currentDateTime}</div>{" "}
          {/* Display formatted current date and time */}
        </Header>
      )}
      <Layout>
        {!shouldHideHeaderAndSider && (
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["/dashboard"]}
              onClick={onClick}
              selectedKeys={location.pathname}
              items={[
                {
                  key: "/dashboard",
                  label: "Dashboard",
                },
                {
                  key: "/attendance",
                  label: "Attendance",
                },
                {
                  key: "/leave",
                  label: "Leave",
                },
                {
                  key: "/about",
                  label: "About",
                },
              ]}
            />
          </Sider>
        )}
        <Layout>
          <Content
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              background: "0D0D0D",
              color: "white",
              padding: 24,
              margin: 0,
              minHeight: "100vh",
              borderRadius: "15px",
              border: "2px solid #ea580c",
            }}
          >
            <Pages />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayoutEmployee;
