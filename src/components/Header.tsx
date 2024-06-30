// Header.tsx
import React from "react";
import { HeaderContainer, SortSelect } from "../styles/components/HeaderStyled";
import { useHotelsStore } from "../store/useHotelsStore";
import { SortOrder } from "../store/types";
const Header: React.FC = () => {
	const { onSortOrderChange } = useHotelsStore();
	return (
		<HeaderContainer>
			<h1 style={{ color: "black" }}>Hoteles</h1>
			<SortSelect onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}>
				<option value='asc'>Price: Low to High</option>
				<option value='desc'>Price: High to Low</option>
			</SortSelect>
		</HeaderContainer>
	);
};

export default Header;
