'use Client'
import React from 'react';
import FilterOption from './FilterOption';
import styles from '../styles/filter.module.css'
import Cross from '../icons/Cross';
const Filter = ({ filters, onFilterChange, selectedFilters, onCross, clearAll }) => {

  return (
    <div className={styles.filtersBar}>
      <div className={styles.headerContainer}>
        <p className={styles.refine}>REFINE</p>
        <p onClick={clearAll} className={styles.link}>Clear All</p>
      </div>
      {selectedFilters?.length !== 0 && <div className={styles.selectedFilterContainer}>
        {
          selectedFilters?.map((filter, index) => (
            <p key={filter} className={styles.selectedFilter}>
              <span onClick={() => onCross(filter)} className={styles.cross}>
                <Cross />
              </span><span>{filter}</span>
            </p>
          ))
        }
      </div>}
      {filters.map(filter => (
        <FilterOption
          key={filter.name}
          filter={filter}
          onFilterChange={onFilterChange}
          selectedFilters={selectedFilters}
        />
      ))}
    </div>
  );
};

export default Filter;
