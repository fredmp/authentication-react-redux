import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">
          <Link to="/">
            <Icon type="home" style={{ fontSize: 24, margin: 'auto' }} />
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/signin">Sign In</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/signup">Sign Up</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
