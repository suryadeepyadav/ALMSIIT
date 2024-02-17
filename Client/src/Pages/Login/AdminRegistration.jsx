import  { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { adminRegister } from "../../Redux/admin/action";
import { message, Space, Spin } from "antd";
import { Drawer } from "antd";

const AdminRegistration = () => {
  const dispatch = useDispatch();

  // Alert API
  const [messageApi, contextHolder] = message.useMessage();

  // Loading state
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(adminRegister(formData))
      .then((res) => {
        if (res.msg === "User already registered") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "User already registered",
            duration: 3,
          });
        } else if (res.msg === "Admin Registration failed") {
          setLoading(false);
          messageApi.open({
            type: "error",
            content: "Admin Registration failed",
            duration: 3,
          });
        } else {
          setLoading(false);
          setFormData({
            name: "",
            email: "",
            password: "",
          });
          messageApi.open({
            type: "success",
            content: "Admin Registered Successfully",
            duration: 3,
          });
          messageApi.open({
            type: "success",
            content: "Password sent over email.",
            duration: 3,
          });
        }
      })
      .catch((error) => {
        console.error("Registration Error:", error);
      });
  };

  return (
    <div>
      <Drawer
        title="Create a new admin account"
        width={720}
        onClose={() => {}}
        visible={true}
      >
        <form onSubmit={handleSubmit}>
          <input
            required
            name="name"
            type="text"
            value={formData.name}
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
          <input
            required
            name="email"
            type="email"
            value={formData.email}
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
          <input
            required
            name="password"
            type="password"
            value={formData.password}
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
          <input type="submit" value="Add Admin" />
        </form>
        <Link to="/">Login Admin</Link>
      </Drawer>

      {/* Loading indicator */}
      {contextHolder}
      {loading ? (
        <Space
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.2)",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large"></Spin>
        </Space>
      ) : null}
    </div>
  );
};

export default AdminRegistration;
