import React from "react";
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

function PizzaList({ pizzaList }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Best Pizza in Town</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At fugit quos
        ipsum voluptatem tempora aliquam, animi amet saepe facilis dolorum nisi
        vitae mollitia accusamus repellat nesciunt quae modi, vel aspernatur.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map(pizza => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}

export default PizzaList;
