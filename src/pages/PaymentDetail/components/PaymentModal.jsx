import { Input, Button, Checkbox, Select, InputNumber, Form } from "antd";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import {
  PhoneOutlined,
  CreditCardOutlined,
  LockOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import validator from "validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiPost } from "../../../API/APIService";
import { services } from "../../Services/services";
import { utils } from "../../Services/utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "1000px",
  transform: "translate(-50%, -50%)",
  // width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

 function PaymentModal({
  open,
  setOpen,
  handleClose,
  handleOpen,
  formik,
  ...props
}) {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [type, setType] = useState({});
  const [handleMethod, setHandleMethod] = useState("ZaloPay" || "VNPay");

  const { searchData } = useSelector((state) => state?.searchSlice);

  const callApi = async () => {
    try {
      const response = await apiGet(`get-flight-by-id/${params.flightId}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (searchData && data?.classFlight) {
      setType(getPrice());
    }
  });

  const getPrice = () => {
    const price = data?.classFlight?.find(
      (item) => item.type === searchData.classFlight
    );
    return price ? price : "No type";
  };

  const logoAirPlane = () => {
    if (data?.airlineName === "Bamboo Airways") {
      return BAA;
    } else if (data?.airlineName === "Vietnam Airlines") {
      return VNA;
    } else if (data?.airlineName === "Jetstar Pacific") {
      return JS;
    } else if (data?.airlineName === "VietJet") {
      return VJ;
    }
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      if (!validator.isEmail(values.email)) {
        return toast.warn("Email is not valid! Please check again!", {
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

      // const handleData = {
      //   ...values,
      //   objectType: "hotel",
      //   objectId: data?._id,
      //   totalPersons:
      //     JSON.parse(localStorage.getItem("hotelPassengers")).passengers +
      //     (Number(searchData?.children) || 0),
      //   // totalAmount: handleTotalAmount(),
      //   bookingStartDate: JSON.parse(localStorage.getItem("checkoutTime"))
      //     .checkin,
      //   bookingEndDate: JSON.parse(localStorage.getItem("checkoutTime"))
      //     .checkout,
      //   totalAmount:
      //     JSON.parse(localStorage?.getItem("currentPrice")) *
      //     JSON.parse(localStorage.getItem("hotelPassengers")).passengers *
      //     utils.convertDate(
      //       JSON.parse(localStorage.getItem("checkoutTime")).checkin,
      //       JSON.parse(localStorage.getItem("checkoutTime")).checkout
      //     ) *
      //     23000,
      // };

      const responseBooking = await apiPost("create-booking", handleData);

      if (responseBooking && values.paymentMethod === "ZaloPay") {
        const responsePayment = await apiPost(
          `create-payment-zalo/${responseBooking.data._id}`,
          { paymentMethod: values.paymentMethod }
        );
        console.log(responsePayment);
        if (responsePayment) {
          window.open(responsePayment.data.orderurl, "noopener,noreferrer");
          //   navigate("/");
        }
      } else if (responseBooking && values.paymentMethod === "VNPay") {
        console.log("VNPay");
        console.log(responseBooking.data._id);
        const responsePayment = await apiPost(
          `create-payment-vnpay/${responseBooking.data._id}`,
          { paymentMethod: values.paymentMethod }
        );

        if (responsePayment) {
          window.open(responsePayment.data, "noopener,noreferrer");
          navigate("/");
        }
      } else if (responseBooking && values.paymentMethod === "Momo") {
        console.log("Momo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePriceAdults = () => {
    const totalPriceAdults = type?.price * searchData?.passengers;
    return totalPriceAdults;
  };

  const handlePriceChildren = () => {
    const childrenCount = Number(searchData?.children) || 0;
    const totalPriceAdults = (type?.price / 2) * childrenCount;
    return totalPriceAdults;
  };

  const handleTotalAmount = () => {
    const total = handlePriceAdults() + handlePriceChildren();
    return total;
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form
            form={form}
            initialValues={{
              paymentMethod: "ZaloPay",
            }}
            layout="vertical"
            onFinish={onFinish}
            className="grid grid-cols-1 md:grid-cols-3 gap-2"
          >
            {/* First Name */}
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please enter your first name!" },
              ]}
              className="col-span-1"
            >
              <Input placeholder="First Name" className="h-10 rounded-none" />
            </Form.Item>

            {/* Last Name */}
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please enter your last name!" },
              ]}
              className="col-span-1"
            >
              <Input placeholder="Last Name" className="h-10 rounded-none" />
            </Form.Item>

            {/* Phone Number */}
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number!" },
              ]}
              className="col-span-1"
            >
              <PhoneInput
                country={"vn"}
                placeholder="phone number"
                inputStyle={{
                  height: "40px",
                  borderRadius: "0px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
                buttonStyle={{
                  borderRadius: "0px",
                }}
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your phone number!" },
              ]}
              className="col-span-2"
            >
              <Input placeholder="Last Name" className="h-10 rounded-none" />
            </Form.Item>

            {/* Payment Method */}
            <Form.Item
              name="paymentMethod"
              label="Payment Method"
              className="h-10 col-span-1"
            >
              <select
                defaultValue="ZaloPay"
                className="h-10 w-32 border-2 border-gray-200 rounded-none focus:ring-0 focus:outline-none !important"
                bordered={false}
                style={{
                  borderRadius: "0px",
                  height: "40px",
                  width: "100%",
                }}
                onChange={(value) => {
                  setHandleMethod(value);
                }}
              >
                <option value="ZaloPay">ZaloPay</option>
                <option value="VNPay">VNPay</option>
                <option value="Momo">Momo</option>
                <option value="PayPal">PayPal</option>
                <option value="CreditCard">Credit Card</option>
              </select>
            </Form.Item>

            {/* Card Number */}
            <Form.Item
              name="cardNumber"
              label="Card Number *"
              rules={[
                {
                  required: handleMethod === "ZaloPay" || "VNPay"  ? false : true,
                  message: "Please enter your card number!",
                },
              ]}
              className="md:col-span-2"
            >
              <Input
                placeholder="Card Number"
                className="h-10 rounded-none"
                prefix={<CreditCardOutlined />}
                disabled={handleMethod === "ZaloPay" || "VNPay"  ? true : false}
              />
            </Form.Item>

            {/* CVC */}
            <Form.Item
              name="cvc"
              label="CVC"
              rules={[
                {
                  required: handleMethod === "ZaloPay" || "VNPay" ? false : true,
                  message: "Please enter your CVC!",
                },
              ]}
              className="col-span-1"
            >
              <Input
                placeholder="CVC"
                className="h-10 rounded-none"
                prefix={<LockOutlined />}
                disabled={handleMethod === "ZaloPay" || "VNPay" ? true : false}
              />
            </Form.Item>

            {/* EXP Date */}
            <Form.Item
              name="expDate"
              label="EXP Date"
              rules={[
                {
                  required: handleMethod === "ZaloPay" || "VNPay" ? false : true,
                  message: "Please enter the expiration date!",
                },
              ]}
              className="col-span-1"
            >
              <Input
                placeholder="MM/YY"
                className="h-10 rounded-none"
                prefix={<CalendarOutlined />}
                disabled={handleMethod === "ZaloPay" || "VNPay" ? true : false}
              />
            </Form.Item>

            <div className="col-span-3">
              <h3 className="text-xl font-bold">Cancellation Policy</h3>
              <p className="text-gray-600 text-sm">
                Get A Full Refund If You Cancel By Jun 23 (PDT).{" "}
                <a href="#" className="text-[#07689F] hover:underline">
                  Read More...
                </a>
              </p>
            </div>

            <Form.Item className="col-span-3">
              <div className="flex gap-4">
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  className="font-bold bg-[#07689F] w-1/2"
                >
                  Confirm And Pay
                </Button>
                <Button
                  size="large"
                  className="font-bold text-[#07689F] border-[#07689F] w-1/2"
                  onClick={() => handleClose()}
                >
                  Close
                </Button>
              </div>

              <div className="flex justify-around gap-4">
                <div className="text-gray-400 text-xs text-center">
                  Check your information before submitting.
                </div>
                <div className="text-gray-400 text-xs text-center">
                  Save your flight info, find it through Shortcut.
                </div>
              </div>
            </Form.Item>
          </Form>
        </Box>
      </Modal>{" "}
    </div>
  );
}

export default PaymentModal;
