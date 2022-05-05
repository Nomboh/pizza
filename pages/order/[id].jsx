import React from "react";
import Image from "next/image";
import styles from "../../styles/Order.module.css";
import axios from "axios";

const Order = ({ order }) => {
  const base = 0;
  const getRow = index => {
    if (index - base < 1) return styles.done;
    if (index - base === 1) return styles.inProcess;
    if (index - base > 1) return styles.undone;
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.thead}>
              <th className={styles.td}>OrderId</th>
              <th className={styles.td}>Customer</th>
              <th className={styles.td}>Address</th>
              <th className={styles.td}>Total</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            <tr className={styles.tr}>
              <td className={styles.orderId}>{order._id}</td>
              <td className={styles.customer}>{order.customer}</td>
              <td className={styles.address}>{order.address}</td>
              <td className={styles.total}>${order.total}</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.order}>
          <div className={getRow(0)}>
            <Image src={"/img/paid.png"} width={30} height={30} alt="" />
            <span>Payment</span>
            <Image
              className={styles.check}
              src={"/img/checked.png"}
              width={20}
              height={20}
              alt=""
            />
          </div>

          <div className={getRow(1)}>
            <Image src={"/img/bake.png"} width={30} height={30} alt="" />
            <span>Preparing</span>
            <Image
              className={styles.check}
              src={"/img/checked.png"}
              width={20}
              height={20}
              alt=""
            />
          </div>

          <div className={getRow(2)}>
            <Image src={"/img/bike.png"} width={30} height={30} alt="" />
            <span>On The Way</span>
            <Image
              className={styles.check}
              src={"/img/checked.png"}
              width={20}
              height={20}
              alt=""
            />
          </div>

          <div className={getRow(3)}>
            <Image src={"/img/delivered.png"} width={30} height={30} alt="" />
            <span>Deliverd</span>
            <Image
              className={styles.check}
              src={"/img/checked.png"}
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.heading}>ORDER SUMMARY</h1>
        <p className={styles.summary}>
          <b>Subtotal:</b>${order.total}
        </p>
        <p className={styles.summary}>
          <b>Discount:</b>00.00
        </p>
        <p className={styles.summary}>
          <b>Total:</b>${order.total}
        </p>
        <button className={styles.btn}> PAID</button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/order/${params.id}`);

  return {
    props: {
      order: res.data,
    },
  };
};

export default Order;
