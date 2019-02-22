/* eslint-disable react/prop-types */
import 'antd/dist/antd.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './Header';
import SignIn from './SignIn';
import Signup from './SignUp';
import Profile from './Profile';
import Notification from './Notification';

const { Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout className="layout">
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280, height: '100%' }}>
            <Notification general />
            <Switch>
              <Route exact path="/" component={() => <div>Home</div>} />
              <Route path="/signin" component={() => <SignIn />} />
              <Route path="/signup" component={() => <Signup />} />
              <Route path="/profile" component={() => <Profile />} />
            </Switch>
          </div>
        </Content>
        <Footer
          style={{ textAlign: 'center', position: 'fixed', bottom: 0, zIndex: 1, width: '100%' }}
        >
          Footer ©2019 Created by Frederico
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
