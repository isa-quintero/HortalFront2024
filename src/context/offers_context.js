import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/offers_reducer';
import { single_farmer_url, single_product_url, offers_url as url } from '../utils/constants';
import { url_back } from '../utils/constants';
import { images } from '../utils/constants';
import defaultImage from '../assets/hortalsoft.png';
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
      console.log(singleOffer)
  
      const productResponse = await axios.get(`${single_product_url}${singleOffer.productId}`);
      const product = productResponse.data;

      const farmerResponse = await axios.get(`${single_farmer_url}${singleOffer.farmer}`);
      const farmer = farmerResponse.data;
  
      let productName = 'Producto desconocido';
      let productImage = defaultImage;
      let farmerUsername = 'Agricultor desconocido'
  
      if (product) {
        productName = product.name || productName;
        const imageName = `${product.name.toLowerCase()}.jpg`;
        productImage = images[imageName] || defaultImage;
      }

      if (farmer) {
        farmerUsername = farmer.city || farmerUsername;
      }
  
      const offerWithDetails = {
        ...singleOffer,
        productName: productName,
        productImage: productImage,
        farmer: farmerUsername
      };
  
      dispatch({ type: GET_SINGLE_OFFER_SUCCESS, payload: offerWithDetails });
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
