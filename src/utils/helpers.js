export const formatPrice = (number) => {
  if (typeof number !== 'number') {
    console.error('formatPrice expects a number');
    return '';
  }

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(number);
}

export const getUniqueValues = (data, type) => {
  if (!Array.isArray(data)) {
    console.error('getUniqueValues expects an array of objects');
    return [];
  }

  let unique = data.map((item) => item[type]);

  return ['todos', ...new Set(unique)];
}
