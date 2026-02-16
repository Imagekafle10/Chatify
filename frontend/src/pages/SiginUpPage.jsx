import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


import { Form, Input, Button, Typography, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { SignupUser } from "../api/auth.api";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";



const { Title, Text } = Typography;


function SignUpPage() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isSigningUp } = useSelector((state) => state.auth);

  // ✅ submit handler
  const handleSubmit = async (values) => {
    try {
      const res = await dispatch(SignupUser(values)).unwrap();
       form.resetFields(); // ✅ clears form
      
    } catch (err) {
     console.log("Signup failed. Try again!");
     
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="relative w-full max-w-6xl">
        <BorderAnimatedContainer>
          <div className="flex flex-col md:flex-row w-full">

            {/* ================= LEFT SIDE FORM ================= */}
            <div className="md:w-1/2 p-10 flex items-center justify-center border-r border-slate-600/30">
              <div className="w-full max-w-md">

                {/* Heading */}
                <div className="text-center mb-8">
                  <MessageOutlined style={{ color: 'white' }} className="text-4xl text-white mb-4" />
                  <Title level={3} style={{ color: "#e2e8f0", marginBottom: 0 }}>
                    Create Account
                  </Title>
                  <Text style={{ color: 'white' }}>
                    Sign up for a new account
                  </Text>
                </div>

                {/* ================= ANT DESIGN FORM ================= */}
                <Form
                form={form} 
                  layout="vertical"
                  onFinish={handleSubmit}
                  requiredMark={false}
                >
                  {/* FULL NAME */}
                  <Form.Item
                    name="fullName"
                    label={<span className="text-slate-300">Full Name</span>}
                    rules={[
                      { required: true, message: "Please enter your name" },
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={<UserOutlined />}
                      placeholder="John Doe"
                    />
                  </Form.Item>

                  {/* EMAIL */}
                  <Form.Item
                    name="email"
                    label={<span className="text-slate-300">Email</span>}
                    rules={[
                      { required: true, message: "Email is required" },
                      { type: "email", message: "Enter valid email" },
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={<MailOutlined />}
                      placeholder="johndoe@gmail.com"
                    />
                  </Form.Item>

                  {/* PASSWORD */}
                  <Form.Item
                    name="password"
                    label={<span className="text-slate-300">Password</span>}
                    rules={[
                      { required: true, message: "Password is required" },
                      { min: 6, message: "Minimum 6 characters" },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      prefix={<LockOutlined />}
                      placeholder="Enter password"
                    />
                  </Form.Item>

                  {/* SUBMIT BUTTON */}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isSigningUp}
                      size="large"
                      className="w-full"
                    >
                      Create Account
                    </Button>
                  </Form.Item>
                </Form>

                {/* LOGIN LINK */}
                <div className="text-center mt-4">
                  <Link
                    to="/login"
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* ================= RIGHT SIDE IMAGE ================= */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div className="text-center">
                <img
                  src="/signup.png"
                  alt="signup"
                  className="w-full max-w-md object-contain"
                />

                <h3 className="text-xl text-cyan-400 mt-6">
                  Start Your Journey Today
                </h3>

                <div className="flex justify-center gap-4 mt-4">
                  <span className="px-3 py-1 rounded-full bg-slate-700 text-sm text-white">
                    Free
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-700 text-sm text-white">
                    Easy Setup
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-700 text-sm text-white">
                    Private
                  </span>
                </div>
              </div>
            </div>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;
