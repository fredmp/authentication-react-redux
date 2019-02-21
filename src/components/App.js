import 'antd/dist/antd.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './Header';
import Signup from './SignUp';

const { Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout className="layout">
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280, height: '100%' }}>
            <Switch>
              <Route exact path="/" component={() => <div>Home</div>} />
              <Route path="/signin" component={() => <div>Sign In</div>} />
              <Route path="/signup" component={() => <Signup />} />
              <Route path="/profile" component={() => <div>Profile</div>} />
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