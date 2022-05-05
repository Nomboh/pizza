import Image from "next/image";
import React from "react";
import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image
          src="/img/bg.png"
          alt=" "
          layout="fill"
          objectFit="contain"
          style={{ zIndex: 100 }}
        />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h1 className={styles.moto}>
            Good Pizza is What we know how to do Best{" "}
          </h1>
        </div>
        <div className={styles.card}>
          <h2 className={styles.heading}>Find our resturants</h2>
          <div className={styles.address}>
            <p>
              1654 Don Road #304
              <br />
              Suwon, 850220
              <br />
              (+82)104894162
            </p>
          </div>

          <div className={styles.address}>
            <p>
              2356 Wadong Phamarcy #324
              <br />
              Ansan, 940860
              <br />
              (+82)1089420182
            </p>
          </div>
          <div className={styles.address}>
            <p>
              4286 Kings Reoad #821
              <br />
              Pyeongteak, 450850
              <br />
              (+82)104894162
            </p>
          </div>
          <div className={styles.address}>
            <p>
              1654 US Military Camp #482
              <br />
              Songtan, 459120
              <br />
              (+82)104812566
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <h2 className={styles.heading}> Working Hours </h2>
          <div className={styles.hours}>
            <p>
              Monday To Friday
              <br />
              9:00 - 22:00
            </p>
          </div>

          <div className={styles.hours}>
            <p>
              Satuday To Sunday
              <br />
              12:00 - 22:00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
