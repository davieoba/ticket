import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTicket from "./pages/NewTicket";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./components/PrivateRoutes";
import Tickets from "./pages/Tickets";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tickets" element={<PrivateRoutes />}>
            <Route path="/tickets" element={<Tickets />} />
          </Route>
          <Route path="/new-ticket" element={<PrivateRoutes />}>
            <Route path="/new-ticket" element={<NewTicket />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
