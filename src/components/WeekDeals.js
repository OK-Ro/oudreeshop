import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  FaChevronLeft as ChevronLeft,
  FaChevronRight as ChevronRight,
} from "react-icons/fa";
import products from "../data/products";
import { useCart } from "../context/CartContext";

const WeekDealsComponent = () => {
  const { addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const weekDeals = products.filter((product) => product.isDeal);

  const handleAddDealToCart = (deal) => {
    addToCart({ ...deal, price: deal.price });
    scrollRight();
  };

  const scrollLeft = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : weekDeals.length - 1;
      return newIndex;
    });
  };

  const scrollRight = useCallback(() => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex < weekDeals.length - 1 ? prevIndex + 1 : 0;
      return newIndex;
    });
  }, [weekDeals.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 3000);

    return () => clearInterval(interval);
  }, [scrollRight]);

  return (
    <Container>
      <Header>
        <Title>WEEK DEALS</Title>
        <Subheader>20% DISCOUNT</Subheader>
      </Header>
      <LeftButton onClick={scrollLeft}>
        <ChevronLeft size={24} />
      </LeftButton>
      <DealsContainer>
        {weekDeals.map((deal, index) => (
          <SingleDealContainer
            key={deal.id}
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              width: "100%",
            }}
          >
            <Ribbon>20% OFF</Ribbon>
            <ProductImage src={deal.image} alt={deal.name} />
            <ProductDetails>
              <ProductName>{deal.name}</ProductName>
              <CategoryName>{deal.category}</CategoryName>
            </ProductDetails>
            <ProductInfo>
              <PricingContainer>
                {deal.originalPrice && (
                  <OriginalPrice>
                    €{deal.originalPrice.toFixed(2)}
                  </OriginalPrice>
                )}
                <DiscountedPrice>€{deal.price.toFixed(2)}</DiscountedPrice>
              </PricingContainer>
              <ActionContainer>
                <AddToCartButton onClick={() => handleAddDealToCart(deal)}>
                  ADD TO CART
                </AddToCartButton>
              </ActionContainer>
            </ProductInfo>
          </SingleDealContainer>
        ))}
      </DealsContainer>
      <RightButton onClick={scrollRight}>
        <ChevronRight size={24} />
      </RightButton>
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, #e0f7fa, #ffffff);
  border-radius: 1rem;
  box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #ffeb3b;
  padding: 1rem;
  border-radius: 0.75rem;

  @media (max-width: 480px) {
    margin-bottom: 1rem;
    padding: 0.5rem;
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: #d32f2f;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1875rem;
  text-shadow: 0.125rem 0.125rem #ffcc00;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    letter-spacing: 0.125rem;
  }
`;

const Subheader = styled.p`
  font-size: 1rem;
  color: #ffffff;
  background-color: #d32f2f;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin: 0.5rem 0;
  font-style: italic;
  font-weight: bold;
  text-shadow: 0.0625rem 0.0625rem #b71c1c;

  @media (max-width: 480px) {
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
  }
`;

const DealsContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
  overflow: hidden;
  border-radius: 0.9375rem;
`;

const SingleDealContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 0.9375rem;
  box-shadow: 0 0.375rem 0.75rem rgba(0, 0, 0, 0.1);
  transition: transform 0.9s ease-in-out, box-shadow 0.3s ease;
  flex-shrink: 0;
  position: relative;

  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    height: 21vh;
  }
`;

const Ribbon = styled.div`
  position: absolute;
  top: 0.625rem;
  left: -0.625rem;
  background-color: #d32f2f;
  color: #ffffff;
  padding: 0.3125rem 0.9375rem;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  transform: rotate(-45deg);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
  }
`;

const ProductImage = styled.img`
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin-right: 1.5rem;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    width: 160px;
    height: 160px;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const ProductDetails = styled.div`
  flex: 1;
  text-align: center;

  @media (max-width: 480px) {
    text-align: right;
    margin-top: 0;
    align-self: flex-start;
    position: absolute;
    top: 0;
    right: 0;
    padding-top: 2rem;
    padding-right: 1rem;
  }
`;

const ProductName = styled.h4`
  font-size: 1.5rem;
  font-weight: bold;
  color: #b8860b;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const CategoryName = styled.p`
  font-size: 1.1rem;
  color: #00796b;
  margin: 0.2rem 0 0.5rem 0;
  font-style: italic;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ProductInfo = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 480px) {
    align-items: flex-end;

    text-align: right;
    position: absolute;

    right: 0;
    padding-top: 2rem;
  }
`;

const PricingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    margin-bottom: 1rem;
    margin-top: 3rem;
  }
`;

const OriginalPrice = styled.p`
  font-size: 0.7rem;
  color: #ff4500;
  text-decoration: line-through;
  margin-right: 0.5rem;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const DiscountedPrice = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  color: #00796b;
  margin: 0;
  margin-left: 1rem;

  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-right: 0.8rem;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media (max-width: 480px) {
    justify-content: flex-start;
  }
`;

const AddToCartButton = styled.button`
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #00796b, #004d40);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #004d40, #00796b);
    transform: translateY(-0.1875rem);
    box-shadow: 0 0.375rem 0.5rem rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(-0.0625rem);
    box-shadow: 0 0.1875rem 0.3125rem rgba(0, 0, 0, 0.2);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.5s, opacity 0.5s;
    opacity: 0;
  }

  &:focus::after {
    transform: scale(1);
    opacity: 1;
    transition: transform 0s, opacity 0s;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  z-index: 1;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #b8860b;
  border-radius: 50%;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const LeftButton = styled(NavigationButton)`
  left: 0.5rem;
`;

const RightButton = styled(NavigationButton)`
  right: 0.5rem;
`;

export default WeekDealsComponent;
