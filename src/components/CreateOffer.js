import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Logo from '../assets/Logohortalsoft.png';
import { url_back } from '../utils/constants';
import { mintNFT } from '../utils/mintNFT';  // Importa tu función de minting

const CreateOffer = () => {
  const [productId, setProductId] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${url_back}/inventory/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza el minting del NFT
      const requestId = await mintNFT('tu_contract_id', parseInt(amount), 'direccion_destino');
      
      // Si el minting es exitoso, crea la oferta
      const offerData = {
        productId: parseInt(productId),
        farmerId: 1,  // Aquí puedes establecer el agricultor según la lógica de tu aplicación
        description,
        amount: parseInt(amount),
        price: parseFloat(price),
        initialDate,
        finalDate,
        validity: true,
        idBlockchain: requestId,  // Incluye el request_id del minting
      };

      const response = await axios.post(`${url_back}/inventory/offers`, offerData);
      console.log('Oferta creada exitosamente:', response.data);
      // Aquí podrías mostrar un mensaje de éxito o redirigir a otra página

    } catch (error) {
      console.error('Error al crear la oferta:', error);
      setError('Error al crear la oferta. Por favor, inténtalo de nuevo.');  // Maneja el error mostrando un mensaje al usuario
    }
  };

  return (
    <main>
      <Wrapper className='page section section-center'>
        <img src={Logo} alt='nice desk' />
        <article>
          <p>
            Para poder crear la oferta debe llenar todos los campos marcados como obligatorios 
          </p>
          <RegisterForm onSubmit={handleSubmit}>
            <Label>Producto:</Label>
            <Select value={productId} onChange={(e) => setProductId(e.target.value)}>
              <option value="">Seleccione un producto</option>
              {products.map((prod) => (
                <option key={prod.id} value={prod.id}>{prod.name}</option>
              ))}
            </Select>
            <Label>Descripción:</Label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=""
            />
            <Label>Cantidad:</Label>
            <Input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder=""
            />
            <Label>Precio:</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='Ingrese el precio'
            />
            <Label>Fecha Inicial de duración de la oferta:</Label>
            <Input
              type="datetime-local"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
              placeholder='Seleccione la fecha en la que iniciará su oferta'
            />
            <Label>Fecha Limite de vigencia de la oferta:</Label>
            <Input
              type="datetime-local"
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              placeholder='Seleccione la fecha hasta que su oferta estará vigente'
            />
            <Button type="submit">Guardar</Button>
          </RegisterForm>
          {error && <ErrorText>{error}</ErrorText>} {/* Muestra el mensaje de error si existe */}
        </article>
      </Wrapper>
    </main>
  );
};

const RegisterForm = styled.form`
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 20px;
`;

const Wrapper = styled.section`
  padding-top: 10px;
  display: grid;
  gap: 2rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 1rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default CreateOffer;
