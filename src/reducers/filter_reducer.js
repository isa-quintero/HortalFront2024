import {
  LOAD_OFFERS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_OFFERS,
  UPDATE_FILTERS,
  FILTER_OFFERS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_OFFERS) {
    if (!Array.isArray(action.payload)) {
      throw new Error(`Expected action.payload to be an array but got ${typeof action.payload}`);
    }

    let maxPrice = action.payload.map((offer) => offer.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      all_offers: [...action.payload],
      filtered_offers: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_OFFERS) {
    const { sort, filtered_offers } = state;
    let tempOffers = [...filtered_offers];
    if (sort === 'price-lowest') {
      tempOffers = tempOffers.sort((a, b) => a.price - b.price);
    }
    if (sort === 'price-highest') {
      tempOffers = tempOffers.sort((a, b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      tempOffers = tempOffers.sort((a, b) => a.productName.localeCompare(b.productName));
    }
    if (sort === 'name-z') {
      tempOffers = tempOffers.sort((a, b) => b.productName.localeCompare(a.productName));
    }

    return { ...state, filtered_offers: tempOffers };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === FILTER_OFFERS) {
    const { all_offers } = state;
    const { text, category, price, shipping } = state.filters;
    let tempOffers = [...all_offers];
    if (text) {
      tempOffers = tempOffers.filter((offer) =>
        offer.productName.toLowerCase().startsWith(text.toLowerCase())
      );
    }
    if (category !== 'all') {
      tempOffers = tempOffers.filter((offer) => offer.category === category);
    }

    // filter by price
    tempOffers = tempOffers.filter((offer) => offer.price <= price);

    // filter by shipping
    if (shipping) {
      tempOffers = tempOffers.filter((offer) => offer.shipping === true);
    }
    return { ...state, filtered_offers: tempOffers };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        category: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
