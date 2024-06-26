import React, { useEffect, useContext, useReducer } from 'react'
import axios from 'axios'
import reducer from '../reducers/filter_reducer'
import { url_back } from '../utils/constants';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',

    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    const fetchProductsAndOffers = async () => {
      try {
        const [productsRes, offersRes] = await Promise.all([
          axios.get(`${url_back}/inventory/products`),
          axios.get(`${url_back}/inventory/offers`)
        ]);

        const products = productsRes.data;
        const offers = offersRes.data;

        const productsWithOffers = products.map(product => {
          return {
            ...product,
            offers: offers.filter(offer => offer.productId === product.id)
          }
        })

        dispatch({ type: LOAD_PRODUCTS, payload: productsWithOffers })
      } catch (err) {
        console.error('Error fetching products and offers:', err)
      }
    }
    fetchProductsAndOffers();
  }, []);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
  }, [state.sort, state.filters, products])
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }
  const updateSort = (e) => {
    const value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: value })
  }
  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'category') {
      value = e.target.textContent
    }
    if (name === 'color') {
      value = e.target.dataset.color
    }
    if (name === 'price') {
      value = Number(value)
    }
    if (name === 'shipping') {
      value = e.target.checked
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
export const useFilterContext = () => {
  return useContext(FilterContext)
}
