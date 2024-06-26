import React from 'react'
import styled from 'styled-components'
import Product from './Product'

const GridView = ({ products }) => {
  return (
    <Wrapper>
      <div className='products-container'>
        {products.map((product) => {
          return <Product key={product.id} {...product} />
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 768px) {
    .products-container {
      grid-template-columns: repeat(auto-fit, minmax(223px, 1fr))
    }
  }
`

export default GridView
