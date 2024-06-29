import React from "react";
import HotelCard from "./HotelCard";
import { ListContainer, CardWrapper } from "../styles/components/HotelListStyled";
import { useHotelsStore } from "../store/useHotelsStore";

const HotelList = () => {
	const { fetchMore, isLoading, setLoading, hasMore, hotelsDisplayedInList, applyFilters, sortHotelsDisplayedInList } =
		useHotelsStore();

	const fetchAgain = async () => {
		setLoading(true);
		setTimeout(async () => {
			// TODO: manage erorres
			await fetchMore();
			applyFilters();
			sortHotelsDisplayedInList();
			setLoading(false);
		}, 2000);
	};

	const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
		if (isLoading) return;
		const target = e.target as HTMLDivElement;
		const scrollOnBottom = target.scrollHeight - target.scrollTop === target.clientHeight;
		if (!scrollOnBottom) return;
		if (!hasMore) return console.log("No hay más hoteles");
		fetchAgain();
	};

	return (
		<ListContainer onScroll={(e) => handleScroll(e)}>
			{hotelsDisplayedInList.map((hotel, index) => (
				<CardWrapper key={index}>
					<HotelCard hotel={hotel} />
				</CardWrapper>
			))}
			{isLoading && (
				<div
					style={{
						position: "fixed",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "400px",
						top: "35%",
						left: "calc(50% - (400px/2))",
						fontSize: "1.75rem",
						fontWeight: "bold",
						height: "200px",
						color: "white",
						backgroundColor: "black",
						zIndex: 500,
					}}
				>
					Loading...
				</div>
			)}
		</ListContainer>
	);
};

export default HotelList;
