import React from 'react'
import styled from 'styled-components'
import Offer from './Offer'

const GridView = ({ offers }) => {
  return (
    <Wrapper>
      <div className='offers-container'>
        {offers.map((offer) => {
          return <Offer key={offer.id} {...offer} />
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .offers-container {
    display: grid;
    gap: 2rem 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(223px, 1fr));
  }

  @media (min-width: 768px) {
    .offers-container {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }

  @media (min-width: 1024px) {
    .offers-container {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }
`

export default GridView
