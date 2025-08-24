import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Layout,
  Row,
  Col,
  Typography,
} from "antd";
import { useNavigate } from "react-router";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgLogIn from "./img/login.jpg";
import imgLogo from "./img/Logo.png";
import imgEN from "./img/EN.png";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
// import FacebookLogin from "react-facebook-login";
import ChatBox from "../ChatPage/ChatBox";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const req1 = await fetch(`${import.meta.env.VITE_URL_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const res1 = await req1.json();
      if (req1.status === 400) {
        if (res1.emailVerified === false) {
          toast.warn(res1.message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => navigate("/verify-email"),
          });
        } else {
          toast.warn(res1.message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else if (req1.status === 200) {
        localStorage.setItem("accessToken", res1.accessToken);
        localStorage.setItem("refreshToken", res1.refreshToken);
        toast.success(res1.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            navigate("/account");
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error internal", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const loginByGG = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  const loginByFB = () => {
    FB.login(
      function (response) {
        if (response.authResponse) {
          FB.api("/me", { fields: "name,email,picture" }, function (userInfo) {
            console.log("Facebook User Info:", userInfo);
          });
        } else {
          toast.warn("Facebook Login Cancelled", { position: "top-center" });
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img
          src={imgLogo}
          alt=""
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center gap-3">
          <img
            src={imgEN}
            alt="language"
            style={{ marginRight: "10px", cursor: "pointer" }}
          />
          <Button
            type="text"
            icon={<QuestionCircleOutlined style={{ fontSize: "24px" }} />}
            style={{
              height: "24px",
              width: "24px",
              padding: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>
      </Header>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          width: "100%",
        }}
      >
        <Row
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: "10px",
            // overflow: "hidden",
            maxWidth: "750px",
            width: "100%",
            maxHeight: "600px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Col
            xs={24}
            md={12}
            style={{ padding: "0" }}
            className="w-full h-full object-cover hidden md:block"
          >
            <img
              src={imgLogIn}
              alt="Login"
              className="w-full h-full object-cover hidden md:block"
            />
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              maxHeight: "600px",
            }}
          >
            <div className="w-full">
              <Title level={2} style={{ fontWeight: "bold" }}>
                Login
              </Title>
              <Text>Login to access your Easyset24 account</Text>
              <Form
                name="login"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ marginTop: "20px" }}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="Easyset24@gmail.com" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="********" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <div className="flex justify-between items-center">
                    <Checkbox className="font-medium">Remember Me</Checkbox>
                    <a
                      className="text-[#07689f] font-bold"
                      onClick={() => navigate("/forgot-passowrd")}
                    >
                      Forgot Password?
                    </a>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="bg-[#07689f]"
                  >
                    LOG IN
                  </Button>
                </Form.Item>

                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    fontWeight: "600",
                  }}
                >
                  Or
                </div>
                <Row gutter={10} className="flex justify-center cursor-pointer">
                  <Col>
                    <img src="/login/facebook.png" onClick={loginByFB} />
                  </Col>
                  <Col>
                    <img src="/login/apple.png" />
                  </Col>
                  <Col>
                    <img
                      src="/login/google.png"
                      className="cursor-pointer"
                      onClick={() => loginByGG()}
                    />
                  </Col>
                </Row>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Text>
                    Don’t have an account yet?{" "}
                    <Text
                      className="text-[#07689f] cursor-pointer font-bold hover:text-blue-400"
                      onClick={() => navigate("/signup")}
                    >
                      Signup
                    </Text>
                  </Text>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
      <ChatBox />
      <ToastContainer />
    </Layout>
  );
};

export default LoginPage;
