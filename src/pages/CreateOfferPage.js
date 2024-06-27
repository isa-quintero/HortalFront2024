import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMagicContext } from '../context/magic_context';
import { PageHero } from '../components'
import CreateOffer from '../components/CreateOffer';

const CreateOfferPage = () => {
  const { setUser } = useMagicContext();
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    console.log('Datos del formulario:', data);
    // Aquí puedes manejar el almacenamiento de los datos, por ejemplo, enviándolos a una API
    // Supongamos que la API devuelve los datos del usuario actualizados
    const updatedUser = { ...data, role: data.role, city: data.city, address: data.address, phone: data.phone };
    setUser(updatedUser);

    // Redirigir a la página principal después de completar el formulario
    navigate('/');
  };

  return (
    <div>
      <PageHero title=' Creación de Ofertas' />
      <CreateOffer onSubmit={handleFormSubmit} />
    </div>
  );
};

export default CreateOfferPage;
