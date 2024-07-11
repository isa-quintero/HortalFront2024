import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CultivoImage from '../assets/cultivo.jpg'; // Asegúrate de que la ruta sea correcta
import { url_back } from '../utils/constants';
import { useMagicContext } from '../context/magic_context';

const PriceRangeTable = () => {
  const { user } = useMagicContext();
  const [associationId, setAssociationId] = useState(null);
  const [priceRanges, setPriceRanges] = useState([]);
  const [productNames, setProductNames] = useState({});
  const [error, setError] = useState(null); // Estado para manejar errores

  // Solicitud para obtener associationId
  useEffect(() => {
    const fetchAssociationId = async () => {
      try {
        const email = user.email;
        console.log('Encoded email:', email); // Log de depuración
        const response = await axios.get(`${url_back}profiles/associations-emails/${email}`);
        setAssociationId(response.data.idUser); 
        console.log('Fetched associationId:', response.data.idUser);
      } catch (error) {
        console.error('Error fetching associationId:', error);
      }
    };

    if (user && user.email) {
      fetchAssociationId();
    } else {
      console.error('No user or user.email available');
    }
  }, [user]);

  // Solicitud para obtener los nombres de los productos
  useEffect(() => {
    const fetchProductNames = async () => {
      try {
        const response = await axios.get(`${url_back}inventory/products`);
        const names = response.data.reduce((acc, product) => {
          acc[product.id] = product.name;
          return acc;
        }, {});
        setProductNames(names);
      } catch (error) {
        console.error('Error fetching product names:', error);
      }
    };

    fetchProductNames();
  }, []);

  // Solicitud para obtener los rangos de precios usando associationId
  useEffect(() => {
    const fetchPriceRanges = async () => {
      if (!associationId) return;

      try {
        console.log('Fetching priceRanges for associationId:', associationId);
        const response = await axios.get(`${url_back}inventory/price-ranges-associations/${associationId}`);
        if (response.status === 404) {
          setError('No hay productos disponibles.');
        } else {
          setPriceRanges(response.data);
          setError(null); // Limpiar cualquier error previo si hay ofertas
        }
        console.log('Fetched offers:', response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
        setError('No hay ofertas disponibles');
      }
    };

    fetchPriceRanges();
  }, [associationId]);

  const validatePriceRanges = (priceRanges) => {
    return priceRanges.map((priceRange) => {
      const errors = {};
      if (parseFloat(priceRange.initialPrice) > parseFloat(priceRange.finalPrice)) {
        errors.price = true;
      }
      if (new Date(priceRange.initialDate) > new Date(priceRange.finalDate)) {
        errors.date = true;
      }
      return { ...priceRange, errors };
    });
  };

  const validatedPriceRanges = validatePriceRanges(priceRanges);

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
              {error ? (
                <tr>
                  <Td colSpan="5">
                    <ErrorMessage>{error}</ErrorMessage>
                  </Td>
                </tr>
              ) : (
                validatedPriceRanges.map((priceRange, index) => (
                  <tr key={index} style={priceRange.errors.price || priceRange.errors.date ? { backgroundColor: '#ffe6e6' } : {}}>
                    <Td>{(productNames[priceRange.productId] || 'Producto Desconocido').toUpperCase()}</Td>
                    <Td>${priceRange.initialRange}</Td>
                    <Td>${priceRange.finalRange}</Td>
                    <Td>{new Date(priceRange.initialDate).toLocaleDateString()}</Td>
                    <Td>{new Date(priceRange.initialDate).toLocaleDateString()}</Td>
                  </tr>
                ))
              )}
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2rem;
  margin-top: 20px;
`;

export default PriceRangeTable;
