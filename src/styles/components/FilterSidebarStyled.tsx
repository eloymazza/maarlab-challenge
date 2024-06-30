import styled from "styled-components";

export const FilterContainer = styled.div`
  margin-bottom: 1rem;
  color: black;
   @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;
export const OptionsContainer = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: .75rem;
  }
`;

export const Card = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  background-color: #fff;
  @media (max-width: 768px) {
    margin-bottom: .25rem;
    padding: 0.5 1rem;
  }
`;

export const FilterTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

export const FilterCheckbox = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  margin-bottom: 0.25rem;
  cursor: pointer;
`;
