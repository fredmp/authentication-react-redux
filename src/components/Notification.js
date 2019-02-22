/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'antd';

const Notification = props => {
  const { notification, general = false } = props;
  if (!notification || notification.general !== general) return null;
  return (
    <Alert
      message={notification.title}
      description={notification.description}
      style={{ marginBottom: '20px' }}
      type={notification.type}
      showIcon
      closable
    />
  );
};

export default connect(state => ({ notification: state.notification }))(Notification);
