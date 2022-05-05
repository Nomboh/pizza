import Image from "next/image";
import styles from "../styles/Cart.module.css";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import reset from "../redux/cartSlice";
import Modal from "../components/Modal";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const { products, total } = useSelector(state => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();
  const createOrder = async data => {
    try {
      const res = await axios.post("http://localhost:3000/api/order", data);
      res.status === 201 && router.push("/order/" + res.data._id);
      dispatch(reset());
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    setModal(true);
  };

  // This values are the props in the UI
  const amount = total;
  const currency = "USD";
  const style = { layout: "vertical" };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then(orderId => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (detail) {
              // Your code here after capture the order
              const data = {
                customer: detail.purchase_units[0].shipping.name.full_name,
                address:
                  detail.purchase_units[0].shipping.address.address_line_1,
                total: +detail.purchase_units[0].amount.value,
                method: 1,
              };
              createOrder(data);
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.thead}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {products.map(product => (
              <tr key={product._id} className={styles.tr}>
                <td className={styles.imgContainer}>
                  <Image src={product.img} alt=" " layout="fill" />
                </td>
                <td className={styles.name}>{product.title}</td>
                <td>{product.extra.map(ext => ext.text).join(", ")}</td>
                <td className={styles.price}>{product.price}</td>
                <td className={styles.qty}>{product.quantity}</td>
                <td className={styles.total}>
                  ${product.price * product.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <h1 className={styles.heading}>ORDER SUMMARY</h1>
        <p className={styles.summary}>
          <b>Subtotal:</b>${total}
        </p>
        <p className={styles.summary}>
          <b>Discount:</b>$00.00
        </p>
        <p className={styles.summary}>
          <b>Total:</b>${total}
        </p>
        <div className={styles.btnWrapper}>
          {open ? (
            <>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AddCTCkaowhvez_foXfCoDdKPjpFsyt1q0PtyjId0Po9lU0PdU4mPK-xu5kzAJq2-bDg1OGUTgcTBY-E",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
              <button className={styles.btnPayment} onClick={handleClick}>
                PAYMENT ON DELIVERY
              </button>
            </>
          ) : (
            <button className={styles.btn} onClick={() => setOpen(true)}>
              CHECKOUT
            </button>
          )}
        </div>
      </div>
      {modal && total > 0 && (
        <Modal total={total} createOrder={createOrder} setModal={setModal} />
      )}
    </div>
  );
};

export default Cart;
