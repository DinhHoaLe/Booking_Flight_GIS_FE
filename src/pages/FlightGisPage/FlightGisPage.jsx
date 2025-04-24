import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FlightFavoritePageBody from "./components/FlightGisPageBody";
import ChatBox from "../ChatPage/ChatBox";
import FlightGisPageBody from "./components/FlightGisPageBody";

function FlightGisPage() {
  return (
    <div className="center-gov content-center">
      <Navbar />
      <FlightGisPageBody />
      <Footer />
      <ChatBox />
    </div>
  );
}

export default FlightGisPage;
