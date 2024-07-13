import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_OFFERS_BEGIN,
  GET_OFFERS_SUCCESS,
  GET_OFFERS_ERROR,
  GET_SINGLE_OFFER_BEGIN,
  GET_SINGLE_OFFER_SUCCESS,
  GET_SINGLE_OFFER_ERROR,
} from '../actions'

const offers_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true }
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false }
  }

  if (action.type === GET_OFFERS_BEGIN) {
    return { ...state, offers_loading: true }
  }
  if (action.type === GET_OFFERS_SUCCESS) {
    // Filtrar ofertas destacadas si es necesario
    const featured_offers = action.payload.filter(
      (offer) => offer.featured === true
    )
    return {
      ...state,
      offers_loading: false,
      offers: action.payload,
      featured_offers,
    }
  }
  if (action.type === GET_OFFERS_ERROR) {
    return { ...state, offers_loading: false, offers_error: true }
  }
  if (action.type === GET_SINGLE_OFFER_BEGIN) {
    return {
      ...state,
      single_offer_loading: true,
      single_offer_error: false,
    }
  }
  if (action.type === GET_SINGLE_OFFER_SUCCESS) {
    const offer = action.payload
    // Asegurarse de que las fechas estén en el formato correcto
    offer.initialDate = new Date(offer.initialDate)
    offer.finalDate = new Date(offer.finalDate)
    return {
      ...state,
      single_offer_loading: false,
      single_offer: offer,
    }
  }
  if (action.type === GET_SINGLE_OFFER_ERROR) {
    return {
      ...state,
      single_offer_loading: false,
      single_offer_error: true,
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default offers_reducer
