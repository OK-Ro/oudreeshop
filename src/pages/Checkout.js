import React, { useState } from "react";
import styled from "styled-components";
import {
  FaTimes as X,
  FaMinus as Minus,
  FaPlus as Plus,
  FaTrashAlt as Trash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import validPromoCodes from "../data/validPromoCodes";
import WeekDealsComponent from "../components/WeekDeals";
import { CreditCardIcon, ShoppingCartIcon } from "lucide-react";

const Container = styled.div`
  padding: 2rem;
  padding-top: 1rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 0.1rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: linear-gradient(135deg, #20b2aa, #2e8b57);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #fff;
  font-weight: 900;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0;
`;

const CloseButton = styled(X)`
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    color: #ffd700;
    transform: scale(1.2);
  }
`;

const HighlightText = styled.strong`
  font-weight: 900;
  color: #ffd700;
`;

const DiscountSection = styled.div`
  margin: 2rem 0;
  text-align: center;
  position: relative;
`;

const DiscountText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0.5rem;
  color: #2e8b57;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const RangeInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  outline: none;
  margin: 1rem 0;
  background: linear-gradient(
    100deg,
    #20b2aa 20%,
    #2e8b57 ${(props) => (props.value / props.max) * 100}%,
    #ddd ${(props) => (props.value / props.max) * 100}%,
    #ddd 100%
  );
  border: 1px solid #ffd700;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background 0.5s ease-in-out, border-color 0.5s ease-in-out;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 30px;
    height: 30px;
    background: #ffd700;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 20s ease-in-out, box-shadow 0.5s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &::-webkit-slider-thumb:hover {
    background: #b8860b;
    transform: scale(1.2);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &::-moz-range-thumb {
    width: 30px;
    height: 30px;
    background: #b8860b;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 20s ease-in-out, box-shadow 0.5s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &::-moz-range-thumb:hover {
    background: #ffd700;
    transform: scale(1.2);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }


  }
`;

const TooltipContainer = styled.div`
  position: relative;
  width: 100%;
`;

const TooltipContent = styled.div`
  position: absolute;
  top: -30px;
  left: ${({ position }) => `${position}%`};
  transform: translateX(-50%);
  background-color: #ffd700;
  color: #20b2aa;
  font-weight: 900;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  font-size: 0.8rem;
  white-space: nowrap;
  transition: left 0.3s ease-in-out;
  border: 2px solid #2e8b57;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
    top: -25px;
  }
`;

const Tooltip = ({ value, max, content }) => {
  const position = Math.min(Math.max((value / max) * 100, 4), 95);
  return <TooltipContent position={position}>{content}</TooltipContent>;
};

const DiscountLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #888;
  margin-top: 0.5rem;
  position: relative;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-top: 0.1rem;
  }
`;

const discountColors = ["#20b2aa", "#2e8b57", "#b8860b"];

const DiscountLabel = styled.span`
  background-color: ${({ index }) =>
    discountColors[index % discountColors.length]};
  color: #fff;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
  margin-left: 8.5rem;

  &:hover {
    background-color: ${({ index }) =>
      discountColors[(index + 1) % discountColors.length]};
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const GiftLabel = styled(DiscountLabel)`
  background-color: #b8860b;
  color: #fff;

  &:hover {
    background-color: #ffd700;
  }
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CartItemDetails = styled.div`
  display: flex;
  flex: 1;
  margin-left: 1rem;
`;

const ItemDetails = styled.div`
  flex: 1;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  color: #20b2aa;
  margin: 0;
  font-weight: 900;
`;

const ItemCategory = styled.p`
  font-size: 0.9rem;
  color: #b8860b;
  margin: 0.2rem 0;
  font-weight: 500;
`;

const PriceAndControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 0.5rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.span`
  font-size: 1.1rem;
  color: #b8860b;
  font-weight: bold;
  margin-left: 3rem;
`;

const ItemOriginalPrice = styled.span`
  font-size: 0.7rem;
  color: #ff4500;
  text-decoration: line-through;
  margin-right: 0.5rem;
  font-weight: 400;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #e74c3c;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #c0392b;
  }
`;

const QuantityBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border: 2px solid #b8860b;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 35px;
  height: 38px;
  background-color: #fff;
  border: none;
  border-right: 1px solid #b8860b;
  cursor: pointer;
  color: #333;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: #20b2aa;
    color: #fff;
  }

  &:last-child {
    border-right: none;
  }
`;

const QuantityDisplay = styled.span`
  background-color: #fff;
  padding: 0.5rem 1rem;
  border-right: 1px solid #b8860b;
  font-weight: bold;
  color: #333;
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f0f8ff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  border: 2px solid #20b2aa;
`;

const TotalLabel = styled.span`
  color: #2e8b57;
  margin-right: auto;
`;

const TotalPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TotalPrice = styled.span`
  color: #ff4500;
`;

const Savings = styled.span`
  font-size: 1rem;
  color: #2e8b57;
  margin-bottom: 0.5rem;
`;

const PromoSection = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #20b2aa, #2e8b57);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #fff;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(135deg, #2e8b57, #20b2aa);
    transform: translateY(-5px);
  }
`;

const PromoInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const PromoInput = styled.input`
  width: 50rem;
  padding: 0.75rem;
  border: 1px solid #b8860b;
  border-radius: 5px;
  box-shadow: none;
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
  margin-right: 2rem;

  &:focus {
    background-color: #f0f8ff;
    border-color: #20b2aa;
    outline: none;
  }
`;

const ApplyButton = styled.button`
  background-color: #b8860b;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ffd700;
    transform: translateY(-2px);
  }
`;

const Message = styled.p`
  margin-top: 0.5rem;
  color: ${({ success }) => (success ? "#28a745" : "#dc3545")};
  font-weight: bold;
  text-align: center;
  background-color: ${({ success }) => (success ? "#d4edda" : "#f8d7da")};
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const ButtonBase = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 1.5rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #20b2aa;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 2rem;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  svg {
    margin-right: 0.5rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.2);
  }
`;

const ContinueShoppingButton = styled(ButtonBase)`
  background: linear-gradient(135deg, #f0f8ff, #b0e0e6);
  color: #333;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CheckoutButton = styled(ButtonBase)`
  background: linear-gradient(135deg, #20b2aa, #2e8b57);
  color: #fff;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s, opacity 0.5s;
    opacity: 0;
  }

  &:focus::after {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    transition: transform 0s, opacity 0s;
  }
`;

const Checkout = () => {
  const { cartItems, updateCartItemQuantity, removeCartItem } = useCart();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const handleDecreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCartItemQuantity(id, currentQuantity - 1);
    } else {
      removeCartItem(id);
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return subtotal - (subtotal * discountPercentage) / 100;
  };

  const calculateSavings = () => {
    const originalTotal = cartItems.reduce(
      (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
      0
    );
    return originalTotal - calculateTotal();
  };

  const savings = calculateSavings();
  const continueShopping = () => {
    navigate("/");
  };

  const proceedToCheckout = () => {
    navigate("/payment");
  };

  const applyPromoCode = () => {
    if (validPromoCodes[promoCode]) {
      const discount = validPromoCodes[promoCode];
      setDiscountPercentage(discount);
      setDiscountMessage(`Discount of ${discount}% applied!`);
      setDiscountApplied(true);
    } else {
      setDiscountMessage("Invalid promo code.");
      setDiscountApplied(false);
    }
  };

  const total = calculateTotal();
  const discountThresholds = [50, 100];
  const discountValues = [5, 10];
  const maxThreshold = discountThresholds[discountThresholds.length - 1];
  const currentDiscountIndex = discountThresholds.findIndex(
    (threshold) => total < threshold
  );
  const currentDiscount =
    currentDiscountIndex === -1
      ? discountValues[discountValues.length - 1]
      : discountValues[currentDiscountIndex];
  const nextThreshold =
    currentDiscountIndex === -1
      ? null
      : discountThresholds[currentDiscountIndex];
  const amountToNextDiscount = nextThreshold ? nextThreshold - total : 0;

  return (
    <Container>
      <Header>
        <Title>Shopping Cart</Title>
        <CloseButton size={24} />
      </Header>

      <DiscountSection>
        {total >= maxThreshold ? (
          <DiscountText>Your gift has been added!</DiscountText>
        ) : (
          <>
            <p>
              Add{" "}
              <HighlightText>€{amountToNextDiscount.toFixed(2)}</HighlightText>{" "}
              more for
            </p>
            <DiscountText>{currentDiscount}% DISCOUNT</DiscountText>
          </>
        )}
        <div>
          <TooltipContainer>
            <Tooltip
              value={total}
              max={maxThreshold}
              content={`€${total.toFixed(2)}`}
            />
          </TooltipContainer>
          <RangeInput
            type="range"
            min="0"
            max={maxThreshold}
            value={(total / maxThreshold) * 80 + 0.2 * maxThreshold}
            readOnly
          />
          <DiscountLabels>
            {discountValues.map((value, index) => (
              <DiscountLabel key={index} index={index}>
                -{value}%
              </DiscountLabel>
            ))}
            <GiftLabel>GIFT</GiftLabel>
          </DiscountLabels>
        </div>
      </DiscountSection>

      {cartItems.map((item) => (
        <CartItem key={item.id}>
          <ItemImage src={item.image} alt={item.name} />
          <CartItemDetails>
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemCategory>{item.category}</ItemCategory>
            </ItemDetails>
            <PriceAndControlsContainer>
              <PriceContainer>
                {item.originalPrice && item.originalPrice > item.price && (
                  <ItemOriginalPrice>
                    €{item.originalPrice.toFixed(2)}
                  </ItemOriginalPrice>
                )}
                <ItemPrice>€{item.price.toFixed(2)}</ItemPrice>
              </PriceContainer>
              <ControlsContainer>
                <DeleteButton onClick={() => removeCartItem(item.id)}>
                  <Trash size={16} />
                </DeleteButton>
                <QuantityBox>
                  <QuantityButton
                    onClick={() =>
                      handleDecreaseQuantity(item.id, item.quantity)
                    }
                  >
                    <Minus size={16} />
                  </QuantityButton>
                  <QuantityDisplay>{item.quantity}</QuantityDisplay>
                  <QuantityButton
                    onClick={() =>
                      updateCartItemQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <Plus size={16} />
                  </QuantityButton>
                </QuantityBox>
              </ControlsContainer>
            </PriceAndControlsContainer>
          </CartItemDetails>
        </CartItem>
      ))}

      <TotalSection>
        <TotalLabel>Total</TotalLabel>
        <TotalPriceContainer>
          {savings > 0 && <Savings>You saved: €{savings.toFixed(2)}</Savings>}
          <TotalPrice>€{total.toFixed(2)}</TotalPrice>
        </TotalPriceContainer>
      </TotalSection>

      <PromoSection>
        <p>Enter discount code</p>
        <PromoInputContainer>
          <PromoInput
            type="text"
            placeholder="Enter your discount code here"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <ApplyButton onClick={applyPromoCode}>Apply</ApplyButton>
        </PromoInputContainer>
        {discountMessage && (
          <Message success={discountApplied}>{discountMessage}</Message>
        )}
      </PromoSection>

      <WeekDealsComponent />

      <ActionButtonsContainer>
        <ContinueShoppingButton onClick={continueShopping}>
          <ShoppingCartIcon size={20} />
          Continue Shopping
        </ContinueShoppingButton>
        <CheckoutButton onClick={proceedToCheckout}>
          <CreditCardIcon size={20} />
          CHECKOUT
        </CheckoutButton>
      </ActionButtonsContainer>
    </Container>
  );
};

export default Checkout;
