import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOffersContext } from '../context/offers_context';
import { single_offer_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import OfferImages from '../components/OfferImages'; // Asegúrate de importar correctamente OfferImages
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const SingleOfferPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    single_offer_loading: loading,
    single_offer_error: error,
    single_offer: offer,
    fetchSingleOffer,
  } = useOffersContext();

  useEffect(() => {
    fetchSingleOffer(`${url}${id}`);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const {
    productName,
    price,
    description,
    amount,
    initialDate,
    finalDate,
    productImage, 
    offerImages,
    farmerUsername 
  } = offer;

  return (
    <Wrapper>
      <PageHero title={productName} product />
      <div className='section section-center page'>
        <Link to='/offers' className='btn'>
          Volver a ofertas
        </Link>
        <div className='offer-center'>
          <OfferImages productImage={productImage} images={offerImages} />
          <section className='content'>
            <h2>{productName}</h2>
            <h5 className='price'>{formatPrice(price)}</h5>
            <p className='desc'>{description}</p>
            <p className='info'>
              <span>Disponibilidad : </span>
              {amount > 0 ? 'DISPONIBLE' : 'AGOTADO'}
            </p>
            <p className='info'>
              <span>Fecha inicial :</span>
              {new Date(initialDate).toLocaleDateString()}
            </p>
            <p className='info'>
              <span>Fecha final:</span>
              {new Date(finalDate).toLocaleDateString()}
            </p>
            <hr />
            {amount > 0 && <AddToCart product={offer} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .offer-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .offer-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleOfferPage;
