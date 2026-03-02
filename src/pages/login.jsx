import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, notification, Row } from "antd"
import { useForm } from "antd/es/form/Form"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUserAPI } from "../services/api.service";
import { useState } from "react";

const LoginPage = () => {
    const [form] = useForm();
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        const res = await loginUserAPI(values.email, values.password);
        if (res.data) {
            notification.success({
                message: "Register success",
                description: "Đăng nhập thành công"
            })
            navigate("/")
        } else {
            notification.error({
                message: "Error login user",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false)
    }

    return (
        <Row justify={"center"} style={{ margin: "50px 20px" }}>
            <Col xs={24} md={12} lg={8}>
                <fieldset style={{ border: "1px solid #ccc", padding: "20px 20px 10px" }}>
                    <legend>Đăng nhập</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        style={{ margin: "10px" }}
                    // onFinishFailed={onFinishFailed}
                    >


                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'E-mail không dúng định dạng!',
                                },
                                {
                                    required: true,
                                    message: 'Hãy nhập E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
                        >
                            <Input.Password />
                        </Form.Item>


                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button loading={loading} onClick={() => form.submit()} type="primary">Register</Button>
                            <Link to={"/"}>Go to homepage <ArrowRightOutlined /></Link>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", gap: "3px", marginTop: "50px" }}>
                            <div>Bạn chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link></div>
                        </div>
                    </Form >
                </fieldset>
            </Col>
        </Row>
    )
}

export default LoginPage