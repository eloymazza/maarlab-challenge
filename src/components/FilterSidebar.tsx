import React, { useState } from "react";
import { FilterContainer, Card, FilterTitle, FilterCheckbox } from "../styles/components/FilterSidebarStyled";
import { useHotelsStore } from "../store/useHotelsStore";

// Definición de tipos
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
	// onFilterChange: (filterTitle: string, optionValue: string, isChecked: boolean) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters }) => {
	const { updateSelectedFilters, applyFilters } = useHotelsStore();
	const handleFilterChange = (filterTitle: string, optionValue: string, isChecked: boolean) => {
		updateSelectedFilters(filterTitle, optionValue, !!isChecked);
		applyFilters();
	};

	return (
		<>
			{filters.map((filter) => (
				<Card key={filter.title}>
					<FilterContainer>
						<FilterTitle>{filter.title}</FilterTitle>
						{filter.options.map(({ value, label }) => (
							<FilterCheckbox key={value}>
								<input
									type='checkbox'
									value={value}
									onChange={(e) => handleFilterChange(filter.title, value, e.target.checked)}
									data-testid={`checkbox-${value}`}
								/>
								<label>{label}</label>
							</FilterCheckbox>
						))}
					</FilterContainer>
				</Card>
			))}
		</>
	);
};

export default FilterSidebar;
