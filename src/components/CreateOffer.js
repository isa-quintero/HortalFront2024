import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Logo from '../assets/Logohortalsoft.png';
import { offers_url, single_product_url, url_back } from '../utils/constants';
import { useMagicContext } from '../context/magic_context';
import { mintNFT } from '../utils/mintNFT'

const CreateOffer = () => {
  const { user } = useMagicContext();
  const [productId, setProductId] = useState('');
  const [farmer, setFarmer] = useState(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [formIncomplete, setFormIncomplete] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`${single_product_url}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    const fetchFarmerId = async () => {
      try {
        const response = await axios.get(`${url_back}profiles/farmers-emails/${user.email}`);
        setFarmer(response.data.idUser);
        console.log('Fetched farmer:', response.data.idUser);
      } catch (error) {
        console.error('Error fetching farmer:', error);
      }
    };

    if (user && user.email) {
      fetchFarmerId();
    } else {
      console.error('No user or user.email available');
    }
  }, [user]);

  useEffect(() => {
    const validateForm = () => {
      if (productId && description && amount && price && initialDate && finalDate) {
        const currentDate = new Date();
        const initialDateObj = new Date(initialDate);
        const finalDateObj = new Date(finalDate);

        if (initialDateObj < currentDate) {
          console.log(initialDateObj, "<", currentDate)
          setFormIncomplete(true);
          setError('La fecha inicial no puede ser menor que la fecha actual.');
        } else if (initialDateObj > finalDateObj) {
          setFormIncomplete(true);
          setError('La fecha inicial no puede ser mayor que la fecha límite.');
        } else {
          setFormIncomplete(false);
          setError(null);
        }
      } else {
        setFormIncomplete(true);
      }
    };

    validateForm();
  }, [productId, description, amount, price, initialDate, finalDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formIncomplete) {
      setError('Por favor complete todos los campos obligatorios.');
      return;
    }

    try {
      const initialDateUTC = new Date(initialDate).toISOString();
      const finalDateUTC = new Date(finalDate).toISOString();
      //Para la creación del NFT en la blockchain se usa esta función con la información correspondiente a la oferta 
      //const requestId = await mintNFT('contractId', parseInt(amount), public.address, productId, farmer, price);
      const offerData = {
        productId: parseInt(productId),
        farmer: farmer,
        description,
        amount: parseInt(amount),
        price: parseFloat(price),
        initialDate: initialDateUTC,
        finalDate: finalDateUTC,
        validity: true,
        idBlockchain: 0,
        //Respuesta de la red de la blockchain para la creación del NFT que representa la oferta
        //idBlockchain: requestId,
      };

      const response = await axios.post(`${offers_url}`, offerData);
      console.log('Oferta creada exitosamente:', response.data);
      setShowModal(true);

    } catch (error) {
      console.error('Error al crear la oferta:', error);

      if (error.response && error.response.status === 403) {
        setError(error.response.data);
      } else {
        setError('Error al crear la oferta. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const closeModalAndRedirect = () => {
    setShowModal(false);
    window.location.href = '/';
  };

  return (
    <Wrapper className='page section section-center'>
      <LogoImage src={Logo} alt='nice desk' />
      <FormWrapper>
        <WarningMessage>Para poder crear la oferta debe llenar todos los campos marcados como obligatorios.</WarningMessage>
        {error && <ErrorText>{error}</ErrorText>}
        <RegisterForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              Producto
              <Required>*</Required>
            </Label>
            <Select value={productId} onChange={(e) => setProductId(e.target.value)}>
              <option value="" disabled hidden>Seleccione un producto</option>
              {products.map((prod) => (
                <option key={prod.id} value={prod.id}>{prod.name.toUpperCase()}</option>
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
              Cantidad (Kilos)
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
              Precio (Por kilo)
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
              type="date"
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
              type="date"
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              placeholder='Seleccione la fecha hasta que su oferta estará vigente'
            />
          </FormGroup>
          <Button type="submit" disabled={formIncomplete}>Guardar</Button>
        </RegisterForm>
      </FormWrapper>
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>Oferta enviada</h2>
            <p>Tu oferta ha sido creada exitosamente.</p>
            <Button onClick={closeModalAndRedirect}>Cerrar</Button>
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
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
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