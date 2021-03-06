import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';


function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
      alert("Your Order has been receieved! Please refer to the payment section to complete the order. We will ship as soon as payment is received.");
    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
                <h3>
                  Shipping
                </h3>
              <div>
              {order.shipping.city}
              </div>
              <div>
              {order.shipping.postalCode}
              </div>
              <div>
              {order.shipping.address}
              </div>
              <div>
              {order.shipping.country}
              </div>

              {/* <div>
                {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
              </div> */}
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.payment.paymentMethod}
            </div>

            <ol className="payment-methods">
              <li>
              For HSBC Payme: <a href=" https://payme.hsbc/60261084" target="_blank" rel="noopener noreferrer"> Tap to PayMe!</a>
              </li>
              <img className="payme" src="\images\hsbcpayme.jpg" alt="payme"></img>
              <li>
              For FPS: Payment can be sent to 60261084.
              </li>
              <li>
              For Bank Transfer:
              <p>HSBC bank account 405 222 043 292 (Chan T** W**g)</p>
              </li>
            </ol>

            <div>
              {/* Paypal Connection*/}
              {/* {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."} */}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Shopping Cart
          </h3>
                <div>
                  Price
          </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    Cart is empty
          </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>

                        </div>
                        <div>
                          Qty: {item.qty}
                        </div>
                      </div>
                      <div className="cart-price">
                        ${item.price}
                      </div>
                    </li>
                  )
              }
            </ul>
          </div>


        </div>
        <div className="placeorder-action">
          <ul>
            {/* <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
            </li> */}
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${order.shippingPrice}</div>
            </li>
            {/* <li>
              <div>Service Fee</div>
              <div>${order.taxPrice}</div>
            </li> */}
            <li>
              <div>Order Total</div>
              <div>${order.totalPrice}</div>
            </li>          
          </ul>
          <br/>
          *** Your order will be shipped once payment is received. You can check your orders under your profile page. 
          Thank you for shopping with Tiny Treasures HK!
          <div>
            </div>


        </div>

      </div>
    </div>

}

export default OrderScreen;