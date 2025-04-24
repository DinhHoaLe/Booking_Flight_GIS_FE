import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Dropdown, Space, Button, Avatar } from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  QuestionCircleOutlined,
  GlobalOutlined,
  DownOutlined,
  UserOutlined,
  BellOutlined,
  CreditCardOutlined,
  SettingOutlined,
  LogoutOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, logout } from "../../Redux/Slide/infoUserSlice";

function Navbar() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const [handleSearch, setHandleSearch] = useState();
  const { infor, status, error } = useSelector((state) => state.inforUser);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserInfo());
    }
  }, []);

  if (status === "loading") return <div>Loading...</div>;

  const items = [
    {
      label: "My Account",
      key: "0",
      icon: <UserOutlined />,
      onClick: () => navigate("/account"),
      children: null,
    },
    {
      label: "My Payment",
      key: "1",
      icon: <CreditCardOutlined />,
      onClick: () => navigate("/account/payment"),
      children: null,
    },
    {
      label: "My Setting",
      key: "2",
      icon: <SettingOutlined />,
      onClick: () => navigate("/account/setting"),
      children: null,
    },
    {
      label: "My Support",
      key: "3",
      icon: <QuestionCircleOutlined />,
      onClick: () => navigate("/account/support"),
      children: null,
    },
    {
      type: "divider",
    },
    {
      label: "Log Out",
      key: "4",
      icon: <LogoutOutlined />,
      onClick: () => dispatch(logout()) && navigate("/login"),
      danger: true,
      children: null,
    },
  ];

  return (
    <div className="max-w-[1224px] w-full flex flex-col mt-3 justify-between items-center">
      <nav className="flex w-full justify-between">
        <img
          style={{ cursor: "pointer" }}
          src="/log.png"
          onClick={() => {
            navigate("/");
          }}
        />

        <div className="flex items-center">
          <Input
            placeholder="Find something..."
            allowClear
            onChange={(e) => setHandleSearch(e.target.value)}
            style={{ width: 500, height: 40, marginRight: 20 }}
            suffix={
              <SearchOutlined style={{ color: "#07689F", cursor: "pointer" }} />
            }
          />
        </div>

        <div className="flex justify-around gap-5 mr-5">
          <ContactsOutlined
            style={{
              fontSize: "24px",
              color: "#07689F",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            className="hover:text-[#05486C]"
            onClick={() => navigate("/booking-search")}
          />

          <GlobalOutlined
            style={{
              fontSize: "24px",
              color: "#07689F",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            className="hover:text-[#05486C]"
          />

          <QuestionCircleOutlined
            style={{
              fontSize: "24px",
              color: "#07689F",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            className="hover:text-[#05486C]"
            onClick={() => navigate("/customers-service-page")}
          />

          <HeartOutlined
            style={{
              fontSize: "24px",
              color: "#07689F",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            className="hover:text-[#05486C]"
            onClick={() => navigate("/favorite-page")}
          />
        </div>

        {!infor ? (
          <div className="flex flex-row gap-3 items-center">
            <Button className="ath-button" onClick={() => navigate("/login")}>
              SIGN IN
            </Button>
            <Button className="ath-button" onClick={() => navigate("/signup")}>
              SIGN UP
            </Button>
          </div>
        ) : (
          <div className="flex flex-row gap-3 items-center">
            <Avatar
              src={infor?.avatar}
              style={{ height: "55px", width: "55px" }}
            />
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a
                onClick={(e) => e.preventDefault()}
                style={{ cursor: "pointer" }}
              >
                <Space>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#05486C",
                      fontSize: "15px",
                    }}
                  >
                    {infor?.firstName} {infor?.lastName}
                  </div>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <BellOutlined
              style={{
                fontSize: "24px",
                color: "#07689F",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              className="hover:text-[#05486C]"
              onClick={() => navigate("/favorite-page")}
            />
          </div>
        )}
      </nav>

      <div className="flex justify-center mb-5 mt-2 product-tags">
        <div
          onClick={() => navigate("/deals-page")}
          className={`middle ${
            pathname === "/deals-page" ? "active" : ""
          }  cursor-pointer`}
        >
          <a>Deals</a>
        </div>
        <div
          onClick={() => navigate("/")}
          className={`middle ${
            pathname === "/" || pathname === "/" ? "active" : ""
          }  cursor-pointer`}
        >
          <a>Flight</a>
        </div>
        {/* <div
          onClick={() => navigate("/flight-home-page")}
          className={`middle ${
            pathname === "/flight-home-page" ? "active" : ""
          }  cursor-pointer`}
        >
          <a>Flight</a>
        </div> */}
        <div
          className={`middle ${
            pathname === "/car" ? "active" : ""
          }  cursor-pointer`}
          onClick={() => navigate("/about-us-page")}
        >
          <a>About Us</a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
