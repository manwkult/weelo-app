import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { ApplicationState } from '../../store';
import * as AuthenticationStore from '../../store/Authentication';

import {
  Card,
  Form,
  Input,
  Button
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

type AuthenticationProps =
  AuthenticationStore.AuthenticationState &
  typeof AuthenticationStore.actionCreators &
  RouteComponentProps<{}>;

class Login extends React.PureComponent<AuthenticationProps> {
  componentDidMount() {
    this.validateSession();
  }

  componentDidUpdate() {
    this.validateSession();
  }

  validateSession = () => {
    if (this.props.authenticated) {
      this.props.history.push('/');
    }
  }

  public render() {
    return (
      <React.Fragment>
        <div className="login-card">
          <Card
            title="Inicia Sesión"
            style={{ width: 400 }}
          >
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={this.props.login}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Por favor digita tu usuario!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Por favor digita tu contraseña!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Contraseña"
                />
              </Form.Item>

              <div className="message">
                <label className="alert-error">{this.props.message}</label>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Iniciar Sesión
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.authentication,
  AuthenticationStore.actionCreators
)(Login as any);