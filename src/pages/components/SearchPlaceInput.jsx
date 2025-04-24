import React, { useEffect, useState } from "react";
import PassengerModal from "../HotelSearchPage/components/PassengerModal";
import { Input, AutoComplete, Form } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const suggestions = [
  { value: "Thành Phố Hồ Chí Minh" },
  { value: "Hà Nội" },
  { value: "Đà Nẵng" },
];
function SearchPlaceInput({ formik, disable, ...props }) {
  const [pageCount, setPageCount] = useState(1);
  const [hotelList, setHotelList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [departureOptions, setDepartureOptions] = useState(suggestions);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePageClick = ({ selected }) => {
    console.log(selected);
    // setLoading(true);
    setCurrentPage(selected);
  };
  const handleDepartureSearch = (value) => {
    setDepartureOptions(
      suggestions.filter((item) =>
        item.value.toLowerCase().includes(value.t$oLowerCase())
      )
    );
  };
  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-[#07689F] mb-4 ">
        Which Exciting Place Is Your Next Adventure Taking You?
      </h1>
      <div className="text-[#07689F] text-lg mb-10">
        Discover exclusive Genius rewards wherever your journey takes you!
      </div>
      <div className="flex flex-wrap md:flex-nowrap items-end justify-center">
        <div className=" flex">
          <div className="">
            <div className="title">Place</div>

            <Input
              className="search-input"
              id="place"
              name="place"
              type="place"
              // onChange={formik.handleChange}
              // value={formik.values.place}
            ></Input>
          </div>
          <div>
            <div className="title">City</div>
            <Input
              type="text"
              className="search-input"
              style={{ disabled: true }}
              disabled={disable ? "disabled" : ""}
              id="city"
              name="city"
              min="1"
              // onChange={formik.handleChange}
              // value={formik.values.city}
            />

            <div className="flex">
              <div className="error-field ">
                {" "}
                {/* {formik.errors.city && (
                  <div>{formik.errors.city}</div>
                )} */}
              </div>
            </div>
          </div>
          <div>
            <div className="title">Passengers</div>
            <Input
              type="number"
              className="search-input"
              style={{ disabled: true }}
              disabled={disable ? "disabled" : ""}
              id="passengers"
              name="passengers"
              min="1"
              // onChange={formik.handleChange}
              // value={formik.values.passengers}
            />

            <div className="flex">
              <div className="error-field ">
                {" "}
                {/* {formik.errors.passengers && (
                  <div>{formik.errors.passengers}</div>
                )} */}
              </div>
            </div>
          </div>
          <div>
            <div className="title">Children</div>
            <Input
              type="number"
              min="0"
              className="search-input"
              style={{ disabled: true }}
              disabled={disable ? "disabled" : ""}
              id="children"
              name="children"
              // onChange={formik.handleChange}
              // value={formik.values.children}
            />

            <div className="flex">
              <div className="error-field ">
                {" "}
                {/* {formik.errors.children && <div>{formik.errors.children}</div>} */}
              </div>
            </div>
          </div>
          <div>
            <div className="title">Check In</div>
            <Input
              disabled={disable ? "disabled" : ""}
              className="search-input"
              id="checkin"
              name="checkin"
              type="date"
              // onChange={formik.handleChange}
              value={formik.values.checkin}
            />

            <div className="flex">
              <div className="error-field ">
                {" "}
                {/* {formik.errors.checkin && <div>{formik.errors.checkin}</div>} */}
              </div>
            </div>
          </div>
          <div>
            <div className="title">Check Out</div>

            <Input
              disabled={disable ? "disabled" : ""}
              className="search-input"
              id="checkout"
              name="checkout"
              type="date"
              // onChange={formik.handleChange}
              // value={formik.values.checkout}
            />
            <div className="flex">
              <div className="error-field ">
                {" "}
                {/* {formik.errors.checkout && <div>{formik.errors.checkout}</div>} */}
              </div>
            </div>
          </div>

          <div>
            <button type="submit" className="search-input-button mt-5">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPlaceInput;
