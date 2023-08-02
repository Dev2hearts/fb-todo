import { useState } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
// import { useLogin } from "../hooks/useFirebase";
import { useNavigate } from "react-router-dom";
import { asyncLoginFetch } from "../reducers/actions";
import { useDispatch } from "react-redux";

const Login = () => {
    // const { login } = useLogin();

    // dispatch 를 통해서 액션을 만들거나/담거나,
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = values => {
        // login(values.email, values.password);
        dispatch(asyncLoginFetch({email: values.email, password:values.password}));
    };
    const onFinishFailed = errorInfo => {
        // console.log("Failed:", errorInfo);
        // const arr = errorInfo.errorFields;
        // arr.forEach(item => {
        //     console.log(item.errors)
        // });
    };
    // AntD Modal 기능
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    return (
        <div className="p-6 m-auto mt-5 shadow rounded-md bg-white">
            <h2>Login</h2>
            {/* AntD Modal */}
            <Modal
                title="Login Error"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>{modalMessage}</p>
            </Modal>
            {/* AntD Form*/}
            <Form
                name="basic"
                labelCol={{
                    span: 3,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                }}
                initialValues={{
                    remember: false,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: "email",
                            required: true,
                            message: "Please input your Email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                            // validator: async (_, password) => {
                            //     if (!password || password.length < 6) {
                            //       return Promise.reject(new Error('At least 6 passengers'));
                            //     }
                            //   },
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            backgroundColor: "#1677ff",
                            marginRight: "8px",
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        htmlType="button"
                        onClick={() => navigate("/signup")}
                    >
                        SignUp
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Login;
