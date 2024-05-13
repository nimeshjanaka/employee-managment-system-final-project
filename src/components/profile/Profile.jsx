import React from 'react';
import { Dropdown, message, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === 'profile') {
      // Navigate to the profile page
      navigate('/profile');
    } else if (e.key === 'logout') {
      message.info('Logout successful.');
      // Navigate to the homepage when logout is clicked
      navigate('/');
    } else {
      message.info('Click on menu item.');
      console.log('click', e);
    }
  };

  const items = [
    {
      label: 'My profile',
      key: 'profile',
      icon: <UserOutlined />,
    },
    {
      label: 'Logout',
      key: 'logout',
      icon: <UserOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div style={{ marginLeft: '88%' }}>
      <Space wrap>
        <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
          Name
        </Dropdown.Button>
      </Space>
      
    </div>
  );
};

export default Profile;