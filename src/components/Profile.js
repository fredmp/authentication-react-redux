import React from 'react';
import { connect } from 'react-redux';

import requireAuth from './hocs/requireAuth';

// eslint-disable-next-line react/prop-types
const Profile = ({ token }) => {
  return (
    <div>
      <h2>Profile</h2>
      {token && `User Token: ${token}`}
    </div>
  );
};

export default connect(state => ({ token: state.auth.token }))(requireAuth(Profile));
