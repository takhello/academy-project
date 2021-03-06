import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;


const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}



class LoginForm extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.props.loginRequest(values)
            .then((data) => {
              if (data.success === 'ok') {
                this.props.setUser(data.token);
                this.props.redirect(true);
              } else {
                message.error(`${data.message}`, 2.5);
              }
            })
        }
    })

  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Form className="admin-login-form"onSubmit={this.handleSubmit}>
          <h3 className="admin-login-title">登录</h3>
          <FormItem
            {...formItemLayout}
            label="用户名"
          >
            {
              getFieldDecorator('username', {
                rules: [{required: true, message: '用户名不能为空'}, {pattern: /^[a-zA-Z0-9_]{6,12}$/, message: '用户名只能由6-12位的字母、数字、_组成'}]
              })(
                <Input placeholder="请输入用户名" />
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
          >
            {
              getFieldDecorator('password', {
                rules: [{required: true, message: '密码不能为空'}, { pattern: /^[a-zA-Z-0-9]{6,18}$/, message: '密码只能包含字母、数字，且为6-18位'}]
              })(
                <Input placeholder="请输入密码" />
              )
            }
          </FormItem>
          <FormItem
            wrapperCol={{
              xs: {span: 12, offset: 0},
              sm: {span: 12, offset: 6}
            }}
          >
            <Button type="primary" htmlType="submit" >提交</Button>
            <Link to="/admin/signup" style={{float:'right'}}>注册</Link>
          </FormItem>
        </Form>
    );
  }
}

export default Form.create()(LoginForm);
