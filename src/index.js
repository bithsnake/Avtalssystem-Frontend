import React from "react";
import { BrowserRouter, MemoryRouter} from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
// import { CookiesProvider } from "react-cookie";
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render(
  <BrowserRouter >
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
