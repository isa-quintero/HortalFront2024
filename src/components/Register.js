// src/components/FormComponent.js
import React, { useState } from 'react';

const Register = ({ onSubmit }) => {
  const [role, setRole] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ role, city, address, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rol:</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <div>
        <label>Ciudad:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label>Dirección:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Número de Teléfono:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Register;
