import React, { useState } from 'react';
import styled from 'styled-components';
import CultivoImage from '../assets/hero-bcg-2.jpg'; // Asegúrate de que la ruta sea correcta

const OffersTable = () => {
  const [offers, setOffers] = useState([
    {
      product: 'Producto 1',
      price: '90',
      description: 'Oferta especial',
      quantity: '100 unidades',
      initialDate: '2024-07-01',
      finalDate: '2024-07-10',
    },
    {
      product: 'Producto 2',
      price: '180',
      description: 'Descuento de verano',
      quantity: '50 unidades',
      initialDate: '2024-07-05',
      finalDate: '2024-07-15',
    },
    {
      product: 'Producto 3',
      price: '270',
      description: 'Venta de liquidación',
      quantity: '200 unidades',
      initialDate: '2024-07-10',
      finalDate: '2024-07-20',
    },
  ]);

  const validateOffers = (offers) => {
    return offers.map((offer) => {
      const errors = {};
      if (new Date(offer.initialDate) > new Date(offer.finalDate)) {
        errors.date = true;
      }
      return { ...offer, errors };
    });
  };

  const validatedOffers = validateOffers(offers);

  return (
    <Wrapper>
      <ContentWrapper>
        <ImageColumn>
          <Image src={CultivoImage} alt="Cultivo" />
        </ImageColumn>
        <TableWrapper>
          <div className='title'>
            <p>
              A continuación se presentan las ofertas que haz creado hasta el momento.
            </p>
            <div className='underline'></div>
          </div>
          
          <Table>
            <thead>
              <tr>
                <Th>Producto</Th>
                <Th>Precio</Th>
                <Th>Descripción</Th>
                <Th>Cantidad</Th>
                <Th>Fecha Inicial</Th>
                <Th>Fecha Final</Th>
              </tr>
            </thead>
            <tbody>
              {validatedOffers.map((offer, index) => (
                <tr key={index} style={offer.errors.date ? { backgroundColor: '#ffe6e6' } : {}}>
                  <Td>{offer.product}</Td>
                  <Td>${offer.price}</Td>
                  <Td>{offer.description}</Td>
                  <Td>{offer.quantity}</Td>
                  <Td>{offer.initialDate}</Td>
                  <Td>{offer.finalDate}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
        <ImageColumn>
          <Image src={CultivoImage} alt="Cultivo" />
        </ImageColumn>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  max-width: 1600px; /* Aumenta el ancho máximo del contenedor principal */
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: 2px solid rgba(0, 0, 0, 0.1); /* Borde para el efecto de cuadro */
  border-radius: 15px; /* Borde redondeado */
  overflow: hidden; /* Ocultar el contenido que se desborda */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Sombra suave */
`;

const ImageColumn = styled.div`
    margin-top:5rem;
    margin-left: 1rem;
    margin-right: 1rem;
  flex: 1; /* Aumenta la proporción del espacio que ocupan las imágenes */
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 15px; /* Borde redondeado */
`;

const TableWrapper = styled.div`
  flex: 2; /* Aumenta la proporción del espacio que ocupa la tabla */
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.9); /* Fondo difuminado */
`;


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
`;

const Th = styled.th`
  background-color: #4CAF50;
  color: white;
  padding: 20px; /* Aumenta el padding para hacer los encabezados más grandes */
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 16px; /* Aumenta el padding para hacer las celdas más grandes */
`;

export default OffersTable;