import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Nav from "./components/Nav";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import ItemCard from "./pages/ItemCard"; // Ensure this import is correct
import styled from "styled-components";
import PaymentPage from "./pages/PayementPage";

const Container = styled.div`
  padding: 2rem 6rem;

  @media (max-width: 768px) {
    padding: 1rem;
    width: 100%;
  }
`;

function App() {
  return (
    <Container>
      <CartProvider>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/item/:id" element={<ItemCard />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </Container>
  );
}

export default App;
