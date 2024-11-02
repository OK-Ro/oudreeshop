import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import products from "../data/products";
import { useCart } from "../context/CartContext";

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 1.5rem;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: #333;
  margin: 0.5rem 0;
  font-family: "Playfair Display", serif;
`;

const Price = styled.p`
  font-size: 1.8rem;
  color: #b8860b;
  font-weight: bold;
  margin: 0.5rem 0;
`;

const Rating = styled.div`
  font-size: 1.2rem;
  color: #ffcc00;
  margin: 0.5rem 0;
`;

const Details = styled.div`
  text-align: left;
  width: 100%;
  max-width: 500px;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const Category = styled.p`
  font-size: 0.9rem;
  color: #00796b;
  margin-bottom: 0.5rem;
  font-style: italic;
`;

const Ingredients = styled.p`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const BuyButton = styled.button`
  background-color: #20b2aa;
  color: #fff;
  font-size: 1.1rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #2e8b57;
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ItemCard = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <Container>
      <ImageContainer>
        <Image src={product.image} alt={product.name} />
      </ImageContainer>
      <Header>
        <Title>{product.name}</Title>
        <Price>${product.price.toFixed(2)}</Price>
        <Rating>⭐⭐⭐⭐☆</Rating>
      </Header>
      <Details>
        <Description>{product.description}</Description>
        <Category>Category: {product.category}</Category>
        {product.ingredients && Array.isArray(product.ingredients) && (
          <Ingredients>
            Ingredients: {product.ingredients.join(", ")}
          </Ingredients>
        )}
      </Details>
      <BuyButton onClick={() => handleAddToCart(product)}>
        Add to Cart
      </BuyButton>
    </Container>
  );
};

export default ItemCard;
