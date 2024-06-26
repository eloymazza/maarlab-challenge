// LoginStyles.ts
import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
`;

export const LoginButton = styled.button`
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #0070f3;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;
