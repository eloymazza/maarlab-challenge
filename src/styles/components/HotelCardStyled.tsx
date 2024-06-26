import styled from 'styled-components';


export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  /* max-width: 600px; */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
  margin: 1rem;
`;

export const ImageContainer = styled.div`
  flex: 1;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const InfoContainer = styled.div`
  flex: 2;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const HotelName = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: #343a40;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

export const StarRating = styled.div`
  margin-right: 0.5rem;
`;

export const Distance = styled.p`
  margin: 0.5rem 0;
  color: #6c757d;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

export const FinalPrice = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #28a745;
  margin-right: 0.5rem;
`;

export const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #6c757d;
  text-decoration: line-through;
  margin-left: auto;
`;

export const FeaturesContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
`;

export const Feature = styled.span`
  background-color: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
`;

export const Button = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  outline: none;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: scale(0.95);
  }
`;