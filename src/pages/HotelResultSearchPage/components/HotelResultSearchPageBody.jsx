import React, { useEffect, useState } from "react";
// import HotelCard from "./FlightCard";
import { Slider } from "@mui/material";
import { Button } from "antd";
import { Checkbox, Divider, List, Drawer, Space } from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { apiGet, apiPost } from "../../../API/APIService";
import { useDispatch, useSelector } from "react-redux";
import {
  addFlight,
  clearFlights,
  removeFlight,
} from "../../../Redux/Slide/compareSlice";
import HotelCard from "./HotelCard";

const CheckboxGroup = Checkbox.Group;
const passengerRatingArr = [
  "Outstanding 9+",
  "Very good 8+",
  "Good 7+",
  "Excellent",
  "Poor",
];
const airPlaneNameArr = [
  "Vietnam Airlines",
  "VietJet",
  "Jetstar Pacific",
  "Bamboo Airways",
];

const popularFiltersArr = [
  "Drink Included",
  "Taxes Included",
  "VIP",
  "Child Friendly",
  "Pet friendly",
];

function HotelResultSearchPageBody() {
  const [sliderValue, setSliderValue] = useState(0);
  const [checkedListPLane, setCheckedListPlane] = useState([]);
  const [checkedListPassenger, setCheckedListPassenger] = useState([]);
  const [checkedListPopular, setCheckedListPopular] = useState([]);
  const [dataResult, setDataResult] = useState([]);
  const [selected, setSelected] = useState({});
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [arrDrawer, setArrDrawer] = useState([]);
  const dispatch = useDispatch();

  const { searchHotelData } = useSelector((state) => state?.searchHotelSlice);
  const { resultHotelData } = useSelector((state) => state?.searchHotelSlice);

  console.log(resultHotelData);
  const { compareFlights } = useSelector((state) => state?.compareSlice);

  useEffect(() => {
    setDataResult(resultHotelData);
  }, [resultHotelData]);

  //Air Plane
  const checkAllPLane = airPlaneNameArr.length === checkedListPLane.length;
  const indeterminatePlane =
    checkedListPLane.length > 0 &&
    checkedListPLane.length < airPlaneNameArr.length;
  const onChangePLane = (list) => {
    setCheckedListPlane(list);
  };

  const onCheckAllChangePLane = (e) => {
    setCheckedListPlane(e.target.checked ? airPlaneNameArr : []);
  };

  // Passenger Rating
  const checkAllPassenger =
    passengerRatingArr.length === checkedListPassenger.length;
  const indeterminatePassenger =
    checkedListPassenger.length > 0 &&
    checkedListPassenger.length < passengerRatingArr.length;
  const onChangePassenger = (list) => {
    setCheckedListPassenger(list);
  };

  const onCheckAllChangePassenger = (e) => {
    setCheckedListPassenger(e.target.checked ? passengerRatingArr : []);
  };

  // Popular Filters
  const checkAllPopular =
    popularFiltersArr.length === checkedListPopular.length;
  const indeterminatePopular =
    checkedListPopular.length > 0 &&
    checkedListPopular.length < popularFiltersArr.length;
  const onChangePopular = (list) => {
    setCheckedListPopular(list);
  };

  const onCheckAllChangePopular = (e) => {
    setCheckedListPopular(e.target.checked ? popularFiltersArr : []);
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  useEffect(() => {
    if (Object.keys(selected).length !== 0) {
      dispatch(addFlight(selected));
      const checkItem = arrDrawer.some((item) => item._id === selected._id);
      if (!checkItem) {
        setArrDrawer((prevArr) => [...prevArr, selected]);
      }
    }
  }, [selected]);

  const showDrawer = () => {
    // console.log(selected);
    // dispatch(addFlight(selected));
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  console.log(dataResult);

  return (
    <div className="min-w-[1224px]">
      <div className="flex justify-between gap-5">
        <div className="flex flex-col gap-5 max-w-64">
          <div>
            <div className="head-title">Departure Time</div>
            <Slider
              size="small"
              value={sliderValue}
              aria-label="Small"
              valueLabelDisplay="auto"
            />
            <div className="flex">
              <Button className="time-button">From 12:00</Button>
              <Button className="time-button">Up to 16:45</Button>
            </div>
          </div>

          <div>
            <div className="head-title">Trip Duration</div>
            <Slider
              size="small"
              value={sliderValue}
              aria-label="Small"
              valueLabelDisplay="auto"
            />
            <div className="flex">
              <Button className="time-button">From: 7h to 12h</Button>
              <Button className="time-button">One Stop</Button>
            </div>
          </div>

          {/*Airline Name*/}
          <div>
            <div className="head-title">Airline</div>
            <div className="flex flex-col gap-2">
              <Checkbox
                indeterminate={indeterminatePlane}
                onChange={onCheckAllChangePLane}
                checked={checkAllPLane}
              >
                All
              </Checkbox>
              <CheckboxGroup
                options={airPlaneNameArr}
                value={checkedListPLane}
                onChange={onChangePLane}
                className="flex flex-col gap-2"
              />
            </div>
          </div>

          {/* Passenger Rating */}
          <div>
            <div className="head-title">Passenger Rating</div>
            <div className="flex flex-col gap-2">
              <Checkbox
                indeterminate={indeterminatePassenger}
                onChange={onCheckAllChangePassenger}
                checked={checkAllPassenger}
              >
                All
              </Checkbox>
              <CheckboxGroup
                options={passengerRatingArr}
                value={checkedListPassenger}
                onChange={onChangePassenger}
                className="flex flex-col gap-2"
              />
            </div>
          </div>

          {/* Popular Filters */}
          <div>
            <div className="head-title">Popular Filters</div>
            <div className="flex flex-col gap-2">
              <Checkbox
                indeterminate={indeterminatePopular}
                onChange={onCheckAllChangePopular}
                checked={checkAllPopular}
              >
                All
              </Checkbox>
              <CheckboxGroup
                options={popularFiltersArr}
                value={checkedListPopular}
                onChange={onChangePopular}
                className="flex flex-col gap-2"
              />
            </div>
          </div>

          <div className="flex">
            <Checkbox
              onChange={onChange}
              style={{
                transform: "scale(1.5)",
                transformOrigin: "center",
              }}
            />
            <div className="flex flex-col  ml-5">
              <div className="font-bold text-base">
                Filter With the Help Of AI.
              </div>
              <span className="font-semibold text-sm text-[#07689F] cursor-pointer">
                See the results here !
              </span>
            </div>
          </div>

          <div className="flex">
            <Checkbox
              onChange={onChange}
              style={{
                transform: "scale(1.5)",
                transformOrigin: "center",
              }}
            />
            <div className="flex flex-col  ml-5">
              <div className="font-bold text-base">Filter Randomly</div>
              <span className="font-semibold text-sm text-[#07689F] cursor-pointer">
                See the results here !
              </span>
            </div>
          </div>
        </div>

        <div className="border-[#F9F9F9] border-solid border"></div>

        <div className="">
          {dataResult && dataResult.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={dataResult}
              pagination={{
                pageSize: 5,
              }}
              renderItem={(item) =>
                item.returnInfo ? (
                  item.returnInfo?.map((item2) => (
                    <List.Item className="flex">
                      <HotelCard
                        dataSource={item}
                        dataReturn={item2}
                        openDrawer={setOpen}
                      />
                    </List.Item>
                  ))
                ) : (
                  <List.Item className="flex">
                    <HotelCard
                      dataSource={item}
                      openDrawer={showDrawer}
                      selected={setSelected}
                    />
                  </List.Item>
                )
              }
            />
          ) : (
            <div>Flight is not found! !</div>
          )}
        </div>
      </div>
      <Drawer
        title={
          <div className="text-xl font-bold text-[#07689F]">Flight Details</div>
        }
        placement="bottom"
        width={500}
        onClose={onClose}
        open={open}
        mask={false}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={() => dispatch(clearFlights())}>Clear</Button>
            <Button
              type="primary"
              onClick={onClose}
              style={{ backgroundColor: "#07689F" }}
            >
              OK
            </Button>
          </Space>
        }
      >
        <div className="p-2">
          {/* Table */}
          <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-9 bg-gray-100 p-1 font-bold text-sm text-gray-700">
              <div>Airline Name</div>
              <div>Flight Number</div>
              <div>Departure Airport</div>
              <div>Departure Date</div>
              <div>Departure Place</div>
              <div>Destination Airport</div>
              <div>Destination Date</div>
              <div>Destination Place</div>
              <div>Actions</div>
            </div>

            {/* Rows */}
            {compareFlights.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-9 p-2 text-sm text-gray-600 items-center border-b border-gray-300"
              >
                <div>{item?.airlineName || "N/A"}</div>
                <div>{item?.flightNumber || "N/A"}</div>
                <div>{item?.departureAirport || "N/A"}</div>
                <div>{item?.departureDate?.slice(0, 19) || "N/A"}</div>
                <div>{item?.departurePlace || "N/A"}</div>
                <div>{item?.destinationAirport || "N/A"}</div>
                <div>{item?.destinationDate?.slice(0, 19) || "N/A"}</div>
                <div>{item?.destinationPlace || "N/A"}</div>
                <div>
                  <Button
                    type="primary"
                    className="bg-[#07689F] hover:bg-[#055770]"
                    onClick={() => dispatch(removeFlight(item._id))}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default HotelResultSearchPageBody;
