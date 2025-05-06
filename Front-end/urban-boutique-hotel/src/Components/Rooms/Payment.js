import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import mastercard from "../../assets/images/mastercard.png";
import paypal from "../../assets/images/paypal.jpg";
import offline from "../../assets/images/offline.jpg";
import { AiOutlineInfoCircle } from "react-icons/ai";

//APIS
import ReserveRoom from "../../api-client/Rooms/ReserveRoom";

const Payment = () => {
  const location = useLocation();
  const navigation = useNavigate();

  const data = location.state?.data;

  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (!location.state || !location.state.data) {
      navigation("/");
    }
  }, [location.state, navigation]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleSubmitOffline = () => {
    delete data.total_price;
    let response = ReserveRoom(data);
    response.then((res) => {
      if (res.data.status === "success") {
        localStorage.setItem("shouldReload", "true");
        navigation("/submit");
      }
    });
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
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={handlePaymentMethodChange}
              />
              Pay with Paypal
              <img className="credit-cards " src={paypal} alt="Credit Card" />
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
              <div className="message-input card">
                <input
                  type="number"
                  id="card number"
                  placeholder="Card Number *"
                />
              </div>

              <div className="message-name-email">
                <div className="message-input">
                  <input
                    type="month"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="Expiration Date *"
                    min={new Date().toISOString().slice(0, 7)}
                    required
                  />
                </div>
                <div className="message-input">
                  <input
                    type="number"
                    id="security code"
                    placeholder="Security code (CVV) *"
                  />
                </div>
              </div>
              <div className="message-input card">
                <input
                  type="text"
                  id="card name"
                  placeholder="Cardholder Name *"
                />
              </div>
              <div className="button-payment">
                <button>Complete Checkout</button>
              </div>
            </div>
          )}
          {paymentMethod === "paypal" && (
            <div className="payment-selected">
              <div className="payment-info">
                <AiOutlineInfoCircle />
                <p>
                  Once you click to proceed, you will be redirected to PayPal.
                </p>
              </div>
              <div className="button-payment">
                <button>Select</button>
              </div>
            </div>
          )}
          {paymentMethod === "offline" && (
            <div className="payment-selected">
              <div className="payment-info">
                <AiOutlineInfoCircle />
                <p>
                  Selecting this payment method means you will arrange the
                  payment with the host offline, after you book.
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
