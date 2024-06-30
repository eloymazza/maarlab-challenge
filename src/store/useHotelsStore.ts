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
	// TODO: Aqui hay una dependencia de la libreria de mapas
	filterHotelsByMapView: (bounds: mapboxgl.LngLatBounds) => void;
	setMarkers: () => void;
	applyFilters: () => void;
	sortHotelsDisplayedInList: () => void;
	updateSortOrder: (order: SortOrder) => void;
	onSortOrderChange: (order: SortOrder) => void;
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
		const hotels = data.map((item) => ({ ...item, id: Math.random().toString() }));
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
		// TODO: this musy be a constant
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
}));
