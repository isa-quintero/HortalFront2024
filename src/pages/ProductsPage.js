import React from 'react';
import styled from 'styled-components';
import { Filters, ProductList, Sort, PageHero } from '../components';

const OffersPage = () => {
  return (
    <main>
      <PageHero title='ofertas' />
      <Wrapper className='page'>
        <div className='section-center offers'>
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .offers {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .offers {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default OffersPage;
