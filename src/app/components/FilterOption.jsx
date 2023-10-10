'use client';
import React, { useState } from 'react';
import styles from '../styles/filterOption.module.css'
import ReactSlider from 'react-slider'
import Chevronup from '../icons/Chevronup';

const FilterOption = ({ filter, onFilterChange, selectedFilters }) => {
  const { name, type, options, range, selected } = filter;
  const [isExpanded, setIsExpanded] = useState(true)
  const handleFilterChange = value => {
    onFilterChange(name, value);
  };

  return (
    <div className={styles.option}>
      <div onClick={() => setIsExpanded(!isExpanded)} className={styles.optionHeader}>
        <h3 className={styles.filterHeading}>{name}</h3>
        <div className={isExpanded ? styles.chevronActive : styles.chevron}>
          <Chevronup />
        </div>
      </div>
      {(type === 'normal' || type === 'size') && (
        <div className={isExpanded ? styles.optionContainerActive : styles.optionContainer}>
          {options.map(option => (
            <label key={option.name} className={styles.container}>
              <p className={styles.filterName}>{option.name}</p>
              <input checked={selectedFilters?.includes(option.name)} onChange={() => handleFilterChange(option.name)} type="checkbox" />
              <span className={styles.checkmark}></span>
            </label>
          ))}
        </div>
      )}
      {type === 'range' && (
        <div className={isExpanded ? styles.optionContainerActive : styles.optionContainer}>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={[10, 400]}
            onChange={(e) => handleFilterChange(e)}
            min={range[0]}
            max={range[1]}
            renderThumb={(props, state) => <div {...props}></div>}
            minDistance={10}
          />
          <p className={styles.priceTag}>
            Price: <b>${selected[0]} - ${selected[1]}</b>
          </p>
        </div>
      )}
      {type === 'color' && (
        <div className={isExpanded ? styles.optionContainerActive : styles.optionContainer}>
          {options.map(option => (
            <label key={option.name} className={`${styles.container} ${styles.colorContainer}`}>
              <p>{option.name}</p>
              <input checked={selectedFilters?.includes(option.name)} onChange={() => handleFilterChange(option.name)} type="checkbox" />
              <span style={{ backgroundColor: option.value }} className={`${styles.checkmark} ${styles.colorCheckmark}`}></span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterOption;
