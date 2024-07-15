import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CultivoImage from '../assets/cultivo.jpg';
import { single_product_url, url_back } from '../utils/constants';
import axios from 'axios';
import { useMagicContext } from '../context/magic_context';



const CreatePriceRange = () => {
  const { user } = useMagicContext();
  const [associationId, setAssociationId] = useState(null);
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAssociationId = async () => {
      try {
        const email = user.email;
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

    axios.get(`${single_product_url}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [user]);

  const handleSubmit  = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    if (!productId || !price || !finalPrice || !initialDate || !finalDate) {
      newErrors.form = 'Por favor, rellene todos los campos obligatorios.';
    }
  
    if (parseFloat(price) > parseFloat(finalPrice)) {
      newErrors.price = 'El precio inicial no puede ser mayor que el precio final';
      newErrors.finalPrice = 'El precio final no puede ser menor que el precio inicial';
    }
  
    if (new Date(initialDate) > new Date(finalDate)) {
      newErrors.initialDate = 'La fecha inicial no puede ser mayor que la fecha final';
      newErrors.finalDate = 'La fecha final no puede ser menor que la fecha inicial';
    }
  
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.form) {
        setFormMessage(newErrors.form);
      }
      setErrors(newErrors);
      return;
    }
  
    setErrors({});
    setFormMessage('');
    setShowModal(true);
    try{
      const priceRangeData = {
        productId: parseInt(productId),
        associationId: associationId,
        initialRange: parseInt(price),
        finalRange: parseInt(finalPrice),
        initialDate: new Date(initialDate),
        finalDate: new Date(finalDate),
        validity: true,
      };
      
      const response = await axios.post(`${url_back}inventory/price-ranges`, priceRangeData);
      console.log('Rango de precios creado:', response.data);
      setShowModal(true);
      
    }catch (error) {
      console.error('Error al crear el rango de precio:', error);

      if (error.response && error.response.status === 403) {
        setErrors(error.response.data);
      } else {
        setErrors('Error al crear el rango de precios. Por favor, inténtalo de nuevo.');
      }
    }
    
    };

    const closeModalAndRedirect = () => {
      setShowModal(false);
      window.location.href = '/'; 
    };
  

  const isDisabled = !productId || !price || !finalPrice || !initialDate || !finalDate || Object.values(errors).some(error => error !== '');

  return (
    <Wrapper>
      <BackgroundImage>
        <OverlayText>
          Descubre la frescura cultivada con cuidado: bienvenido al mundo de nuestras hortalizas.
        </OverlayText>
      </BackgroundImage>
      <FormWrapper>
        <Title>Crear Rango de Precios</Title>
        <Description>
          Para poder crear el rango de precios debe llenar todos los campos marcados como obligatorios.
        </Description>
        <RegisterForm onSubmit={handleSubmit}>
          {formMessage && <FormMessage>{formMessage}</FormMessage>}
          <FormGroup>
            <Label>Producto: {errors.productId && <Error>*</Error>}</Label>
            <Select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              onFocus={() => setErrors({ ...errors, productId: '' })}
            >
              <option value="" disabled hidden>Seleccione un producto</option>
              {products.map((prod) => (
                <option key={prod.id} value={prod.id}>{prod.name.toUpperCase()}</option>
              ))}
            </Select>
          </FormGroup>
          <FormRow>
            <FormGroup>
              <Label>Precio Inicial: {errors.price && <Error>*</Error>}</Label>
              <Input
                type="text"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (errors.price) {
                    setErrors({ ...errors, price: '' });
                  }
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Precio Final: {errors.finalPrice && <Error>*</Error>}</Label>
              <Input
                type="text"
                value={finalPrice}
                onChange={(e) => {
                  setFinalPrice(e.target.value);
                  if (errors.finalPrice) {
                    setErrors({ ...errors, finalPrice: '' });
                  }
                }}
                onBlur={() => {
                  if (parseFloat(price) > parseFloat(finalPrice)) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      price: 'El precio inicial no puede ser mayor que el precio final',
                      finalPrice: 'El precio final no puede ser menor que el precio inicial',
                    }));
                    setFormMessage('Ingrese un precio valido, el precio final no puede ser menor al inicial.');
                  } else {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      price: '',
                      finalPrice: '',
                    }));
                    setFormMessage('');
                  }
                }}
                onFocus={() => setErrors({ ...errors, finalPrice: '' })}
              />
            </FormGroup>
          </FormRow>
          <FormGroup>
            <Label>Fecha Inicial: {errors.initialDate && <Error>*</Error>}</Label>
            <Input
              type="date"
              value={initialDate}
              onChange={(e) => {
                setInitialDate(e.target.value);
                if (errors.initialDate) {
                  setErrors({ ...errors, initialDate: '' });
                }
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Fecha Final: {errors.finalDate && <Error>*</Error>}</Label>
            <Input
              type="date"
              value={finalDate}
              onChange={(e) => {
                setFinalDate(e.target.value);
                if (errors.finalDate) {
                  setErrors({ ...errors, finalDate: '' });
                }
              }}
              onBlur={() => {
                if (new Date(initialDate) > new Date(finalDate)) {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    initialDate: 'La fecha inicial no puede ser mayor que la fecha final',
                    finalDate: 'La fecha final no puede ser menor que la fecha inicial',
                  }));
                  setFormMessage('Ingrese una fecha válida, la fecha final no debe ser menor a la fecha inicial.');
                } else {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    initialDate: '',
                    finalDate: '',
                  }));
                  setFormMessage('');
                }
              }}
              onFocus={() => setErrors({ ...errors, finalDate: '' })}
            />
          </FormGroup>
          <Button type="submit" disabled={isDisabled}>Guardar</Button>
        </RegisterForm>
        {showModal && (
          <Modal>
            <ModalContent>
              <p><strong>Se ha creado el rango de precios de forma exitosa</strong></p>
              <CloseButton onClick={closeModalAndRedirect}>Cerrar</CloseButton>
            </ModalContent>
          </Modal>
        )}
      </FormWrapper>
    </Wrapper>
  );  
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const BackgroundImage = styled.div`
  background: url(${CultivoImage}) no-repeat center center fixed;
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100vh; /* Ajustar el tamaño de la imagen de fondo */
`;

const OverlayText = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  font-weight: bold;
  max-width: 60%;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`;

const FormWrapper = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 50%; /* Ancho del formulario */
  max-width: 600px; /* Ancho máximo del formulario */
  margin-right: 50px; /* Separación del borde derecho */
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

const RegisterForm = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: calc(100% - 20px);
  height: 40px;
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
  font-size: 16px;
  margin-top: 20px;
  opacity: ${props => props.disabled ? '0.5' : '1'}; /* Cambia la opacidad si está deshabilitado */
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
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const FormMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Error = styled.span`
  color: red;
  margin-left: 5px;
`;

export default CreatePriceRange;