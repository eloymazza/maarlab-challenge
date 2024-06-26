import React, { useState } from 'react';
import { FilterContainer, Card, FilterTitle, FilterCheckbox } from '../styles/components/FilterSidebarStyled';

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
  onFilterChange: (filterTitle: string, optionValue: string, isChecked: boolean) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: Set<string> }>({});

  const handleCheckboxChange = (filterTitle: string, optionValue: string, isChecked: boolean) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (isChecked) {
        if (!newFilters[filterTitle]) {
          newFilters[filterTitle] = new Set();
        }
        newFilters[filterTitle].add(optionValue);
      } else {
        newFilters[filterTitle]?.delete(optionValue);
        if (newFilters[filterTitle]?.size === 0) {
          delete newFilters[filterTitle];
        }
      }
      onFilterChange(filterTitle, optionValue, isChecked);
      return newFilters;
    });
  };

  return (
    <>
      {filters.map((filter) => (
        <Card key={filter.title}>
          <FilterContainer>
            <FilterTitle>{filter.title}</FilterTitle>
            {filter.options.map((option) => (
              <FilterCheckbox key={option.value}>
                <input
                  type="checkbox"
                  value={option.value}
                  onChange={(e) => handleCheckboxChange(filter.title, option.value, e.target.checked)}
                  data-testid={`checkbox-${option.value}`}
                />
                <label>{option.label}</label>
              </FilterCheckbox>
            ))}
          </FilterContainer>
        </Card>
      ))}
    </>
  );
};

export default FilterSidebar;