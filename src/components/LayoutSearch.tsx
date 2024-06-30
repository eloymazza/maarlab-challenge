import React, { ReactNode } from "react";
import {
	LayoutContainer,
	HeaderContainer,
	MainContainer,
	Sidebar,
	MainContent,
	MapContainer,
} from "../styles/components/LayoutSearchStyled"; // Importa los estilos desde LayoutStyles.tsx

// Definición de props
interface LayoutProps {
	children: ReactNode;
	sidebar: ReactNode;
	map: ReactNode;
}

// Componente Layout
const Layout: React.FC<LayoutProps> = ({ children, sidebar, map }) => {

	return (
		<LayoutContainer>
			<HeaderContainer>
				<h1>Hotel Finder</h1>
			</HeaderContainer>
			<MainContainer>
				<Sidebar>{sidebar}</Sidebar>
				<MainContent>{children}</MainContent>
				<MapContainer>{map}</MapContainer>
			</MainContainer>
		</LayoutContainer>
	);
};

export default Layout;
