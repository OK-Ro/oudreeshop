import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { FaCartArrowDown } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
    margin-top: 1rem;
  }
`;

const Header = styled.header`
  margin-bottom: 2rem;
  color: #20b2aa;
  background: linear-gradient(135deg, #20b2aa, #2e8b57);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 20%;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 50%;
    margin-bottom: 1rem;
    text-align: center;
    width: 100%;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    pointer-events: none;
    transform: translateX(-100%);
    transition: transform 0.5s ease-in-out;
  }

  &:hover:before {
    transform: translateX(100%);
  }
`;

const PageIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const VerticalLine = styled.div`
  width: 70px;
  height: 4px;
  background-color: #b8860b;
  margin-right: 1rem;

  @media (max-width: 768px) {
    width: 50px;
  }
`;

const PageNumber = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a202c;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const EmptyContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ContentContainer = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: #b8860b;
  margin-bottom: 1rem;
  text-align: left;
  font-weight: 500;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 0.9rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const GoToShopButton = styled(motion.button)`
  background: linear-gradient(135deg, #20b2aa, #2e8b57);
  color: #fff;
  border: 2px solid #b8860b;
  border-radius: 15px;
  padding: 1rem 4rem;
  cursor: pointer;
  font-weight: 900;
  font-size: 0.9rem;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #2e8b57, #20b2aa);
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 3rem;
    font-size: 0.8rem;
  }
`;

const Arrow = styled.span`
  display: inline-block;
  transition: transform 0.3s ease-in-out;
  font-size: 1.2rem;
  font-weight: 900;
  margin-left: 0.5rem;
  margin-top: 0.1rem;

  ${GoToShopButton}:hover & {
    transform: translateX(40px);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProductInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(32, 178, 170, 0.8);
  padding: 1rem;
  text-align: left;
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const FavoriteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${({ isFavorited }) => (isFavorited ? "#FFD700" : "#FFD700")};
  font-size: 1.8rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out,
    color 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
    color: #ffd700;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  border: 0;
  background-color: rgba(184, 134, 11, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid #fff;
  transition: all 0.3s ease-in-out;
  height: 35vh;

  &:hover {
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  }

  &:hover ${ProductInfo}, &:hover ${FavoriteIcon} {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    height: 30vh;
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 1rem;
  height: 100%;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  font-weight: 900;
  color: #ffffff;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProductDescription = styled.p`
  font-size: 0.875rem;
  color: #ffffff;
  margin: 0 0 2rem 0;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin: 0 0 1rem 0;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 900;
  color: #ffffff;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const BuyButton = styled.button`
  background-color: #20b2aa;
  color: #fff;
  font-size: 0.5rem;
  border: 2px solid #ffffff;
  border-radius: 15px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  font-weight: 900;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    background-color: #2e8b57;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 1rem;
    font-size: 0.4rem;
  }
`;

const ProductCard = () => {
  const [favorites, setFavorites] = useState({});
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  const handleButtonClick = () => {
    console.log("Navigating to shop...");
  };

  return (
    <Container>
      <PageIndicator>
        <VerticalLine />
        <PageNumber>02</PageNumber>
      </PageIndicator>
      <Header>
        <Title>Products.</Title>
      </Header>
      <MainGrid>
        {products.slice(0, 3).map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <Card>
              <ImageContainer>
                <Link to={`/item/${product.id}`}>
                  <ProductImage src={product.image} alt={product.name} />
                </Link>
                <FavoriteIcon
                  isFavorited={favorites[product.id]}
                  onClick={() => toggleFavorite(product.id)}
                >
                  {favorites[product.id] ? (
                    <MdFavorite />
                  ) : (
                    <MdFavoriteBorder />
                  )}
                </FavoriteIcon>
              </ImageContainer>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductDetails>
                  <ProductPrice>€{product.price.toFixed(2)}</ProductPrice>
                  <BuyButton onClick={() => addToCart(product)}>
                    ADD TO CART
                  </BuyButton>
                </ProductDetails>
              </ProductInfo>
            </Card>
          </motion.div>
        ))}
      </MainGrid>
      <MainGrid>
        <EmptyContainer>
          <ContentContainer>
            <InfoText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut Duis aute irure dolor in reprehenderit in voluptate velit
              eenim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </InfoText>
          </ContentContainer>
          <ButtonContainer>
            <GoToShopButton
              onClick={handleButtonClick}
              whileTap={{ scale: 0.95 }}
            >
              Go to Shop{" "}
              <Arrow>
                <FaCartArrowDown />
              </Arrow>
            </GoToShopButton>
          </ButtonContainer>
        </EmptyContainer>
        {products.slice(3, 5).map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <Card>
              <ImageContainer>
                <Link to={`/item/${product.id}`}>
                  <ProductImage src={product.image} alt={product.name} />
                </Link>
                <FavoriteIcon
                  isFavorited={favorites[product.id]}
                  onClick={() => toggleFavorite(product.id)}
                >
                  {favorites[product.id] ? (
                    <MdFavorite />
                  ) : (
                    <MdFavoriteBorder />
                  )}
                </FavoriteIcon>
              </ImageContainer>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductDetails>
                  <ProductPrice>€{product.price.toFixed(2)}</ProductPrice>
                  <BuyButton onClick={() => handleAddToCart(product)}>
                    ADD TO CART
                  </BuyButton>
                </ProductDetails>
              </ProductInfo>
            </Card>
          </motion.div>
        ))}
      </MainGrid>
    </Container>
  );
};

export default ProductCard;
