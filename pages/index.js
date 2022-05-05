import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Features from "../components/Features";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

export default function Home({ pizzaList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Maru</title>
        <meta name="description" content=" The best pizza in ansan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Features />
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/product/");
  return {
    props: {
      pizzaList: res.data,
    },
  };
};
