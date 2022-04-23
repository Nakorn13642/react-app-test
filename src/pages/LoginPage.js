import React from 'react';
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { login } from '../services/auth';
import { useHistory } from 'react-router';
import toast from 'react-hot-toast';

// call redux action
import { getProfileAction } from '../redux/actions/auth-action'; //ถ้ามีหลายอันก็ , ต่อจาก getProfileAction ได้เลย
import { useDispatch } from 'react-redux';

const schema = yup.object({
  email: yup.string().required("email ห้ามว่าง").email("รูปแบบ email ไม่ถูกต้อง"),
  password: yup.string().required("รหัสผ่านห้ามว่าง").min(3, "password ต้องมากกว่า 3 ตัวอักษร")
});


const LoginPage = () => {
  const { register, handleSubmit, formState:{ errors } } = useForm( { resolver: yupResolver(schema), mode: "all" });
  const history = useHistory();
  const dispatch = useDispatch();  

  const onSubmit = async (data) => {
      try {
        //   console.log(data);
        const response = await login(data.email, data.password);
        // console.log(response.data);
        localStorage.setItem("token", response.data.access_token);
        toast.success(response.data.message);
        // call actions
        dispatch(getProfileAction());
        history.replace("/");
        // history.go(0) // reload page
      } catch(error) {
        toast.error(error.response.data.message);  
      }
    };

    return (
        <>
            <Container fluid="md">
                <Row className="d-flex justify-content-center">
                    <Col className="col-md-4">
                    <h1>login page</h1>
                        <Form onSubmit={handleSubmit(onSubmit)} noValidate>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address :</Form.Label>
                                <Form.Control {...register("email")} type="email" placeholder="กรุณากรอกอีเมล" className={`form-control ${errors.email? "is-invalid" : "invalid"}` }/>
                                {
                                    errors.email && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email?.message}
                                        </Form.Control.Feedback>
                                    )
                                }
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password :</Form.Label>
                                <Form.Control {...register("password")} type="password" placeholder="กรุณากรอกรหัสผ่าน" className={`form-control ${errors.password? "is-invalid" : "invalid"}` }/>
                                {
                                    errors.password && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password?.message}
                                        </Form.Control.Feedback>
                                    )
                                }
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>

                            <Button variant="success" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}

export default LoginPage