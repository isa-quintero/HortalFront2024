import React from 'react'
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'

export const links = [
  {
    id: 1,
    text: 'inicio',
    url: '/',
  },
  {
    id: 2,
    text: '¿Quiénes somos?',
    url: '/about',
  },
  {
    id: 3,
    text: 'ofertas',
    url: '/offers',
  },
]
export const customerLinks = [
  { id: 1, text: 'inicio', url: '/'},
  { id: 2, text: '¿Quiénes somos?', url: '/about'},
  { id: 3, text: 'ofertas', url: '/offers' }
];

export const farmerLinks = [
  { id: 1, text: 'inicio', url: '/'},
  { id: 2, text: 'crear oferta', url: '/offer' },
  { id: 3, text: 'mis ofertas', url: '/offers' },
];

export const associationLinks = [
  { id: 1, text: 'inicio', url: '/'},
  { id: 2, text: 'crear rango de precios', url: '/price-range' },
  { id: 3, text: 'mis rangos de precios', url: '/price-ranges' },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'misión',
    text:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'visión',
    text:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'historia',
    text:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
]

export const offers_url = 'http://localhost:8080/inventory/offers'

export const url_back = "http://localhost:8080/"

export const single_offer_url = `http://localhost:8080/inventory/offers/`

export const single_product_url = `http://localhost:8080/inventory/products/`

export const single_farmer_url = `http://localhost:8080/profiles/farmers/`


const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../assets/products', false, /\.(png|jpe?g|svg)$/));

export { images };