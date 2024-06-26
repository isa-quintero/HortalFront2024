import React, { useState } from 'react';
import styled from 'styled-components';

const RegisterForm = styled.form`
  background-color: #f7f7f7;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

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
    <RegisterForm onSubmit={handleSubmit}>
      <div>
        <Label>Rol:</Label>
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Seleccionar un rol</option>
          <option value="cliente">Cliente</option>
          <option value="Agricultor">Agricultor</option>
          <option value="Asociacion">Asociación</option>
        </Select>
      </div>
      <div>
        <Label>Dirección:</Label>
        <Input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="(Ejm: Calle/Carrera 45 #29-35)"
        />
      </div>
      <div>
        <Label>Ciudad:</Label>
        <Select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Seleccionar ciudad</option>
          {/* Agrega más opciones según sea necesario */}
        </Select>
      </div>
      <div>
        <Label>Celular:</Label>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(Ejm: Calle/Carrera 45 #29-35)"
        />
      </div>
      <Button type="submit">Login</Button>
    </RegisterForm>
  );
};

export default Register;