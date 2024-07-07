import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Logo from '../assets/Logohortalsoft.png';
import { url_back } from '../utils/constants';
import { mintNFT } from '../utils/mintNFT';
import { useMagicContext } from '../context/magic_context';

const CreateOffer = () => {
  const { user } = useMagicContext();
  const [productId, setProductId] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [formIncomplete, setFormIncomplete] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`${url_back}inventory/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || !description || !amount || !price || !initialDate || !finalDate) {
      setFormIncomplete(true);
      return;
    }

    if (new Date(initialDate) > new Date(finalDate)) {
      setError('La fecha inicial no puede ser mayor que la fecha límite.');
      return;
    }

    try {
      // Realiza el minting del NFT
      const requestId = await mintNFT('0x87c63b5aa6e6dfc243a6c629c66bc4d2f473d9fb', parseInt(amount),user.publicAddress );
            
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

      const response = await axios.post(`${url_back}inventory/offers`, offerData);
      console.log('Oferta creada exitosamente:', response.data);      console.log('Oferta creada exitosamente');
      setShowModal(true);

      // Aquí podrías realizar otras acciones necesarias después de crear la oferta

    } catch (error) {
      console.error('Error al crear la oferta:', error);
      setError('Error al crear la oferta. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <Wrapper className='page section section-center'>
      <LogoImage src={Logo} alt='nice desk' />
      <FormWrapper>
        <WarningMessage>Para poder crear la oferta debe llenar todos los campos marcados como obligatorios.</WarningMessage>
        {error && <ErrorText>{error}</ErrorText>}
        {formIncomplete && <ErrorText>Por favor complete todos los campos obligatorios.</ErrorText>}
        <RegisterForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              Producto
              <Required>*</Required>
            </Label>
            <Select value={productId} onChange={(e) => setProductId(e.target.value)}>
              <option value="">Seleccione un producto</option>
              {products.map((prod) => (
                <option key={prod.id} value={prod.id}>{prod.name}</option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>
              Descripción
              <Required>*</Required>
            </Label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=""
            />
          </FormGroup>
          <FormGroup>
            <Label>
              Cantidad
              <Required>*</Required>
            </Label>
            <Input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder=""
            />
          </FormGroup>
          <FormGroup>
            <Label>
              Precio
              <Required>*</Required>
            </Label>
            <Input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='Ingrese el precio'
            />
          </FormGroup>
          <FormGroup>
            <Label>
              Fecha Inicial de duración de la oferta
              <Required>*</Required>
            </Label>
            <Input
              type="date" // Cambiado a 'date' para mostrar solo mes y día
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
              placeholder='Seleccione la fecha en la que iniciará su oferta'
            />
          </FormGroup>
          <FormGroup>
            <Label>
              Fecha Límite de vigencia de la oferta
              <Required>*</Required>
            </Label>
            <Input
              type="date" // Cambiado a 'date' para mostrar solo mes y día
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              placeholder='Seleccione la fecha hasta que su oferta estará vigente'
            />
          </FormGroup>
          <Button type="submit">Guardar</Button>
        </RegisterForm>
      </FormWrapper>
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>Oferta enviada</h2>
            <p>Tu oferta ha sido creada exitosamente.</p>
            <Button onClick={() => setShowModal(false)}>Cerrar</Button>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormWrapper = styled.div`
  width: 45%;
`;

const RegisterForm = styled.form`
  margin-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
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
  margin-top: 8px;
  margin-bottom: 0;
`;

const WarningMessage = styled.p`
  color: black;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Required = styled.span`
  color: red;
  margin-left: 5px;
`;

const LogoImage = styled.img`
  width: 50%;
  display: block;
  border-radius: var(--radius);
  object-fit: cover;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

export default CreateOffer;