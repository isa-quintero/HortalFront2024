import React, { useState } from 'react';
import styled from 'styled-components';
import CultivoImage from '../assets/cultivo.jpg'; // Asegúrate de que la ruta sea correcta

const PriceRangeTable = () => {
  const [offers, setOffers] = useState([
    {
      product: 'Producto 1',
      initialPrice: '100',
      finalPrice: '90',
      initialDate: '2024-07-01',
      finalDate: '2024-07-10',
    },
    {
      product: 'Producto 2',
      initialPrice: '200',
      finalPrice: '180',
      initialDate: '2024-07-05',
      finalDate: '2024-07-15',
    },
    {
      product: 'Producto 3',
      initialPrice: '300',
      finalPrice: '270',
      initialDate: '2024-07-10',
      finalDate: '2024-07-20',
    },
  ]);

  const validateOffers = (offers) => {
    return offers.map((offer) => {
      const errors = {};
      if (parseFloat(offer.initialPrice) > parseFloat(offer.finalPrice)) {
        errors.price = true;
      }
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
              A continuación se presentan los rangos de precios que ha creado hasta el momento la asociación.
            </p>
            <div className='underline'></div>
          </div>
          <Table>
            <thead>
              <tr>
                <Th>Producto</Th>
                <Th>Precio Inicial</Th>
                <Th>Precio Final</Th>
                <Th>Fecha Inicial</Th>
                <Th>Fecha Final</Th>
              </tr>
            </thead>
            <tbody>
              {validatedOffers.map((offer, index) => (
                <tr key={index} style={offer.errors.price || offer.errors.date ? { backgroundColor: '#ffe6e6' } : {}}>
                  <Td>{offer.product}</Td>
                  <Td>${offer.initialPrice}</Td>
                  <Td>${offer.finalPrice}</Td>
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
  max-width: 1400px; /* Aumenta el ancho máximo del contenedor principal */
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid rgba(0, 0, 0, 0.1); /* Borde para el efecto de cuadro */
  border-radius: 10px; /* Borde redondeado */
  overflow: hidden; /* Ocultar el contenido que se desborda */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
`;

const ImageColumn = styled.div`
  margin-top:5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  flex: 2; /* Aumenta la proporción del espacio que ocupan las imágenes */
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px 0 0 10px; /* Borde redondeado solo en la esquina izquierda */
`;

const TableWrapper = styled.div`
  flex: 3; /* Aumenta la proporción del espacio que ocupa la tabla */
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8); /* Fondo difuminado */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #4CAF50;
  color: white;
  padding: 15px; /* Aumenta el padding para hacer los encabezados más grandes */
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px; /* Aumenta el padding para hacer las celdas más grandes */
`;

export default PriceRangeTable;