import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../assets/Logohortalsoft.png'; 

const CreateOffer = () => {
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario
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
            <Select value={product} onChange={(e) => setProduct(e.target.value)}>
              <option value="">Seleccione un producto</option>
              <option value="Papa">Papa</option>
              <option value="Zanahoria">Zanahoria</option>
              <option value="Cilantro">Cilantro</option>
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
              type="tel"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='Ingrese el precio (recuerde que debe estar entre los rangos establecidos)'
            />
            <Label>Fecha Inicial de duración de la oferta:</Label>
            <Input
              type="tel"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
              placeholder='Seleccione la fecha en la que iniciará su oferta'
            />
            <Label>Fecha Limite de vigencia de la oferta:</Label>
            <Input
              type="tel"
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              placeholder='Seleccione la fecha hasta que su oferta estará vigente'
            />
            <Button type="submit">Guardar</Button>
          </RegisterForm>
        </article>
      </Wrapper>
    </main>
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
  cursor: pointer;
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
`
export default CreateOffer;
