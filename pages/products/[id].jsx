import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import styles from "../../styles/Product.module.css";

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0);
  const [qty, setQty] = useState(1);
  const [extra, setExtra] = useState([]);
  const [price, setPrice] = useState(pizza.price[0]);

  const dispatch = useDispatch();

  const changePrice = number => {
    setPrice(price + number);
  };

  const handleSize = sizeIndex => {
    const dif = pizza.price[sizeIndex] - pizza.price[size];
    changePrice(dif);
    setSize(sizeIndex);
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, quantity: qty, extra, price }));
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtra(prev => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtra(extra.filter(extra => extra._id !== option._id));
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={pizza.img}
            alt={pizza.title}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.heading}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>

        <h3 className={styles.heading1}> Choose The Size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src={"/img/size.png"} alt=" " layout="fill" />
            <span className={styles.text}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src={"/img/size.png"} alt=" " layout="fill" />
            <span className={styles.text}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src={"/img/size.png"} alt=" " layout="fill" />
            <span className={styles.text}>Large</span>
          </div>
        </div>
        <div className={styles.additional}>
          <h3 className={styles.heading1}> Choose Additional Ingredients</h3>
          <div className={styles.checkWrapper}>
            {pizza.extraOptions.map(option => (
              <div key={option._id} className={styles.checkGroup}>
                <input
                  type="checkbox"
                  name="double"
                  id={option.text}
                  onChange={e => handleChange(e, option)}
                />
                <label htmlFor={option.text}>{option.text}</label>
              </div>
            ))}
          </div>
        </div>
        <input
          type="number"
          name="number"
          id="number"
          defaultValue={1}
          onChange={e => setQty(+e.target.value)}
          className={styles.number}
        />
        <button className={styles.btn} onClick={handleClick}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/product/${params.id}`);
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;
