import React, { useState } from "react";
import styles from "../styles/Modal.module.css";

function Modal({ total, createOrder, setModal }) {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 });
  };
  console.log({ customer, address });
  return (
    <div className={styles.container} onClick={() => setModal(true)}>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>
          You would pay ${total} after delivery
        </h2>
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="name">
              Full Name
            </label>
            <input
              className={styles.formInput}
              type="text"
              id="name"
              placeholder="Your fullname"
              onChange={e => setCustomer(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="address">
              Address
            </label>
            <input
              className={styles.formInput}
              type="text"
              id="address"
              placeholder="Your Address"
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <button className={styles.btnOrder} onClick={handleClick}>
            Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
