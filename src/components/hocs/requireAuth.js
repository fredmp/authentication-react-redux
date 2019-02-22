/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

export default ChildComponent => {
  class ComposedComponent extends React.Component {
    componentDidMount() {
      this.shouldRedirect();
    }

    componentDidUpdate() {
      this.shouldRedirect();
    }

    shouldRedirect() {
      const { isSignedIn, history } = this.props;
      if (!isSignedIn) {
        history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return compose(
    withRouter,
    connect(state => ({ isSignedIn: state.auth.isSignedIn })),
  )(ComposedComponent);
};
