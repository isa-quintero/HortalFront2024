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

export const single_product_url = `https://course-api.com/react-store-single-product?id=`
