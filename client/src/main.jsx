import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import {AuthUser} from "./components"; // Make sure this path is correct
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";
import "./auth.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TransactionsProvider>
        <Routes>
          <Route path="/" element={<AuthUser />} />
          <Route path="/authUser" element={<App />} />
        </Routes>
      </TransactionsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
