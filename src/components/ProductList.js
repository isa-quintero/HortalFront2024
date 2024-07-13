import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const OfferList = () => {
  const { filtered_offers: offers, grid_view } = useFilterContext();

  if (offers.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Lo sentimos, no hay ofertas que coincidan con su búsqueda.
      </h5>
    );
  }

  if (grid_view === false) {
    return <ListView offers={offers} />;
  }
  return <GridView offers={offers} />;
};

export default OfferList;
