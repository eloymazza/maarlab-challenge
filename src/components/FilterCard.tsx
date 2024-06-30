import React from "react";
import { Filter, FilterOption } from "../store/types";
import {
	Card,
	FilterCheckbox,
	FilterContainer,
	FilterTitle,
	OptionsContainer,
} from "../styles/components/FilterSidebarStyled";

type FilterCardProps = {
	key: string;
	title: string;
	options: FilterOption[];
	onFilterChange: (filterTitle: string, optionValue: string, isChecked: boolean) => void;
};

const FilterCard: React.FC<FilterCardProps> = ({ key, title, options, onFilterChange }) => {
	return (
		<Card key={key}>
			<FilterContainer>
				<FilterTitle>{title}</FilterTitle>
				<OptionsContainer>
					{options.map(({ value, label }) => {
						const identifier = title + label;
						return (
							<FilterCheckbox key={value}>
								<input
									type='checkbox'
									value={value}
									onChange={(e) => onFilterChange(title, value, e.target.checked)}
									data-testid={`checkbox-${value}`}
									id={identifier}
									name={identifier}
								/>
								<label htmlFor={identifier}>{label}</label>
							</FilterCheckbox>
						);
					})}
				</OptionsContainer>
			</FilterContainer>
		</Card>
	);
};

export default FilterCard;
