"use client";

import FilterSidebar from '@/src/components/FilterSidebar';
import Header from '@/src/components/Header';
import HotelList from '@/src/components/HotelList';
import LayoutSearch from '@/src/components/LayoutSearch';
import MapView from '@/src/components/MapView';
import useHotels from '@/src/hooks/useHotels';
import React from 'react';


const Search = () => {
  const {
    hotels,
    filteredHotels,
    filters,
    sortOrder,
    hasMore,
    handleLoadMore,
    handleSortChange,
    handleFilterChange,
  } = useHotels();

  return (
    <LayoutSearch
      sidebar={<FilterSidebar filters={filters} onFilterChange={handleFilterChange} />}
      map={<MapView hotels={filteredHotels} />}
    >
      <Header onSortChange={handleSortChange} />
      <HotelList hotels={filteredHotels} onLoadMore={handleLoadMore} hasMore={hasMore} />
    </LayoutSearch>
  );
};

export default Search;
