import React from 'react'
import { useOffersContext } from '../context/offers_context'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import Offer from './Offer'

const FeaturedOffers = () => {
  const {
    offers_loading: loading,
    offers_error: error,
    featured_offers: featured,
  } = useOffersContext()

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  return (
    <Wrapper className='section'>
      <div className='title'>
        <h2>Ofertas Destacadas</h2>
        <div className='underline'></div>
      </div>
      <div className='section-center featured'>
        {featured.slice(0, 3).map((offer) => {
          return <Offer key={offer.id} {...offer} />
        })}
      </div>
      <Link to='/offers' className='btn'>
        Todas las ofertas
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedOffers
