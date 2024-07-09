import React, { useEffect, useState, useCallback } from 'react';
import { useMagicContext } from '../context/magic_context';
import styled from 'styled-components';
import axios from 'axios';
import Logo from '../assets/hortalsoft.png';
import Image from '../assets/hero-bcg.jpeg';
import { url_back } from '../utils/constants';

const Register = () => {
  const { user, getRedirectResult } = useMagicContext();
  const [documentType, setDocumentType] = useState('');
  const [documentTypes, setDocumentTypes] = useState([]);
  const [idNumber, setIdNumber] = useState('');
  const [role, setRole] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [association, setAssociation] = useState('');
  const [name, setName] = useState('');
  const [associations, setAssociations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [formIncomplete, setFormIncomplete] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentTypesResponse = await axios.get(`${url_back}profiles/document-types`);
        setDocumentTypes(documentTypesResponse.data);

        const associationsResponse = await axios.get(`${url_back}profiles/associations`);
        setAssociations(associationsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    getRedirectResult(); // Obtener el resultado del redireccionamiento
  }, [getRedirectResult]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!documentType) newErrors.documentType = 'El tipo de documento es obligatorio.';
    if (!idNumber) newErrors.idNumber = 'El número de identificación es obligatorio.';
    if (!role) newErrors.role = 'El rol es obligatorio.';
    if (!city) newErrors.city = 'La ciudad es obligatoria.';
    if (!address) newErrors.address = 'La dirección es obligatoria.';
    if (!phone) newErrors.phone = 'El número de teléfono es obligatorio.';
    if (role === 'FARMER' && !association) newErrors.association = 'La asociación es obligatoria.';
    if (role === 'ASSOCIATION' && !name) newErrors.name = 'El nombre de la asociación es obligatorio.';

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
    setFormIncomplete(Object.keys(newErrors).length > 0);
  }, [documentType, idNumber, role, city, address, phone, association, name]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formIncomplete) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: 'Por favor complete todos los campos obligatorios.',
      }));
      return;
    }

    if (!isFormValid) return;

    const userData = {
      email: user.email,
      username: user.email,
      documentTypeId: parseInt(documentType),
      idNumber: parseInt(idNumber),
      role,
      city,
      address,
      phoneNumber: parseInt(phone),
      associationId: role === 'FARMER' ? parseInt(association) : null,
      name: role === 'ASSOCIATION' ? name : null,
    };

    console.log('User metadata:', user);
    console.log('Form data:', { documentType, idNumber, role, city, address, phone, association });
    console.log('Combined user data:', userData);
    try {
      let response;
      if (role === "FARMER") {
        response = await axios.post(`${url_back}profiles/farmers`, userData);
      } else if (role === "ASSOCIATION") {
        response = await axios.post(`${url_back}profiles/associations`, userData);
      } else {
        response = await axios.post(`${url_back}profiles/customers`, userData);
      }
      console.log('Usuario registrado de forma correcta:', response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error registrando usuario:', error);
    }
  };

  const closeModalAndRedirect = () => {
    setShowModal(false);
    window.location.href = '/'; // Redirige a la página de inicio
  };

  return (
    <Wrapper className='section-center'>
      <article className='content'>
        <p>
          Ayúdanos a completar la información de tu perfil, todos los campos son obligatorios:
        </p>
        {formIncomplete && <ErrorText>{errors.form}</ErrorText>}
        <RegisterForm onSubmit={handleSubmit}>
          <FormGroup>
            <LabelContainer>
              <Label>Tipo de documento:</Label>
              <Required>*</Required>
            </LabelContainer>
            <Select value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
              <option value="" disabled hidden>Seleccionar un tipo de documento</option>
              {documentTypes.map((dt) => (
                <option key={dt.idDocumentType} value={dt.idDocumentType}>{dt.name}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <LabelContainer>
              <Label>Número de identificación:</Label>
              <Required>*</Required>
            </LabelContainer>
            <Input
              type="number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Digita tu número de identificación"
            />
          </FormGroup>

          <FormGroup>
            <LabelContainer>
              <Label>Rol:</Label>
              <Required>*</Required>
            </LabelContainer>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="" disabled hidden>Seleccionar un rol</option>
              <option value="CUSTOMER">Cliente</option>
              <option value="FARMER">Agricultor</option>
              <option value="ASSOCIATION">Asociación</option>
            </Select>
          </FormGroup>

          {role === 'FARMER' && (
            <>
              <FormGroup>
                <LabelContainer>
                  <Label>Asociación a la que pertenece:</Label>
                  <Required>*</Required>
                </LabelContainer>
                <Select value={association} onChange={(e) => setAssociation(e.target.value)}>
                  <option value="" disabled hidden>Seleccionar la asociación</option>
                  {associations.map((dt) => (
                    <option key={dt.id} value={dt.id}>{dt.name}</option>
                  ))}
                </Select>
              </FormGroup>
            </>
          )}

          {role === 'ASSOCIATION' && (
            <>
              <FormGroup>
                <LabelContainer>
                  <Label>Nombre de la asociación:</Label>
                  <Required>*</Required>
                </LabelContainer>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digita el nombre de la asociación"
                />
              </FormGroup>
            </>
          )}
          <FormGroup>
            <LabelContainer>
              <Label>Dirección:</Label>
              <Required>*</Required>
            </LabelContainer>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="(Ejm: Calle/Carrera 45 #29-35)"
            />
          </FormGroup>

          <FormGroup>
            <LabelContainer>
              <Label>Ciudad:</Label>
              <Required>*</Required>
            </LabelContainer>
            <Select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="" disabled hidden>Seleccionar ciudad</option>
              <option value="santuario">El Santuario</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <LabelContainer>
              <Label>Celular:</Label>
              <Required>*</Required>
            </LabelContainer>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Digita el número de tu teléfono"
            />
          </FormGroup>

          <Button type="submit" disabled={!isFormValid}>Guardar</Button>
        </RegisterForm>
      </article>
      <article className='img-container'>
        <img src={Image} alt='nice table' className='main-img' />
        <img src={Logo} alt='person working' className='accent-img' />
      </article>
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>Registro Exitoso</h2>
            <p>Te has registrado de forma exitosa.</p>
            <Button onClick={closeModalAndRedirect}>Cerrar</Button>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
}

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

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: -15px;
  margin-bottom: 10px;
`;
const Required = styled.span`
  color: red;
  margin-left: 5px;
`;

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 60rem;
    margin-bottom: 1rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: '';
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-grey-5);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }
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

export default Register;
