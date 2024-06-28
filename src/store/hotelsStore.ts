import { create } from "zustand";
import { getHotels } from "../api/api";
import { Hotel, Marker, StarOption } from "./types";
// import { Hotel, Marker, StarOption } from "./types";
// import { getData } from "@/lib/utils";

interface State {
	hotels: Hotel[];
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
	order: "asc" | "desc";
	hasMore: boolean;
	fetchHotels: () => void;
	fetchMore: () => Promise<void>;
	setLoading: (loading: boolean) => void;
	// filterHotels: () => void;
	filterHotelsByMapView: (bounds: mapboxgl.LngLatBounds) => void;
	// getStarOptions: () => void;
	// toggleStarOptionChecked: (id: number) => void;
	// togglePopularOption: (option: string) => void;
	// totalPageCount: () => number;
	// setPage: () => void;
	setMarkers: () => void;
	// sortByKey: (key: "finalPrice" | "star", order: "asc" | "desc", label: string) => void;
}

export const useHotelsStore = create<State>((set, get) => ({
	hotels: [],
	hotelsDisplayedInList: [],
	hotelsDisplayedOnMap: [],
	currentPage: 1,
	itemsPerPage: 4,
	isLoading: true,
	orderLabel: "Ordenar por",
	starOptions: [],
	starOptionsChecked: [],
	popularOptions: ["WIFI", "TV", "Breakfast", "Free Parking", "Gym", "Spa"],
	popularOptionsToggled: [],
	featuresChecked: [],
	markers: [],
	hasMore: true,
	order: "asc",
	fetchHotels: async () => {
		const { itemsPerPage, currentPage } = get();
		const data: Hotel[] = await getHotels();
		const hotels = data.map((item) => ({ ...item, id: crypto.randomUUID() }));
		set({
			isLoading: false,
			hotels,
			hotelsDisplayedInList: hotels.slice(0, itemsPerPage * currentPage),
			hotelsDisplayedOnMap: hotels.slice(0, itemsPerPage * currentPage),
			hasMore: hotels.length > itemsPerPage * currentPage,
		});
		set({ currentPage: currentPage + 1 });
	},
	fetchMore: async () => {
		const { hotels, itemsPerPage, currentPage } = get();
		set({
			hotelsDisplayedOnMap: hotels.slice(0, itemsPerPage * currentPage),
			// TODO: manage errors
			hotelsDisplayedInList: hotels.slice(0, itemsPerPage * currentPage),
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
		console.log("filtered", filtered);
		set({ hotelsDisplayedInList: filtered });
		// set({ displayedHotels: filtered.slice(0, 5) });
		// setMarkers();
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
