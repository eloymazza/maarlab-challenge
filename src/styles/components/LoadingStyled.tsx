import styled from "styled-components";

export const LoadingStyled = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  top: 35%;
  left: calc(50% - (400px/2));
  font-size: 1.75rem;
  font-weight: bold;
  height: 200px;
  color: white;
  background-color: black;
  z-index: 500;
  border-radius: 15px;
  text-transform: uppercase;
  @media (max-width: 768px) {
    width: 90%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
