import React, { useEffect, useState } from "react";
import { Form, Input, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from './../components/Layout/Spinner';
import { Option } from "antd/es/mentions";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //form submit
  const submitHandler = async (values) => {
    try {
      // console.log(values);
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registration Successful!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Invalid username or Password");
    }
  };

  //prevent for login user
  useEffect(() => {
    if(localStorage.getItem('user')) {
      navigate("/")
    }
  }, [navigate])

  return (
    <>
      <div className="register-page">
      {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <Form.Item label="User Role" name="role" initialValue="pi">
            <Select>
              <Option value="pi">Project PI</Option>
              <Option value="cwdb">CWDB Personnel</Option>
            </Select>
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login">Already registered? Click here</Link>
            <button className="btn btn-primary">Register</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
