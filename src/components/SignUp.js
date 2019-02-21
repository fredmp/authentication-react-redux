/* eslint-disable react/prop-types */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Input, Button } from 'antd';

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

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const InputField = makeField(Input);

class SignUp extends React.Component {
  componentDidMount() {}

  onSubmit = formValues => {
    const { reset } = this.props;
    console.log(formValues);
    reset();
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
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
        <Field
          label="Confirm Password"
          name="confirmation"
          type="password"
          autoComplete="none"
          component={InputField}
          placeholder="Confirm Password"
          hasFeedback
        />

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={pristine || submitting}
            style={{ marginRight: '10px' }}
          >
            Register
          </Button>
          <Button disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const validate = ({ email, password, confirmation }) => {
  const errors = {};
  if (!email) errors.email = 'Required';
  if (!password) errors.password = 'Required';
  if (!confirmation) errors.confirmation = 'Required';
  if (confirmation && password && password !== confirmation) {
    errors.confirmation = 'Password and confirmation must be the same';
  }
  if (email && !emailRegex.test(String(email).toLowerCase())) {
    errors.email = 'Invalid email';
  }
  return errors;
};

export default reduxForm({
  form: 'signup',
  validate,
})(SignUp);
