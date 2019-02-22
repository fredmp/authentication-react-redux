import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const { Header } = Layout;

// eslint-disable-next-line react/prop-types
const AppHeader = ({ isSignedIn }) => {
  const displayWhenSignedIn = isSignedIn ? {} : { display: 'none' };
  const displayWhenNotSignedIn = isSignedIn ? { display: 'none' } : {};
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
        <Menu.Item key="2" style={displayWhenNotSignedIn}>
          <Link to="/signin">Sign In</Link>
        </Menu.Item>
        <Menu.Item key="3" style={displayWhenNotSignedIn}>
          <Link to="/signup">Sign Up</Link>
        </Menu.Item>
        <Menu.Item key="4" style={displayWhenSignedIn}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default connect(state => ({ isSignedIn: state.auth.isSignedIn }))(AppHeader);
