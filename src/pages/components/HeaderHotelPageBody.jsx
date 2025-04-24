import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  // DatePicker,
  Select,
  Form,
  AutoComplete,
  InputNumber,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
// import { setSearchData } from "../../../Redux/Slide/searchSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  setResultHotelData,
  setSearchHotelData,
} from "../../Redux/Slide/searchHotelSlice";
import {
  apiGet,
  apiPost,
  apiPostWithoutAuthorization,
} from "../../API/APIService";

// const suggestions = [
//   { value: "Da Nang" },
//   { value: "Khanh Hoa" },
//   { value: "Ha Noi" },
//   { value: "TP HCM" },
//   { value: "Dat Lat" },
//   { value: "Vung Tau" },
//   { value: "Can Tho" },
// ];

const HeaderHotelPageBody = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [departureOptions, setDepartureOptions] = useState([]);
  const [departureArr, setDepartureArr] = useState([]);

  const callApiLoaction = async () => {
    try {
      const req = await fetch(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      const res = await req.json();
      const newArr = res.map((item) => {
        return {
          value: item.Name,
          // Id: item.Id,
        };
      });
      setDepartureArr(newArr);
    } catch {
      console.log("fail");
    }
  };

  useEffect(() => {
    callApiLoaction();
  }, []);

  const callApiSearch = async (value) => {
    try {
      const req = await apiPost("search-hotel", value);
      return req;
    } catch (error) {
      console.error("error");
    }
  };

  const onFinish = async (values) => {
    try {
      const date1 = new Date(values.departureDate);
      const date2 = new Date();

      date1.setHours(0, 0, 0, 0);
      date2.setHours(0, 0, 0, 0);

      if (date1 < date2) {
        return toast.warn(
          "The departureDate date must be greater than or equal to the current date",
          {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
      if (values.returnDate) {
        const departureDate = dayjs(values.departureDate);
        const returnDate = dayjs(values.returnDate);

        if (departureDate.isAfter(returnDate)) {
          return toast.warn(
            "The return date cannot be less than the departure date",
            {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
      }

      const newValues = {
        ...values,
        departureDate: dayjs(values.departureDate).format("YYYY-MM-DD"),
        returnDate: dayjs(values.returnDate).format("YYYY-MM-DD"),
      };

      dispatch(setSearchHotelData(newValues));
      const response = await callApiSearch(newValues);
      console.log(response.data);
      dispatch(setResultHotelData(response.data));

      if (location.pathname !== "/hotel-search-page") {
        navigate("/hotel-search-page");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const handleDepartureSearch = (value) => {
    const normalizedValue = removeVietnameseTones(value.toLowerCase());
    setDepartureOptions(
      departureArr.filter((item) =>
        removeVietnameseTones(item.value.toLowerCase()).includes(
          normalizedValue
        )
      )
    );
  };

  return (
    <div className="mt-5">
      <h1 className="text-2xl font-bold text-[#07689F] mb-4">
        Which Exciting Place Is Your Next Adventure Taking You?
      </h1>
      <div className="text-[#07689F] text-lg mb-10">
        Discover exclusive Genius rewards wherever your journey takes you!
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="flex flex-wrap md:flex-nowrap items-end justify-center"
      >
        {/* Place */}
        <Form.Item
          name="place"
          label={<div className="font-bold text-base">From</div>}
          className="flex-1 min-w-[200px]"
          rules={[{ required: true, message: "Please enter From" }]}
        >
          <AutoComplete
            options={departureOptions}
            onSearch={handleDepartureSearch}
            placeholder="Type your destination"
            prefix={
              <FontAwesomeIcon
                icon={faPlane}
                style={{
                  fontSize: "24px",
                  color: "#07689F",
                  marginRight: "7px",
                }}
              />
            }
            className=" h-10"
          />
        </Form.Item>

        {/* Departure  */}
        <Form.Item
          name="departureDate"
          label={<div className="font-bold text-base">Check In </div>}
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            // width: "120px",
          }}
          rules={[{ required: true, message: "Please select dates!" }]}
        >
          <Input className="w-full h-10" type="date" />
        </Form.Item>

        {/* Return  */}
        <Form.Item
          name="returnDate"
          label={<div className="font-bold text-base">Check Out</div>}
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            // width: "120px",
          }}
          rules={[{ required: true, message: "Please select dates!" }]}
        >
          <Input className="w-full h-10" type="date" />
        </Form.Item>

        {/* Passengers*/}
        <Form.Item
          name="passengers"
          label={<div className="font-bold text-base">Passengers</div>}
          rules={[{ required: true, message: "Please fill Passengers!" }]}
          initialValue={1}
        >
          <InputNumber
            min={1}
            style={{ width: "120px", height: "40px", padding: "5px" }}
            placeholder="Passengers"
            defaultValue={1}
          />
        </Form.Item>

        {/* Children */}
        <Form.Item
          name="children"
          label={<div className="font-bold text-base">Children</div>}
          // rules={[{ required: true, message: "Please fill Children!" }]}
        >
          <InputNumber
            min={0}
            style={{ height: "40px", padding: "5px", width: "100px" }}
            placeholder="Children"
            // defaultValue={1}
          />
        </Form.Item>

        {/* Search Button */}
        <Form.Item className="flex items-end">
          <Button
            type="primary"
            htmlType="submit"
            className="h-[40px] w-[80px] bg-[#07689F] "
          >
            Find
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HeaderHotelPageBody;
