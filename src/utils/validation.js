import { SEEDED_CATEGORIES, PRODUCT_STATUSES } from '../constants';

export { SEEDED_CATEGORIES, PRODUCT_STATUSES };

export function validateField(fieldName, value) {
  switch (fieldName) {
    case 'name': {
      if (!value || typeof value !== 'string' || value.trim().length === 0) {
        return 'Product name is required';
      }
      return '';
    }
    case 'category': {
      if (!value || value.trim() === '') {
        return 'Please select a category';
      }
      return '';
    }
    case 'price': {
      if (value === '' || value === null || value === undefined) {
        return 'Price is required';
      }
      const num = Number(value);
      if (isNaN(num) || num <= 0) {
        return 'Price must be a number strictly greater than 0';
      }
      return '';
    }
    case 'status': {
      if (!value || (value !== 'In Stock' && value !== 'Out of Stock')) {
        return 'Status must be "In Stock" or "Out of Stock"';
      }
      return '';
    }
    default:
      return '';
  }
}

export function validateProductForm(formData) {
  const errors = {};

  const nameError = validateField('name', formData.name);
  if (nameError) errors.name = nameError;

  const categoryError = validateField('category', formData.category);
  if (categoryError) errors.category = categoryError;

  const priceError = validateField('price', formData.price);
  if (priceError) errors.price = priceError;

  const statusError = validateField('status', formData.status);
  if (statusError) errors.status = statusError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
