import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'

const ListView = ({ offers }) => {
  return (
    <Wrapper>
      {offers.map((offer) => {
        const { id, productName, productImage, description, amount, price, initialDate, finalDate } = offer
        return (
          <article key={id}>
            <img src={productImage} alt={productName} />
            <div className='info'>
              <div className='info-left'>
                <h4>{productName}</h4>
                <h5 className='price'>{formatPrice(price)}</h5>
                <p>{description.substring(0, 150)}...</p>
                <p>Cantidad (en kilos): {amount}</p>
              </div>
              <div className='info-center'>
                <p></p>
                <p>Fecha inicial: {new Date(initialDate).toLocaleDateString()}</p>
              </div>
              <div className='info-right'>
                <p></p>
                <p>Fecha final: {new Date(finalDate).toLocaleDateString()}</p>
                <Link to={`/offers/${id}`} className='btn'>
                  Detalles
                </Link>
              </div>
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

  img {
    width: 200px;
    height: auto;
    border-radius: var(--radius);
    object-fit: cover;
  }

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
    font-size: 0.85rem;
    padding: 0.25rem 0.5rem;
  }

  article {
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    column-gap: 2rem;
    align-items: start;
  }

  .info {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 3rem;
  }

  .info-left, .info-center, .info-right {
    display: flex;
    flex-direction: column;
  }
`

export default ListView
