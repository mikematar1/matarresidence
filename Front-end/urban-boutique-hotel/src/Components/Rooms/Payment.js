import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import mastercard from "../../assets/images/mastercard.png";
import offline from "../../assets/images/offline.jpg";
import { AiOutlineInfoCircle } from "react-icons/ai";
import emailjs from '@emailjs/browser';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardPayment from "./CardPayment";

//APIS
import ReserveRoom from "../../api-client/Rooms/ReserveRoom";
import ReserveRoombyCard from "../../api-client/Rooms/ReserveRoomByCard";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const location = useLocation();
  const navigation = useNavigate();

  const data = location.state?.data;

  const [paymentMethod, setPaymentMethod] = useState("");

  const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    if (!location.state || !location.state.data) {
      navigation("/");
    }
  }, [location.state, navigation]);

  const adminSendEmail = (first_name,last_name,firstDate,endDate,total_price, message) => {

    const adminTemplateParams = {
      user_email:"support@matarresidence.com",
      title: "New Reservation Request",
      name: "Matar Residence Hotel",
      message: `${first_name} ${last_name} ${message} a room from ${firstDate} to ${endDate} for ${total_price} $`,
    };

    emailjs.send(serviceID, templateID, adminTemplateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (error) => {
        console.log('FAILED...', error);
      });
  };

  const userSendEmail = (first_name,last_name,firstDate,endDate,total_price) => {
    const userTemplateParams = {
      user_email:data.email,
      title: "Reservation Confirmation",
      name: "Matar Residence Hotel",
      message: `Thank you for choosing Matar Residence!\n 
      We're delighted to confirm your reservation and look forward to welcoming you.\n
      Reservation Details:\n
      Name: ${first_name} ${last_name}\n
      Check-in Date: ${firstDate}\n
      Check-out Date: ${endDate}\n
      Total Price: ${total_price} $\n
      If you have any questions or need assistance, feel free to reach out.\n
      Best regards,\n
      Matar Residence Team`,
    };

    emailjs.send(serviceID, templateID, userTemplateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert("Email sent successfully");
      }, (error) => {
        console.log('FAILED...', error);
        alert("Failed to send email");
      });
  };

  const userSendEmailPending = (total_price) => {
    const userTemplateParams = {
      user_email:data.email,
      title: "Reservation Pending",
      name: "Matar Residence Hotel",
      message: `Thank you for choosing Matar Residence!\n 
      To confirm your reservation, please pay 30% of the amount (${total_price*0.3})$ through Whish, OMT, or BOB.
      to the following number: +96170722272.\n
      Also, you can pay through Western Union to Michael Matar.\n
      Once the payment is made, please send us a screenshot of the payment to the same number.\n
      If you have any questions or need assistance, feel free to reach out.\n
      Best regards,\n
      Matar Residence Team`,
    };

    emailjs.send(serviceID, templateID, userTemplateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert("Email sent successfully");
      }, (error) => {
        console.log('FAILED...', error);
        alert("Failed to send email");
      });
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmitOffline = () => {
    adminSendEmail(data.first_name,data.last_name,data.reservation_date,data.reservation_end,data.total_price,"requested to book");
    userSendEmailPending(data.total_price);
    delete data.total_price;
    let response = ReserveRoom(data);
    response.then((res) => {
      if (res.data.status === "success") {
        localStorage.setItem("shouldReload", "true");
        navigation("/pending");
      }
    });
  };

  const handleSubmitCard = () => {
    adminSendEmail(data.first_name,data.last_name,data.reservation_date,data.reservation_end,data.total_price,"booked by card");
    userSendEmail(data.first_name,data.last_name,data.reservation_date,data.reservation_end,data.total_price);
    delete data.total_price;
    let response = ReserveRoombyCard(data);
    response.then((res) => {
      if (res.data.status === "success") {
        localStorage.setItem("shouldReload", "true");
        navigation("/submit");
      }
    });
  };

  
  const handleCopyNumber = () => {
    navigator.clipboard.writeText("+96170722272");
  };

  return (
    <div className="contact-section payment">
      <div className="message-form">
        <div className="message-header">
          <div className="room-display payment">
            <h1>Select payment option</h1>
          </div>
          <div className="payment-options">
            <label className="payment-label">
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === "creditCard"}
                onChange={handlePaymentMethodChange}
              />
              Pay with Credit Card
              <img
                className="credit-cards"
                src={mastercard}
                alt="Credit Card"
              />
            </label>
            <label className="payment-label">
              <input
                type="radio"
                name="paymentMethod"
                value="offline"
                checked={paymentMethod === "offline"}
                onChange={handlePaymentMethodChange}
              />
              Pay Offline
              <img className="credit-cards" src={offline} alt="Credit Card" />
            </label>
          </div>
          {paymentMethod === "creditCard" && (
            <div className="payment-selected">
              <Elements stripe={stripePromise}>
                <CardPayment amount={data.total_price} onSuccess={handleSubmitCard} />
              </Elements>
            </div>
          )}
          {paymentMethod === "offline" && (
            <div className="payment-selected">
              <div className="payment-info">
                <AiOutlineInfoCircle style={{color:"red"}}/>
                <p>
                  Selecting this payment method means you need to send <span style={{fontWeight:"bolder"}}>30%</span> of
                  the total price <span style={{fontWeight:"bolder"}}>({data.total_price*0.3}$)</span> to the following number{" "}
                  <span
                    style={{ cursor: "pointer",fontWeight: "bolder" }}
                    onClick={handleCopyNumber}
                    title="Click to copy"
                  >
                    +96170722272
                  </span>{" "}
                  via Whish, OMT, or BOB. You can also pay through Western Union to Michael Matar.
                  Once done, please send us a screenshot of the payment to the same number to confirm your reservation.
                </p>
              </div>
              <div className="button-payment">
                <button onClick={handleSubmitOffline}>Select</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
