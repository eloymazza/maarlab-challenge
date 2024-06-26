import React from "react";

import {
  CardContainer,
  ImageContainer,
  InfoContainer,
  Image,
  HotelName,
  RatingContainer,
  StarRating,
  Distance,
  PriceContainer,
  FinalPrice,
  OriginalPrice,
  FeaturesContainer,
  Feature,
  Button,
} from "../styles/components/HotelCardStyled";

// Definición de tipos
interface Hotel {
  name: string;
  finalPrice: number;
  originalPrice: number;
  star: number;
  features: string[];
  image: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <CardContainer>
      <ImageContainer>
        <Image src={hotel.image} alt={hotel.name} />
      </ImageContainer>
      <InfoContainer>
        <div>
          <HotelName>{hotel.name}</HotelName>
          <RatingContainer>
            <StarRating>{"⭐".repeat(hotel.star)}</StarRating>
            <span>{hotel.star}</span>
          </RatingContainer>
          <Distance>
            {hotel.coordinates.latitude.toFixed(2)} km from location
          </Distance>
          <PriceContainer>
            <FinalPrice>${hotel.finalPrice} pp</FinalPrice>
            {hotel.finalPrice < hotel.originalPrice && (
              <OriginalPrice>${hotel.originalPrice} pp</OriginalPrice>
            )}
          </PriceContainer>
        </div>
        <FeaturesContainer>
          {hotel.features.map((feature, index) => (
            <Feature key={index}>{feature}</Feature>
          ))}
        </FeaturesContainer>
        <Button>View details</Button>
      </InfoContainer>
    </CardContainer>
  );
};

export default HotelCard;
