import { Provider } from "react-redux";
import Layout from "../components/Layout";
import store from "../redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout childrens={<Component {...pageProps} />} />
    </Provider>
  );
}

export default MyApp;
