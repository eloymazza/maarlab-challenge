import React, { Fragment } from "react";
import { useHotelsStore } from "../store/useHotelsStore";
import FilterCard from "./FilterCard";

interface FilterOption {
	value: string;
	label: string;
}

interface Filter {
	title: string;
	options: FilterOption[];
}

interface FilterSidebarProps {
	filters: Filter[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters }) => {
	const { updateSelectedFilters, applyFilters } = useHotelsStore();
	const handleFilterChange = (filterTitle: string, optionValue: string, isChecked: boolean) => {
		updateSelectedFilters(filterTitle, optionValue, !!isChecked);
		applyFilters();
	};

	return (
		<>
			{filters.map(({ title, options }) => (
				<Fragment key={title}>
					<FilterCard  title={title} options={options} onFilterChange={handleFilterChange} />
				</Fragment>
			))}
		</>
	);
};

export default FilterSidebar;
