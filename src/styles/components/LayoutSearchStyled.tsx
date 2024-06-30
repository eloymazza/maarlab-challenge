import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f9fa;
  @media (max-width: 768px) {
    height: 100%;
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #0c0c0c;
  color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const MainContainer = styled.main`
  display: flex;
  flex: 1;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 .1rem;
  }
`;

export const Sidebar = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-right: 1px solid #dee2e6;
  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #dee2e6;
    padding: 0 1rem;
  }
`;

export const MainContent = styled.div`
  width: 60%;
  padding: 1rem;
  overflow-y: auto;
  @media (max-width: 768px) {
    width: 100%;
    overflow-y: hidden;
  }
`;

export const MapContainer = styled.div`
  width: 50%;
  padding: 1rem;
  border-left: 1px solid #dee2e6;
  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
    border-top: 1px solid #dee2e6;
    height: 35vh;
    width: 100%;
    z-index: 1000;
    & canvas {
      width: 100% !important;
      }
  }
`;

export const HomeButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
