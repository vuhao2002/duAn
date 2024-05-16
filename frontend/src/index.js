import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./Redux/store";
import "react-toastify/dist/ReactToastify.css";
import Toast from "./LoadingError/Toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toast />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
