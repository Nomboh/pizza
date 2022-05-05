import React from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/dist/client/link";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartCount = useSelector(state => state.cart.cartCount);
  return (
    <div className={styles.container}>
      <div className={styles.items}>
        <div className={styles.callWrapper}>
          <div className={styles.callButton}>
            <Image
              src="/img/telephone.png"
              layout="fill"
              alt="phone"
              objectFit="cover"
            />
          </div>
        </div>

        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW</div>
          <div className={styles.text}>01048651436</div>
        </div>
      </div>
      <div className={styles.items}>
        <ul className={styles.lists}>
          <Link href="/" passHref>
            <li className={styles.list}>Homepage</li>
          </Link>
          <li className={styles.list}>Product</li>
          <li className={styles.list}>Menu</li>
          <Image src={"/img/quen.png"} width={100} height={50} />
          <li className={styles.list}>Event</li>
          <li className={styles.list}>Blog</li>
          <li className={styles.list}>Contact</li>
        </ul>
      </div>
      <div className={styles.items}>
        <Link href={"/cart"} passHref>
          <div className={styles.cart}>
            <Image src={"/img/cart.png"} width={32} height={32} alt="cart" />
            <span className={styles.counter}>{cartCount}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
