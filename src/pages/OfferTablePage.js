import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMagicContext } from '../context/magic_context';
import { PageHero } from '../components'
import OffersTable from '../components/OffersTable';

const OfferTablePage = () => {
  const { setUser } = useMagicContext();
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    console.log('Datos del formulario:', data);

    const updatedUser = { ...data, role: data.role, city: data.city, address: data.address, phone: data.phone };
    setUser(updatedUser);

    navigate('/');
  };

  return (
    <div>
      <PageHero title=' Mis Ofertas' />
      <OffersTable onSubmit={handleFormSubmit} />
    </div>
  );
};

export default OfferTablePage;
