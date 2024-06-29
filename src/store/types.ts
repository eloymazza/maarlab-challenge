export interface Coordinates {
	latitude: number;
	longitude: number;
}

export interface Hotel {
	name: string;
	finalPrice: number;
	originalPrice: number;
	star: number;
	features: string[];
	image: string;
	coordinates: Coordinates;
	id?: string;
}

export interface StarOption {
	id: number;
	label: string;
	count: number;
}

export interface Marker {
	id: string;
	position: [number, number];
	text: string;
	content: Hotel;
}

export interface PriceFormatting {
	price: number;
	currency: "USD" | "EUR";
	locale: "us-US" | "es-ES";
}

export interface FilterOption {
	label: string;
	value: string;
}

export interface Filter {
	title: string;
	options: FilterOption[];
}

export type SortOrder = "asc" | "desc";
