'use client';
import { useEffect, useState } from 'react';
import styles from '../app/styles/page.module.css';
import Filter from './components/Filter';
import FilterIcon from './icons/FilterIcon';
import Cross from './icons/Cross';
import Chevronup from './icons/Chevronup';
import Funnel from './icons/Funnerl';
export default function Home() {
  const allFilters = [
    {
      name: 'Categories',
      type: 'normal',
      options: [
        { name: 'Loading...', value: 'all' },
      ],
      selected: []
    },
    {
      name: 'Filter by price',
      type: 'range',
      range: [10, 4000],
      selected: [10, 400]
    },
    {
      name: 'Filter by color',
      type: 'color',
      options: [
        { name: 'Red', value: 'red' },
        { name: 'Blue', value: 'blue' },
        { name: 'Green', value: 'green' },
        { name: 'Yellow', value: 'yellow' },
        { name: 'Black', value: 'black' },
        { name: 'White', value: 'white' },
      ],
      selected: []
    },
    {
      name: 'Filter by size',
      type: 'size',
      options: [
        { name: 'S', value: 's' },
        { name: 'M', value: 'm' },
        { name: 'L', value: 'l' }
      ],
      selected: []
    },
  ]
  const [filters, setFilters] = useState(allFilters)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState([])
  const [sort, setSort] = useState({

  })


  function sortProductsAZ() {
    const sortedProducts = products.slice().sort((a, b) => a.title.localeCompare(b.title));
    setProducts(sortedProducts)
    setSort({
      ...sort,
      sortAZ: true,
      sortZA: false

    })
  }

  function sortProductsZA() {
    const sortedProducts = products.slice().sort((a, b) => b.title.localeCompare(a.title));
    setProducts(sortedProducts)
    setSort({
      ...sort,
      sortZA: true,
      sortAZ: false
    })
  }

  function sortProductsByPriceLowToHigh() {
    const sortedProducts = products.slice().sort((a, b) => a.price - b.price);
    setProducts(sortedProducts)
    setSort({
      ...sort,
      sortPriceLowToHigh: true,
      sortPriceHighToLow: false
    })
  }

  function sortProductsByPriceHighToLow() {
    const sortedProducts = products.slice().sort((a, b) => b.price - a.price);
    setProducts(sortedProducts)
    setSort({
      ...sort,
      sortPriceHighToLow: true,
      sortPriceLowToHigh: false
    })
  }

  // Sort products by ID ascending
  function sortProductsByIDAscending() {
    const sortedProducts = products.slice().sort((a, b) => a.id - b.id);
    setProducts(sortedProducts)
    setSort({
      ...sort,
      sortIDAscending: true,
      sortIDDescending: false
    })
  }

  // Sort products by ID descending
  function sortProductsByIDDescending() {
    const sortedProducts = products.slice().sort((a, b) => b.id - a.id);
    setProducts(sortedProducts)
    setSort({
      ...sort,
      sortIDDescending: true,
      sortIDAscending: false
    })
  }


  console.log('====================================');
  console.log("products", products);
  console.log('====================================');
  async function fetchData(category) {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${category}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data for category ${category}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchAllCategories(categories) {
    const promises = categories.map(category => fetchData(category));

    try {
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      console.error(error);
    }
  }

  const getData = () => {
    fetch('https://dummyjson.com/products?limit=10')
      .then(res => {
        res.json().then(allProducts => {
          setProducts(allProducts.products)
        })
      })
      .then(console.log);
  }
  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json().then(categories => {
        const allCategories = filters.map(filter => {
          if (filter.name === 'Categories') {
            return {
              ...filter,
              options: [
                ...categories.map(category => ({ name: category, value: category }))
              ]
            }
          }
          return filter
        }
        )
        setFilters(allCategories)
        setCategories(categories)
      }))
      .then(console.log);

    getData()

  }, [])

  const getFiltersList = (recFilters) => {
    return recFilters.filter(filter => categories.includes(filter))
  }
  const onFilterChange = async (name, value) => {
    const updatedFilters = filters.map(filter => {
      if (filter.name === name) {
        if (typeof value !== 'string') {
          return {
            ...filter,
            selected: value
          }
        } else {
          return {
            ...filter,
            selected: filter.selected.includes(value) ?
              filter.selected.filter(item => item !== value) : [...filter.selected, value]
          }
        }

      }
      return filter
    })
    setFilters(updatedFilters)
    const allSelectedFilters = updatedFilters.map((filter) => {
      return filter.selected
    }).flat().filter(item => typeof item == 'string')

    const filtersList = getFiltersList(allSelectedFilters)
    const data = await fetchAllCategories(filtersList);
    const filteredProducts = data.flatMap(category => category.products);

    if (filteredProducts?.length !== 0) {
      setProducts(filteredProducts)
    } else {
      getData()
    }
    setSelectedFilters(allSelectedFilters)
  }

  const onCross = async (value) => {
    const remainingFilters = selectedFilters.filter(item => item !== value)
    setSelectedFilters(remainingFilters)
    const data = await fetchAllCategories(remainingFilters);
    const filteredProducts = data.flatMap(category => category.products);
    setProducts(filteredProducts)
  }

  const clearAll = () => {
    const updatedFilters = filters.map(filter => {
      return {
        ...filter,
        selected: []
      }
    })
    setFilters(updatedFilters)
    setSelectedFilters([])
    getData()
  }
  return (
    <main className={styles.main}>
      <div className={`${styles.filtersList}  ${isExpanded && styles.filtersListVisible}`}>
        <div onClick={() => setIsExpanded(!isExpanded)} className={styles.filterIcon}>
          {isExpanded ? <Cross /> : <FilterIcon />}
        </div>
        <Filter filters={filters} clearAll={clearAll} onCross={onCross} selectedFilters={selectedFilters} onFilterChange={onFilterChange} />
      </div>
      {products?.length ? <div>

        <div className={styles.productContainer}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.headerBold}>
                <div className={styles.funnel}>
                  <Funnel />
                </div>
                FILTER
              </div>
              <div className={styles.headerNormal}>Home / Shop</div>
            </div>
            <div className={styles.headerLeft}>
            <div onClick={sort.sortAZ ? sortProductsZA : sort.sortZA ? sortProductsAZ : sortProductsZA} className={styles.headerBold}>PRICE {sort.sortAZ ? 'Z-A' : sort.sortZA ? 'Z-A' : 'A-Z'}
                <div style={{ transform: sort.sortZA && "rotate(0deg)" }} className={styles.chevDown}>
                  <Chevronup fill='black' />
                </div>
              </div>
              <div onClick={sort.sortPriceLowToHigh ? sortProductsByPriceHighToLow : sort.sortPriceHighToLow ? sortProductsByPriceLowToHigh : sortProductsByPriceHighToLow} className={styles.headerBold}>PRICE {sort.sortPriceLowToHigh ? 'Hight to Low' : sort.sortPriceHighToLow ? 'Low to High' : 'Hight to Low'}
                <div style={{ transform: sort.sortPriceHighToLow && "rotate(0deg)" }} className={styles.chevDown}>
                  <Chevronup fill='black' />
                </div>
              </div>
              <div onClick={sort.sortIDAscending ? sortProductsByIDDescending : sort.sortIDDescending ? sortProductsByIDAscending : sortProductsByIDDescending} className={styles.headerBold}>SORT BY {sort.sortIDAscending ? 'OLDNESS' : sort.sortIDDescending ? 'NEWNNESS' : 'OLDNESS'}
                <div style={{ transform: sort.sortIDDescending && "rotate(0deg)" }} className={styles.chevDown}>
                  <Chevronup fill='black' />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.productContainerInner}>
            {
              products.map((product) => (
                <div key={product.id} className={styles.product}>
                  <img src={product?.thumbnail} alt="Picture of the author" />
                  <div className={styles.colorsContainer}>
                    {
                      ['red', 'blue', 'orange']?.map(color => (
                        <div key={color} className={styles.color} style={{ backgroundColor: color }}></div>
                      ))
                    }
                  </div>
                  <div className={styles.content}>
                    <div className={styles.title}>{product?.title}</div>
                    <div className={styles.price}>${product?.price}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
        :
        <div className={styles.loadingContainer}>Loading...</div>
      }
    </main>
  )
}
