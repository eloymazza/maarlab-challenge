"use client";

import FilterSidebar from "@/src/components/FilterSidebar";
import Header from "@/src/components/Header";
import HotelList from "@/src/components/HotelList";
import LayoutSearch from "@/src/components/LayoutSearch";
import MapView from "@/src/components/MapView";
import React from "react";
import { useHotelsStore } from "../store/hotelsStore";

const Search = () => {
	// const { filters, sortOrder, handleSortChange, handleFilterChange } = useHotels();

	const { fetchHotels, hotelsDisplayedOnMap, hotelsDisplayedInList } = useHotelsStore();

	React.useEffect(() => {
		fetchHotels();
	}, [fetchHotels]);

	return (
		<LayoutSearch
			// sidebar={<FilterSidebar filters={filters} onFilterChange={handleFilterChange} />}
			map={<MapView hotels={hotelsDisplayedOnMap} />}
		>
			{/* <Header onSortChange={handleSortChange} /> */}
			<HotelList hotels={hotelsDisplayedInList} />
		</LayoutSearch>
	);
};

export default Search;
