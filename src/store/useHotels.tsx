import { useState, useEffect } from "react";
import { Hotel } from "./types";
import { filterData } from "./FilterData";

const useHotels = () => {
	const [hotels, setHotels] = useState<Hotel[]>([]);
	const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
	const [sortOrder, setSortOrder] = useState("price-asc");
	const [activeFilters, setActiveFilters] = useState<{ [key: string]: Set<string> }>({});
	const [filters, setFilters] = useState(filterData);

	// useEffect(() => {
	// 	filterAndSortHotels();
	// }, [hotels, sortOrder, activeFilters]);

	const filterAndSortHotels = () => {
		let filteredHotels = hotels.filter((hotel) => {
			return Object.keys(activeFilters).every((filterKey) => {
				const filterValues = Array.from(activeFilters[filterKey] || []);
				if (filterKey === "Stars") {
					return filterValues.includes(hotel.star.toString());
				}
				if (filterKey === "Price Range") {
					if (filterValues.includes("under-100") && hotel.finalPrice < 100) return true;
					if (filterValues.includes("under-200") && hotel.finalPrice < 200) return true;
					if (filterValues.includes("under-300") && hotel.finalPrice < 300) return true;
					return false;
				}
				return true;
			});
		});

		if (sortOrder === "price-asc") {
			filteredHotels.sort((a, b) => a.finalPrice - b.finalPrice);
		} else {
			filteredHotels.sort((a, b) => b.finalPrice - a.finalPrice);
		}

		setFilteredHotels(filteredHotels.slice(0, 5));
	};

	const handleSortChange = (value: string) => {
		// setSortOrder(value);
	};

	const handleFilterChange = (filterTitle: string, optionValue: string, isChecked: boolean) => {
		// setActiveFilters((prev) => {
		// 	const newFilters = { ...prev };
		// 	if (isChecked) {
		// 		if (!newFilters[filterTitle]) {
		// 			newFilters[filterTitle] = new Set();
		// 		}
		// 		newFilters[filterTitle].add(optionValue);
		// 	} else {
		// 		newFilters[filterTitle]?.delete(optionValue);
		// 		if (newFilters[filterTitle]?.size === 0) {
		// 			delete newFilters[filterTitle];
		// 		}
		// 	}
		// 	return newFilters;
		// });
	};

	return {
		// hotels,
		// filteredHotels,
		filters,
		// sortOrder,
		// handleSortChange,
		handleFilterChange,
	};
};

export default useHotels;
