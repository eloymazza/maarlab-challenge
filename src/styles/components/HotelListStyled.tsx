import styled, { keyframes } from 'styled-components';

// Animaciones
export const pulse = keyframes`
  0% {
    transform: scale(1);
    background-color: #007bff;
  }
  50% {
    transform: scale(1.05);
    background-color: #0056b3;
  }
  100% {
    transform: scale(1);
    background-color: #007bff;
  }
`;

// Estilos
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 100vh;
  overflow-y: auto; 
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const LoadMoreButton = styled.button`
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
    animation: ${pulse} 0.6s infinite;
  }

  &:active {
    transform: scale(0.95);
  }
`;
