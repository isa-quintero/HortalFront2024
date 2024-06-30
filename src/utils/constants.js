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
    text: 'productos',
    url: '/products',
  },
]
export const customerLinks = [
  { id: 1, text: 'dashboard', url: '/dashboard' },
  { id: 2, text: 'products', url: '/products' },
];

export const farmerLinks = [
  { id: 1, text: 'crear oferta', url: '/offer' },
  { id: 2, text: 'mis ofertas', url: '/offers' },
];

export const associationLinks = [
  { id: 1, text: 'crear rango de precios', url: '/price-range' },
  { id: 2, text: 'mis rangos de precios', url: '/price-ranges' },
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

export const products_url = 'http://localhost:8080/inventory/products'

export const url_back = "http://localhost:8080/"

export const single_product_url = `https://course-api.com/react-store-single-product?id=`
