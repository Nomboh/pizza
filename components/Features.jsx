import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/Features.module.css";

function Features() {
  const [index, setIndex] = useState(0);
  const images = [
    "/img/features.jpeg",
    "/img/features1.jpeg",
    "/img/features2.jpeg",
  ];

  const handleSlide = direction => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === "r") {
      setIndex(index !== 2 ? index + 1 : 1);
    }
  };

  console.log(index);
  return (
    <div className={styles.container}>
      <div
        className={styles.arrowWrapper}
        style={{ left: 0 }}
        onClick={() => handleSlide("l")}
      >
        <Image
          src={"/img/arrowl.png"}
          alt="arrowl"
          layout={"fill"}
          objectFit="contain"
        />
      </div>
      <div className={styles.wrapper}>
        {images.map((img, i) => (
          <div
            className={styles.imgContainer}
            key={i}
            style={{ transform: `translateX(${index * -100}vw)` }}
          >
            <Image
              src={img}
              layout={"fill"}
              alt="feature"
              objectFit="contain"
            />
          </div>
        ))}
      </div>
      <div
        className={styles.arrowWrapper}
        style={{ right: 0 }}
        onClick={() => handleSlide("r")}
      >
        <Image
          src={"/img/arrowr.png"}
          alt="arrowr"
          layout={"fill"}
          objectFit="contain"
        />
      </div>
    </div>
  );
}

export default Features;
