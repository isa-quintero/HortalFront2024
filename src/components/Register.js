import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../assets/hortalsoft.png'; // Asegúrate de actualizar la ruta del logo
import Image from '../assets/hero-bcg.jpeg'; // Asegúrate de actualizar la ruta de la imagen

const Register = () => {
  const [role, setRole] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario
  };
  return (
    <Wrapper className='section-center'>
      <article className='content'>
      <p>
          Ayudanos a completar la información de tu perfil, todos los campos son obligatorios:
      </p>
      <RegisterForm onSubmit={handleSubmit}>
          <Label>Rol:</Label>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Seleccionar un rol</option>
            <option value="cliente">Cliente</option>
            <option value="Agricultor">Agricultor</option>
            <option value="Asociacion">Asociación</option>
          </Select>
          <Label>Dirección:</Label>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="(Ejm: Calle/Carrera 45 #29-35)"
          />
          <Label>Ciudad:</Label>
          <Select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Seleccionar ciudad</option>
            {/* Agrega más opciones según sea necesario */}
          </Select>
          <Label>Celular:</Label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Digita el número de tu teléfono"
          />
          <Button type="submit">Guardar</Button>
        </RegisterForm>
      </article>
      <article className='img-container'>
        <img src={Image} alt='nice table' className='main-img' />
        <img src={Logo} alt='person working' className='accent-img' />
      </article>
    </Wrapper>
  )
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

const Button = styled.button`
  width: 100%;
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
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
    max-width: 45em;
    margin-bottom: 2rem;
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
`
export default Register;
