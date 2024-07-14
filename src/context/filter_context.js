import React, { useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/filter_reducer';
import { url_back } from '../utils/constants';
import {
  LOAD_OFFERS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_OFFERS,
  UPDATE_FILTERS,
  FILTER_OFFERS,
  CLEAR_FILTERS,
} from '../actions';
import { useOffersContext } from './offers_context';
import defaultImage from '../assets/hortalsoft.png';
import { images } from '../utils/constants';

const initialState = {
  filtered_offers: [],
  all_offers: [],
  products: [], 
  offers: [],   
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    category: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
  },
};

const FilterContext = React.createContext();


export const FilterProvider = ({ children }) => {
  const { offers: allOffers, products: allProducts } = useOffersContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchOffersAndProducts = async () => {
      try {
        const [productsRes, offersRes] = await Promise.all([
          axios.get(`${url_back}inventory/products`),
          axios.get(`${url_back}inventory/offers`),
        ]);

        const products = productsRes.data;
        const offers = offersRes.data;

        const offersWithProductNames = offers.map((offer) => {
          const product = products.find((p) => p.id === offer.productId);
          const productImage = product ? images[`${product.name.toLowerCase()}.jpg`] : defaultImage;

          return {
            ...offer,
            productName: product ? product.name : 'Unknown Product',
            productImage: productImage || defaultImage,
          };
        });

        dispatch({ type: LOAD_OFFERS, payload: offersWithProductNames });
      } catch (err) {
        console.error('Error fetching offers and products:', err);
      }
    };
    fetchOffersAndProducts();
  }, []);

  useEffect(() => {
    dispatch({ type: FILTER_OFFERS });
    dispatch({ type: SORT_OFFERS });
  }, [state.sort, state.filters, allOffers]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === 'category') {
      value = e.target.textContent;
    }
    if (name === 'price') {
      value = Number(value);
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

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
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
