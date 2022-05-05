import axios from "axios";
import React, { useState } from "react";
import styles from "../../styles/Admin.module.css";
import Image from "next/dist/client/image";

const Admin = ({ products, orders }) => {
  console.log(products, orders);
  const stages = ["Preparing", "On the Way", "Deliverd"];
  const [pdt, setPdt] = useState(products);
  const [newOrders, setNewOrders] = useState(orders);

  const handleDelete = id => {
    axios.delete(`http://localhost:3000/api/product/${id}`);
    setPdt(pdt.filter(p => p._id !== id));
  };

  const handleStatus = async id => {
    const item = newOrders.filter(i => i._id === id)[0];
    const currentStatus = item.status;
    const res = await axios.put(`http://localhost:3000/api/order/${id}`, {
      status: currentStatus + 1,
    });

    setNewOrders([res.data, ...newOrders.filter(o => o._id !== id)]);
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.heading}>Products</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.thead}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {pdt.map(product => (
              <tr key={product._id} className={styles.tr}>
                <td className={styles.imgContainer}>
                  <Image src={product.img} alt=" " layout="fill" />
                </td>
                <td className={styles.id}>{product._id.slice(0, 8)}...</td>
                <td className={styles.title}>{product.title}</td>
                <td className={styles.price}>${product.price[0]}</td>
                <td className={styles.actions}>
                  <button className={styles.action}>Edit</button>
                  <button
                    className={styles.action}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <h1 className={styles.heading}>Orders</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.thead}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {newOrders.map(order => (
              <tr key={order._id} className={styles.tr}>
                <td className={styles.id}>{order._id.slice(0, 8)}...</td>
                <td className={styles.customer}>{order.customer}</td>
                <td className={styles.total}>${order.total}</td>
                <td className={styles.payment}>
                  {order.method === 0 ? <span>Cash</span> : <span>PayPal</span>}
                </td>
                <td className={styles.status}>{stages[order.status]}</td>
                <td className={styles.actions}>
                  <button
                    disabled={stages[order.status] === "Deliverd"}
                    className={styles.next}
                    onClick={() => handleStatus(order._id)}
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/product/");
  const res2 = await axios.get("http://localhost:3000/api/order/");

  return {
    props: {
      products: res.data,
      orders: res2.data,
    },
  };
};

export default Admin;
