import React, { useEffect, useState } from "react";
import "./FlightCard.css";
import center from "../img/Center.png";
import { Button, Tag, Drawer, Space } from "antd";
import VNA from "../img/logo-vna.svg";
import VJ from "../img/logo-vietjet.svg";
import JS from "../img/logo-jetstar.svg";
import BAA from "../img/logo-bamboo-airways.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  SwapOutlined,
  SwapRightOutlined,
  HeartOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";

function HotelCard({ dataSource, dataReturn, openDrawer, selected }) {
  const navigate = useNavigate();
  const [getInfo, setGetInfo] = useState();
  const [getInfoReturn, setGetInfoReturn] = useState();
  const [like, setLike] = useState(false);

  const showDrawer = () => {
    selected(dataSource);
    openDrawer(true);
  };

  const { searchData } = useSelector((state) => state?.searchSlice);

  useEffect(() => {
    if (dataSource) {
      setGetInfo(getPrice());
    }
  }, [dataSource]);

  const getPrice = () => {
    const getPrice = dataSource.classFlight.find(
      (item) => item.type === searchData.classFlight
    );
    return getPrice ? getPrice : "Type not found";
  };

  useEffect(() => {
    if (dataReturn) {
      setGetInfoReturn(getPriceReturn());
    }
  }, [dataReturn]);

  const getPriceReturn = () => {
    const getPrice = dataReturn.classFlight.find(
      (item) => item.type === searchData.classFlight
    );
    return getPrice ? getPrice : "Type not found";
  };

  const handleFav = (key, value, change) => {
    console.log(like);
    if (like === true) {
      let getFav = JSON.parse(localStorage.getItem(key)) || [];
      const filterFav = getFav.filter((item) => item.productId !== value);
      localStorage.setItem(key, JSON.stringify(filterFav));
      setLike(!change);
    } else {
      let getFav = JSON.parse(localStorage.getItem(key)) || [];
      if (!getFav || getFav.length === 0) {
        const newArr = [];
        newArr.push({ productId: value, searchData });
        localStorage.setItem(key, JSON.stringify(newArr));
      } else {
        const isExist = getFav.some((item) => item.productId === value);
        if (!isExist) {
          getFav.push({ productId: value, searchData });
          localStorage.setItem(key, JSON.stringify(getFav));
        }
      }
      setLike(!change);
    }
  };

  const compareIdAndFav = () => {
    const getLocalSS = localStorage.getItem("fav");
    const parsedFav = JSON.parse(getLocalSS) || [];
    const loop2 = parsedFav.some((item) => item.productId === dataSource?._id);

    if (loop2) {
      setLike(loop2);
    }
  };

  useEffect(() => {
    compareIdAndFav();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 w-full border-4 rounded border-[#F9F9F9] border-solid p-2">
      {/* img */}
      <div className="col-span-1 flex items-center justify-center flex-col relative">
        <img src={logoAirPlane()} alt="Flight Logo" />
      </div>

      {/* Thông Tin Chi Tiết */}
      <div className="col-span-3 flex flex-col gap-4 justify-between">
        {/* From - To */}
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="bg-[#F9F9F9] font-bold text-lg text-center p-2">
            <span className="text-[#07689F]">{dataSource.departurePlace}</span>
          </div>
          <div className="flex justify-center items-center text-[#07689F] text-3xl">
            {searchData?.trip === "one" ? (
              <SwapRightOutlined />
            ) : (
              <SwapOutlined />
            )}{" "}
            {/* <SwapOutlined /> */}
          </div>
          <div className="bg-[#F9F9F9] font-bold text-lg text-center p-2">
            <span className="text-[#07689F]">
              {dataSource.destinationPlace}
            </span>
          </div>
        </div>

        {/* Name Airport */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-100 p-2 rounded font-bold">
            {dataSource.departureAirport}
          </div>
          <div className="bg-gray-100 p-2 rounded font-bold">Fly Straight</div>
          <div className="bg-gray-100 p-2 rounded font-bold">
            {dataSource.destinationAirport}
          </div>
        </div>

        {/* Time */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-bold text-lg">
              {dataSource?.departureDate?.slice(0, 10)}
            </div>
            <div className="font-bold text-lg">
              {dataSource?.departureDate?.slice(11, 19)}
            </div>
          </div>
          <div>
            <div className="text-lg font-bold">Trip Duration:</div>
            <div className="text-lg font-bold">
              {dataSource?.departureDate && dataSource?.destinationDate
                ? (() => {
                    const diffMs = Math.abs(
                      new Date(dataSource?.destinationDate) -
                        new Date(dataSource?.departureDate)
                    );
                    const hours = Math.floor(diffMs / (1000 * 60 * 60));
                    const minutes = Math.floor(
                      (diffMs % (1000 * 60 * 60)) / (1000 * 60)
                    );

                    return `${hours} hours ${minutes} minutes`;
                  })()
                : "N/A"}
            </div>{" "}
          </div>

          <div>
            <div className="font-bold text-lg">
              {dataSource?.destinationDate?.slice(0, 10)}
            </div>
            <div className="font-bold text-lg">
              {dataSource?.destinationDate?.slice(11, 19)}
            </div>
          </div>
        </div>

        {/* Time Return*/}
        {searchData.trip === "two" && (
          <div>
            <div className="border-2 "></div>
            <div className="grid grid-cols-3 gap-4 text-center mt-5">
              <div>
                <div className="font-bold text-lg">
                  {dataReturn?.departureDate?.slice(0, 10)}
                </div>
                <div className="font-bold text-lg">
                  {dataReturn?.departureDate?.slice(11, 19)}
                </div>
              </div>
              <div>
                <div className="text-lg font-bold">Trip Duration:</div>
                <div className="text-lg font-bold">
                  {dataReturn?.departureDate && dataReturn?.destinationDate
                    ? (() => {
                        const diffMs = Math.abs(
                          new Date(dataReturn?.destinationDate) -
                            new Date(dataReturn?.departureDate)
                        );
                        const hours = Math.floor(diffMs / (1000 * 60 * 60));
                        const minutes = Math.floor(
                          (diffMs % (1000 * 60 * 60)) / (1000 * 60)
                        );

                        return `${hours} hours ${minutes} minutes`;
                      })()
                    : "N/A"}
                </div>{" "}
              </div>

              <div>
                <div className="font-bold text-lg">
                  {dataReturn?.destinationDate?.slice(0, 10)}
                </div>
                <div className="font-bold text-lg">
                  {dataReturn?.destinationDate?.slice(11, 19)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Price and More Info */}
        <div className="grid grid-cols-3 gap-4 items-center text-center">
          <div className="flex flex-col justify-between">
            <div className="text-green-600 text-2xl font-bold bg-[#E8F5E4]">
              {dataReturn
                ? getInfo?.price + getInfoReturn?.price
                : getInfo?.price}{" "}
              VND
            </div>
            <div className=" text-sm rounded text-[#4C9839] p-2">
              {getInfo?.seats} vacant seats
            </div>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <div className="font-bold text-base"> {getInfo?.type}</div>
            <div> ( Personal items, hand luggage )</div>
          </div>
          <div className="flex gap-2">
            <Button
              type="primary"
              className="bg-[#07689F] w-full h-[40px] font-bold"
              onClick={() =>
                navigate(
                  `/flight-detail-page?flightId=${
                    dataSource._id
                  }&flightreturnId=${dataReturn?._id || ""}`
                )
              }
            >
              View Detail
            </Button>
            <Button
              type="primary"
              icon={<ApartmentOutlined style={{ color: "white" }} />}
              onClick={showDrawer}
              style={{
                borderColor: "#07689F",
                height: "40px",
                width: "40px",
                backgroundColor: "#07689F",
              }}
            ></Button>
            <Button
              type={like ? "primary" : "default"}
              icon={
                <HeartOutlined style={{ color: like ? "white" : "#07689F" }} />
              }
              onClick={() => handleFav("fav", dataSource._id, like)}
              style={{
                borderColor: "#07689F",
                // color: like ? "white" : "#07689F",
                height: "40px",
                width: "40px",
                backgroundColor: like ? "#07689F" : "white",
              }}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
