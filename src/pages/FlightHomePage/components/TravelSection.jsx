import React from "react";
import { Button } from "antd";
import TravelSectionImg from "../components/img/Back ground.png";
import { useNavigate } from "react-router-dom";

const TravelSection = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full mt-5 flex flex-col  items-center">
      <div className="w-full m-5 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Let's Travel Together</h3>
          <div className="text-base mt-2">
            Discover the latest offers and news and start planning your next
            trip with us.
          </div>
        </div>
        <Button
          style={{
            width: "189px",
            height: "40px",
            color: "#07689f",
            border: "1px solid #07689f",
            borderRadius: "6px",
            textAlign: "center",
            cursor: "pointer",
            fontWeight: 500,
          }}
          onClick={() => navigate("/gis")}
        >
          See All
        </Button>
      </div>
      <img src={TravelSectionImg} alt="" style={{ width: "100%" }} />
    </div>
  );
};

export default TravelSection;
