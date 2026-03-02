import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    let navigate = useNavigate();

    const onFinish = async (values) => {
        console.log(">>check values", values);
        const res = await registerUserAPI(values.fullName, values.email, values.password, values.phone);
        if (res.data) {
            notification.success({
                message: "Register success",
                description: "Đăng ký người dùng thành công"
            })
            navigate("/login")
        } else {
            notification.error({
                message: "Error register user",
                description: JSON.stringify(res.message)
            })
        }
    }
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ margin: "10px" }}
        // onFinishFailed={onFinishFailed}


        >

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your Full Name!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>


            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{
                            // required: true,
                            pattern: new RegExp(/\d+/g),
                            message: "Wrong format!"

                        }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>


            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <div>
                        <Button onClick={() => form.submit()} type="primary">Register</Button>
                    </div>
                </Col>
            </Row>
            <div style={{ display: "flex", justifyContent: "center", gap: "3px", marginTop: "50px" }}>
                <div>Bạn đã có tài khoản <Link to={"/login"}>Đăng nhập tại đây</Link></div>
            </div>
        </Form >

    )
}

export default RegisterPage;