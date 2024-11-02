import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faBars,
  faTimes, // Import the close icon
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 1rem;
  top: 0;
  z-index: 1000;
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 15px 0;
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: #b8860b;
  font-style: italic;
  font-family: "Playfair Display", serif;

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    text-decoration: none;
    color: #20b2aa;
    font-size: 1rem;
    font-family: "Lato", sans-serif;
    transition: color 0.3s, transform 0.3s;
    font-weight: 500;

    &:hover {
      color: #2e8b57;
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    background: white;
    padding: 80px 2rem 2rem;
    gap: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    a {
      font-size: 1.2rem;
      text-align: center;
      padding-bottom: 10rem;
    }
  }
`;

const CloseButton = styled(FontAwesomeIcon)`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #b8860b;
  position: absolute;
  top: 20px;
  right: 20px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 1.125rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const CartLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b8860b;
  border-radius: 10%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 50px;
  height: 30px;
  color: #ffffff;
  transition: background-color 0.3s, transform 0.3s;
  position: relative;

  &:hover {
    background-color: #2e8b57;
    transform: scale(1.1);
  }

  span {
    position: absolute;
    top: -5px;
    right: -10px;
    background-color: ${({ count }) => (count > 0 ? "#32cd32" : "#ff6347")};
    color: #ffffff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: bold;
  }
`;

const FavoritesLink = styled(Link)`
  color: #b8860b;
  transition: color 0.3s, transform 0.3s;
  font-size: 1.5rem;

  &:hover {
    color: #2e8b57;
    transform: scale(1.1);
  }
`;

const HamburgerIcon = styled(FontAwesomeIcon)`
  display: none;
  font-size: 1.8rem;
  cursor: pointer;
  z-index: 200;
  color: #b8860b;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const cartCount = cartItems
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavContainer>
      <HamburgerIcon icon={faBars} onClick={toggleMenu} />
      <Logo>
        <Link to="/">Oudree</Link>
      </Logo>
      <NavLinks isOpen={isOpen}>
        <CloseButton icon={faTimes} onClick={toggleMenu} />
        <Link to="/" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/products" onClick={toggleMenu}>
          Collections
        </Link>
        <Link to="/about" onClick={toggleMenu}>
          Our Story
        </Link>
        <Link to="/contact" onClick={toggleMenu}>
          Contact
        </Link>
      </NavLinks>
      <IconContainer>
        <FavoritesLink to="/favorites">
          <FontAwesomeIcon icon={faHeart} />
        </FavoritesLink>
        <CartLink to="/checkout" count={cartCount}>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>{cartCount}</span>
        </CartLink>
      </IconContainer>
    </NavContainer>
  );
};

export default Nav;
