import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import FlightTable from "./FlightTable.jsx";
function FlightConfirmBody() {
  return (
    <div>
      <div className="head-title">Digital Ticket</div>
      <div className="mb-3 sub-title">It is not Necessary To Print Your Ticket</div>
      <div class="ticket-card">
        <FlightTable />
      </div>
      <div className="head-title mt-3">Terms and Conditions</div>
      <div className="sub-title mt-3">Payments</div>
      <div className="terms-and-condition mt-3">
        <div className="mb-4">
          If you are purchasing your ticket using a debit or credit card via the
          Website, we will process these payments via the automated secure
          common payment gateway which will be subject to fraud screening
          purposes.
        </div>
        <div className="mb-4">
          If you do not supply the correct card billing address and/or
          cardholder information, your booking will not be confirmed and the
          overall cost may increase. We reserve the right to cancel your booking
          if payment is declined for any reason or if you have supplied
          incorrect card information. If we become aware of, or is notified of,
          any fraud or illegal activity associated with the payment for the
          booking, the booking will be cancelled and you will be liable for all
          costs and expenses arising from such cancellation, without prejudice
          to any action that may be taken against us.
        </div>
        <div className="mb-4">
          Golobe may require the card holder to provide additional payment
          verification upon request by either submitting an online form or
          visiting the nearest Golobe office, or at the airport at the time of
          check-in. Golobe reserves the right to deny boarding or to collect a
          guarantee payment (in cash or from another credit card) if the card
          originally used for the purchase cannot be presented by the cardholder
          at check-in or when collecting the tickets, or in the case the
          original payment has been withheld or disputed by the card issuing
          bank. Credit card details are held in a secured environment and
          transferred through an internationally accepted system.
        </div>
      </div>
    </div>
  );
}

export default FlightConfirmBody;
