'use client';
import { useEffect, useState } from 'react';
import styles from '../app/styles/page.module.css';
import Filter from './components/Filter';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
export default function Home() {
  const allFilters = [
    {
      name: 'Categories',
      type: 'normal',
      options: [
        { name: 'All', value: 'all' },
        { name: 'Shirts', value: 'shirts' },
        { name: 'Pants', value: 'pants' },
        { name: 'Shoes', value: 'shoes' },
        { name: 'Accessories', value: 'accessories' },
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
  const [selectedFilters, setSelectedFilters] = useState([])
  const router = useRouter();
  const params = useSearchParams();
  const categoriesParams = params.get('categories');
  useEffect(() => {

    fetch('https://dummyjson.com/products?limit=10')
      .then(res => {
        res.json().then(allProducts => {
          setProducts(allProducts.products)
        })
      })
      .then(console.log);

  }, [])

  const onFilterChange = (name, value) => {
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
    setSelectedFilters(allSelectedFilters)
  }

  const onCross = (value) => {
    setSelectedFilters(selectedFilters.filter(item => item !== value))
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
  }
  return (
    <main className={styles.main}>
      <div>
        <Filter filters={filters} clearAll={clearAll} onCross={onCross} selectedFilters={selectedFilters} onFilterChange={onFilterChange} />
      </div>
      <div className={styles.productContainer}>
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
    </main>
  )
}
