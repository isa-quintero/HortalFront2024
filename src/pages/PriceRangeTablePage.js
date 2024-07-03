import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMagicContext } from '../context/magic_context';
import { PageHero } from '../components'
import PriceRangeTable from '../components/PriceRangeTable';

const PriceRangeTablePage = () => {
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
      <PageHero title=' Mis Rangos de Precios' />
      <PriceRangeTable onSubmit={handleFormSubmit} />
    </div>
  );
};

export default PriceRangeTablePage;
