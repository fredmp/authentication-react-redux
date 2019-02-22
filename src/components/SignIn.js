/* eslint-disable react/prop-types */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { signin, notify } from '../actions';
import Notification from './Notification';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};

const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <Form.Item
      {...formItemLayout}
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest}>
        {children}
      </Component>
    </Form.Item>
  );
};

const InputField = makeField(Input);

class SignIn extends React.Component {
  onSubmit = formValues => {
    const { history, reset, signin: signinAction, notify: notifyAction } = this.props;
    signinAction(formValues, () => {
      reset();
      notifyAction({
        description: 'Signed in successfully',
        title: 'Sign in',
        type: 'success',
        general: true,
      });
      history.push('/profile');
    });
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <Notification />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          component={InputField}
          placeholder="Email"
          hasFeedback
        />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="none"
          component={InputField}
          placeholder="Password"
          hasFeedback
        />
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={pristine || submitting}
            style={{ marginRight: '10px' }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const validate = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = 'Required';
  if (!password) errors.password = 'Required';
  return errors;
};

export default compose(
  withRouter,
  connect(
    null,
    { signin, notify },
  ),
  reduxForm({
    form: 'signin',
    validate,
  }),
)(SignIn);
