import React from "react";
import styles from "../styles/PizzaCard.module.css";
import Image from "next/image";
import Link from "next/link";

function PizzaCard({ pizza }) {
  return (
    <div className={styles.container}>
      <Link href={`/products/${pizza._id}`} passHref>
        <div className={styles.imgWrapper}>
          <Image src={pizza.img} alt=" " layout="fill" />
        </div>
      </Link>
      <h2 className={styles.title}>{pizza.title}</h2>
      <span className={styles.price}>${pizza.price[0]}</span>
      <p className={styles.desc}>{pizza.desc}</p>
    </div>
  );
}

export default PizzaCard;
