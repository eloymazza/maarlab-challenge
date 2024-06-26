import React from 'react';
import HotelCard from './HotelCard';
import { ListContainer, CardWrapper, LoadMoreButton } from '../styles/components/HotelListStyled';

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

interface HotelListProps {
  hotels: Hotel[];
  onLoadMore: () => void;
  hasMore: boolean; // Indica si hay más hoteles por cargar
}

const HotelList: React.FC<HotelListProps> = ({ hotels, onLoadMore, hasMore }) => {
  return (
    <ListContainer>
      {hotels.map((hotel, index) => (
        <CardWrapper key={index}>
          <HotelCard hotel={hotel} />
        </CardWrapper>
      ))}
      {hasMore && <LoadMoreButton onClick={onLoadMore}>Mostrar más</LoadMoreButton>}
    </ListContainer>
  );
};

export default HotelList;
