import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../api/auth.api";
import { useEffect } from "react";
import { Path } from "../utils/path";

function LoginPage() {
  const {  isLoggedIn } = useSelector((state) => state.auth);
const dispatch = useDispatch();
 const navigate = useNavigate();

useEffect(() => {
  if (isLoggedIn) {{
    navigate(Path.Chatpage);
  }
}}, [isLoggedIn, navigate]);

  // ✅ AntD handles values automatically
  const handleSubmit = async(values) => {
    try {
    const res = await dispatch(loginUser(values)).unwrap();

    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* LEFT SIDE */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* Heading */}
                <div className="text-center mb-8">
                  <MessageOutlined style={{color: "white"}} className="text-5xl mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400">Login to access your account</p>
                </div>

                {/* ✅ ANT DESIGN FORM */}
                <Form
                  layout="vertical"
                  onFinish={handleSubmit}
                  className="space-y-4"
                >
                  {/* Email */}
                  <Form.Item
                    name="email"
                    label={<span className="text-slate-300">Email</span>}
                    rules={[
                      { required: true, message: "Please enter email" },
                      { type: "email", message: "Invalid email format" },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined style={{ color: "black" }} />}
                      placeholder="johndoe@gmail.com"
                      size="large"
                      className="!bg-white !text-black !border-slate-600"
                    />
                  </Form.Item>

                  {/* Password */}
                  <Form.Item
                    name="password"
                    label={<span className="text-slate-300">Password</span>}
                    rules={[
                      { required: true, message: "Please enter password" },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined  style={{ color: "black" }} />}
                      placeholder="Enter password"
                      size="large"
                      className="!bg-white !text-black !border-slate-600"
                    />
                  </Form.Item>

                  {/* Submit */}
                  <Form.Item>
                    <Button
                    type="primary"
                      htmlType="submit"
                      loading={isLoggedIn}
                      block
                      size="large"
                  
                    >
                      Sign In
                    </Button>
                  </Form.Item>
                </Form>

                {/* Signup Link */}
                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link !text-cyan-500">
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/login.png"
                  alt="Login illustration"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;
