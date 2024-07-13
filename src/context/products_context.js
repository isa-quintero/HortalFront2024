import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/products_reducer';
import { offers_url as url } from '../utils/constants';
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_OFFERS_BEGIN,
  GET_OFFERS_SUCCESS,
  GET_OFFERS_ERROR,
  GET_SINGLE_OFFER_BEGIN,
  GET_SINGLE_OFFER_SUCCESS,
  GET_SINGLE_OFFER_ERROR,
} from '../actions';

const initialState = {
  isSidebarOpen: false,
  offers_loading: false,
  offers_error: false,
  offers: [],
  single_offer_loading: false,
  single_offer_error: false,
  single_offer: {},
};

const OffersContext = React.createContext();

export const OffersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchOffers = async (url) => {
    dispatch({ type: GET_OFFERS_BEGIN });
    try {
      const response = await axios.get(url);
      const offers = response.data;
      dispatch({ type: GET_OFFERS_SUCCESS, payload: offers });
    } catch (error) {
      console.error('Error fetching offers:', error);
      dispatch({ type: GET_OFFERS_ERROR });
    }
  };

  const fetchSingleOffer = async (url) => {
    dispatch({ type: GET_SINGLE_OFFER_BEGIN });
    try {
      const response = await axios.get(url);
      const singleOffer = response.data;
      dispatch({ type: GET_SINGLE_OFFER_SUCCESS, payload: singleOffer });
    } catch (error) {
      console.error('Error fetching single offer:', error);
      dispatch({ type: GET_SINGLE_OFFER_ERROR });
    }
  };

  useEffect(() => {
    fetchOffers(url);
  }, []);

  return (
    <OffersContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleOffer,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};

export const useOffersContext = () => {
  return useContext(OffersContext);
};
