import { create } from "zustand";
import { getHotels } from "../api/api";
import { Filter, Hotel, Marker, SortOrder, StarOption } from "./types";
import { filterData } from "./FilterData";

interface State {
	hotels: Hotel[];
	discoveredHotels: Hotel[];
	hotelsDisplayedInList: Hotel[];
	hotelsDisplayedOnMap: Hotel[];
	currentPage: number;
	itemsPerPage: number;
	isLoading: boolean;
	orderLabel: string;
	starOptions: StarOption[];
	popularOptions: string[];
	popularOptionsToggled: string[];
	starOptionsChecked: number[];
	markers: Marker[];
	hasMore: boolean;
	availableFilters: Filter[];
	selectedFilters: { [key: string]: Set<string> };
	sortOrder: SortOrder;
	fetchHotels: () => void;
	fetchMore: () => Promise<void>;
	setLoading: (loading: boolean) => void;
	updateSelectedFilters: (filterTitle: string, optionValue: string, isChecked: boolean) => void;
	filterHotelsByMapView: (bounds: mapboxgl.LngLatBounds) => void;

	// getStarOptions: () => void;
	// toggleStarOptionChecked: (id: number) => void;
	// togglePopularOption: (option: string) => void;
	// totalPageCount: () => number;
	// setPage: () => void;
	setMarkers: () => void;
	applyFilters: () => void;
	sortHotelsDisplayedInList: () => void;
	updateSortOrder: (order: SortOrder) => void;
	onSortOrderChange: (order: SortOrder) => void;
	// sortByKey: (key: "finalPrice" | "star", order: "asc" | "desc", label: string) => void;
}

export const useHotelsStore = create<State>((set, get) => ({
	hotels: [],
	discoveredHotels: [],
	hotelsDisplayedInList: [],
	hotelsDisplayedOnMap: [],
	currentPage: 1,
	itemsPerPage: 4,
	isLoading: true,
	orderLabel: "Ordenar por",
	sortOrder: "asc",
	starOptions: [],
	starOptionsChecked: [],
	popularOptions: ["WIFI", "TV", "Breakfast", "Free Parking", "Gym", "Spa"],
	popularOptionsToggled: [],
	featuresChecked: [],
	markers: [],
	hasMore: true,
	availableFilters: filterData,
	selectedFilters: {},
	fetchHotels: async () => {
		const { itemsPerPage, currentPage } = get();
		const data: Hotel[] = await getHotels();
		const hotels = data.map((item) => ({ ...item, id: crypto.randomUUID() }));
		const hotelsInThisPage = hotels.slice(0, itemsPerPage * currentPage);
		set({
			isLoading: false,
			hotels,
			discoveredHotels: hotelsInThisPage,
			hotelsDisplayedInList: hotelsInThisPage,
			hotelsDisplayedOnMap: hotelsInThisPage,
			hasMore: hotels.length > itemsPerPage * currentPage,
		});
		set({ currentPage: currentPage + 1 });
	},
	fetchMore: async () => {
		const { hotels, itemsPerPage, currentPage } = get();
		const hotelsInThisPage = hotels.slice(0, itemsPerPage * currentPage);
		set({
			discoveredHotels: hotelsInThisPage,
			hotelsDisplayedOnMap: hotelsInThisPage,
			hotelsDisplayedInList: hotelsInThisPage,
			hasMore: hotels.length > itemsPerPage * currentPage,
		});
		set({ currentPage: currentPage + 1 });
	},
	setMarkers: () => {
		const { hotelsDisplayedOnMap } = get();
		const markers: Marker[] = hotelsDisplayedOnMap.map((item) => ({
			id: crypto.randomUUID(),
			position: [item.coordinates.latitude, item.coordinates.longitude],
			text: `${item.finalPrice}`,
			content: item,
		}));
		set({ markers });
	},
	setLoading: (loading) => {
		set({ isLoading: loading });
	},
	filterHotelsByMapView: (bounds) => {
		const { hotelsDisplayedOnMap } = get();
		const filtered = hotelsDisplayedOnMap.filter((hotel) => {
			const lat = hotel.coordinates.latitude;
			const lng = hotel.coordinates.longitude;
			return bounds.getWest() < lng && lng < bounds.getEast() && bounds.getSouth() < lat && lat < bounds.getNorth();
		});
		set({ hotelsDisplayedInList: filtered });
	},
	applyFilters: () => {
		const { selectedFilters, discoveredHotels } = get();
		let filteredHotels = [...discoveredHotels];
		Object.keys(selectedFilters).forEach((filterTitle) => {
			const filterValues = Array.from(selectedFilters[filterTitle]);
			filteredHotels = filteredHotels.filter((hotel) => {
				if (filterTitle === "Stars") {
					return filterValues.includes(hotel.star.toString());
				}
				if (filterTitle === "Price Range") {
					if (filterValues.includes("under-100") && hotel.finalPrice < 100) return true;
					if (filterValues.includes("under-200") && hotel.finalPrice < 200) return true;
					if (filterValues.includes("under-300") && hotel.finalPrice < 300) return true;
					return false;
				}
				return true;
			});
		});

		set({ hotelsDisplayedOnMap: filteredHotels });
		set({ hotelsDisplayedInList: filteredHotels });
	},
	updateSelectedFilters: (filterTitle, optionValue, isChecked) => {
		const { selectedFilters } = get();
		if (isChecked) {
			if (!selectedFilters[filterTitle]) {
				selectedFilters[filterTitle] = new Set();
			}
			selectedFilters[filterTitle].add(optionValue);
		} else {
			selectedFilters[filterTitle]?.delete(optionValue);
			if (selectedFilters[filterTitle]?.size === 0) {
				delete selectedFilters[filterTitle];
			}
		}
		set({ selectedFilters });
	},
	updateSortOrder: (order) => {
		set({ sortOrder: order });
	},
	sortHotelsDisplayedInList: () => {
		const { hotelsDisplayedInList, sortOrder } = get();
		const sortedList = [...hotelsDisplayedInList];
		if (sortOrder === "desc") {
			sortedList.sort((a, b) => b.finalPrice - a.finalPrice);
		} else {
			sortedList.sort((a, b) => a.finalPrice - b.finalPrice);
		}
		set({ hotelsDisplayedInList: sortedList });
	},
	onSortOrderChange: (order) => {
		get().updateSortOrder(order);
		get().sortHotelsDisplayedInList();
	},
	// setPage: () => {
	// 	const { listedHotels, itemsPerPage, displayedHotels, currentPage, totalPageCount } = get();
	// 	const totalPages = totalPageCount();
	// 	if (currentPage <= totalPages) {
	// 		set({ isLoading: true });
	// 		const startIndex = (currentPage - 1) * itemsPerPage;
	// 		const endIndex = startIndex + itemsPerPage;
	// 		const newDisplayedHotels = listedHotels.slice(startIndex, endIndex);
	// 		setTimeout(() => {
	// 			set({ isLoading: false });
	// 			set({
	// 				currentPage: currentPage + 1,
	// 				displayedHotels: [...displayedHotels, ...newDisplayedHotels],
	// 			});
	// 		}, 1000);
	// 	}
	// },
	// totalPageCount: () => {
	// 	const { listedHotels, itemsPerPage } = get();
	// 	return Math.ceil(listedHotels.length / itemsPerPage);
	// },
	// sortByKey: (key, order, label) => {
	// 	const { listedHotels, itemsPerPage } = get();
	// 	const sortedItems: Hotel[] = listedHotels.sort((a, b) => {
	// 		const x: number = a[key];
	// 		const y: number = b[key];
	// 		if (order === "desc") {
	// 			return x > y ? -1 : x < y ? 1 : 0;
	// 		} else {
	// 			return x < y ? -1 : x > y ? 1 : 0;
	// 		}
	// 	});
	// 	set({
	// 		listedHotels: sortedItems,
	// 		orderLabel: label,
	// 		displayedHotels: sortedItems.slice(0, itemsPerPage),
	// 		currentPage: 2,
	// 		order: order,
	// 	});
	// },
	// getStarOptions: () => {
	// 	const { hotels } = get();

	// 	const counts = new Array(5).fill(null).map((_, index) => ({
	// 		id: index + 1,
	// 		label: `${index + 1}-star hotel`,
	// 		count: 0,
	// 	}));

	// 	hotels.forEach((item) => {
	// 		counts[item.star - 1].count++;
	// 	});

	// 	counts.sort((a, b) => b.id - a.id);
	// 	set({ starOptions: counts });
	// },
	// toggleStarOptionChecked: (id) => {
	// 	const { starOptionsChecked } = get();
	// 	const currentChecked = new Set(starOptionsChecked);
	// 	if (currentChecked.has(id)) {
	// 		currentChecked.delete(id);
	// 	} else {
	// 		currentChecked.add(id);
	// 	}
	// 	set({ starOptionsChecked: Array.from(currentChecked) });
	// },
	// togglePopularOption: (option) => {
	// 	const { popularOptionsToggled } = get();
	// 	const currentChecked = new Set(popularOptionsToggled);
	// 	if (currentChecked.has(option)) {
	// 		currentChecked.delete(option);
	// 	} else {
	// 		currentChecked.add(option);
	// 	}
	// 	set({ popularOptionsToggled: Array.from(currentChecked) });
	// },
	// filterHotels: () => {
	// 	const { hotels, starOptionsChecked, popularOptionsToggled, setMarkers } = get();
	// 	if (starOptionsChecked.length > 0 || popularOptionsToggled.length > 0) {
	// 		const filtered = hotels.filter(
	// 			(hotel) =>
	// 				starOptionsChecked.includes(hotel.star) ||
	// 				hotel.features.some((feature) => popularOptionsToggled.includes(feature))
	// 		);
	// 		set({ listedHotels: filtered, currentPage: 2 });
	// 		set({ displayedHotels: filtered.slice(0, 5) });
	// 	} else {
	// 		set({ listedHotels: hotels, currentPage: 2 });
	// 		set({ displayedHotels: hotels.slice(0, 5) });
	// 	}
	// 	setMarkers();
	// },
}));
