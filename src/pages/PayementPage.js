import React, { useState } from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";

const PaymentContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #20b2aa, #2e8b57);
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #2e8b57;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PaymentPage = () => {
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [selectedBank, setSelectedBank] = useState("");

  const banks = [
    "ABN AMRO",
    "ING",
    "Rabobank",
    "SNS Bank",
    "ASN Bank",
    "RegioBank",
    "Triodos Bank",
    "Van Lanschot",
    // Add more banks as needed
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === "ideal" && !selectedBank) {
      alert("Please select a bank for iDEAL payment.");
      return;
    }
    // Handle payment processing here
    alert(`Payment submitted using ${paymentMethod}!`);
  };

  return (
    <PaymentContainer>
      <Title>Payment Details</Title>
      <ItemList>
        {cartItems.map((item) => (
          <Item key={item.id}>
            <span>{item.name}</span>
            <span>€{item.price.toFixed(2)}</span>
          </Item>
        ))}
      </ItemList>
      <Form onSubmit={handleSubmit}>
        <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="creditCard">Credit Card</option>
          <option value="ideal">iDEAL</option>
          <option value="paypal">PayPal</option>
          <option value="bankTransfer">Bank Transfer</option>
        </Select>
        {paymentMethod === "creditCard" && (
          <>
            <Input type="text" placeholder="Card Number" required />
            <Input type="text" placeholder="Expiry Date (MM/YY)" required />
            <Input type="text" placeholder="CVV" required />
          </>
        )}
        {paymentMethod === "ideal" && (
          <Select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            required
          >
            <option value="">Select your bank</option>
            {banks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </Select>
        )}
        <SubmitButton type="submit">Submit Payment</SubmitButton>
      </Form>
    </PaymentContainer>
  );
};

export default PaymentPage;
