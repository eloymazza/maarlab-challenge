"use client";

import FilterSidebar from "@/src/components/FilterSidebar";
import Header from "@/src/components/Header";
import HotelList from "@/src/components/HotelList";
import LayoutSearch from "@/src/components/LayoutSearch";
import MapView from "@/src/components/MapView";
import React from "react";
import { useHotelsStore } from "../store/useHotelsStore";

const Search = () => {
	const { availableFilters, fetchHotels, hotelsDisplayedOnMap } = useHotelsStore();

	React.useEffect(() => {
		fetchHotels();
	}, [fetchHotels]);

	return (
		<LayoutSearch
			sidebar={<FilterSidebar filters={availableFilters} />}
			map={<MapView hotels={hotelsDisplayedOnMap} />}
		>
			<HotelList />
		</LayoutSearch>
	);
};

export default Search;
