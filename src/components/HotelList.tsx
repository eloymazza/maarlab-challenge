import React, { useState } from "react";
import HotelCard from "./HotelCard";
import { ListContainer, CardWrapper } from "../styles/components/HotelListStyled";
import { Hotel } from "../store/types";
import { useHotelsStore } from "../store/hotelsStore";

interface HotelListProps {
	hotels: Hotel[];
}

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
	const { fetchMore, isLoading, setLoading, hasMore } = useHotelsStore();

	const fetchAgain = async () => {
		setLoading(true);
		setTimeout(async () => {
			// TODO: manage erorres
			await fetchMore();
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
			{hotels.map((hotel, index) => (
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
