import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CultivoImage from '../assets/hero-bcg-2.jpg'; // Asegúrate de que la ruta sea correcta

const OffersTable = () => {
  const [associationId, setAssociationId] = useState(null);
  const [offers, setOffers] = useState([]);

  // Solicitud para obtener associationId
  useEffect(() => {
    const fetchAssociationId = async () => {
      try {
        const response = await axios.get(`/profiles/farmerid/${idNumber}`);
        setAssociationId(response.data.associationId); // Ajusta esto según la estructura de tu respuesta
      } catch (error) {
        console.error('Error fetching associationId:', error);
      }
    };

    fetchAssociationId();
  }, [idNumber]);

  // Solicitud para obtener las ofertas usando associationId
  useEffect(() => {
    const fetchOffers = async () => {
      if (!associationId) return;

      try {
        const response = await axios.get(`/inventory/price-ranges-association/${associationId}`);
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, [associationId]);

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
