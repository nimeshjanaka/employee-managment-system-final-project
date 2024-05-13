// DashboardContainer.jsx
import React, { useState } from 'react';
import EmployeeDashboard from './EmployeeDashboard';
import Attendence from './Attendence';

const DashboardContainer = () => {
  const [records, setRecords] = useState([]);

  const addRecord = (record) => {
    setRecords([...records, record]);
  };

  return (
    <div>
      <EmployeeDashboard addRecord={addRecord} />
      <Attendence records={records} />
    </div>
  );
};

export default DashboardContainer;
