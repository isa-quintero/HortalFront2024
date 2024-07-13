import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'

const ListView = ({ offers }) => {
  return (
    <Wrapper>
      {offers.map((offer) => {
        const { id, productId, farmerId, description, amount, price, initialDate, finalDate } = offer
        return (
          <article key={id}>
            <div>
              <h4>Oferta #{id}</h4>
              <h5 className='price'>{formatPrice(price)}</h5>
              <p>{description.substring(0, 150)}...</p>
              <p>Cantidad: {amount}</p>
              <p>Fecha inicial: {new Date(initialDate).toLocaleDateString()}</p>
              <p>Fecha final: {new Date(finalDate).toLocaleDateString()}</p>
              <p>Producto ID: {productId}</p>
              <p>Agricultor ID: {farmerId}</p>
              <Link to={`/offers/${id}`} className='btn'>
                Detalles
              </Link>
            </div>
          </article>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }

  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`

export default ListView
