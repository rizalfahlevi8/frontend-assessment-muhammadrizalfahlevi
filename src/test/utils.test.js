import { describe, it, expect } from 'vitest';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import { validateField, validateProductForm } from '../utils/validation';

describe('formatCurrency utility', () => {
  it('formats numeric amounts to Indonesian Rupiah', () => {
    const formatted = formatCurrency(1250000);
    expect(formatted.replace(/\s/g, ' ')).toMatch(/Rp\s?1\.250\.000/);
  });

  it('formats 0 correctly', () => {
    expect(formatCurrency(0)).toBe('Rp0');
  });

  it('handles null, undefined, or NaN safely', () => {
    expect(formatCurrency(null)).toBe('Rp0');
    expect(formatCurrency(undefined)).toBe('Rp0');
    expect(formatCurrency('invalid')).toBe('Rp0');
  });
});

describe('formatDate utility', () => {
  it('formats ISO date string into readable date', () => {
    const result = formatDate('2024-01-15T09:30:00.000Z');
    expect(result).toBe('Jan 15, 2024');
  });

  it('returns hyphen for falsy or invalid date', () => {
    expect(formatDate(null)).toBe('-');
    expect(formatDate('')).toBe('-');
    expect(formatDate('invalid-date-string')).toBe('-');
  });
});

describe('validation utilities', () => {
  describe('validateField', () => {
    it('validates name required and non-empty', () => {
      expect(validateField('name', '')).toBe('Product name is required');
      expect(validateField('name', '   ')).toBe('Product name is required');
      expect(validateField('name', 'Wireless Mouse')).toBe('');
    });

    it('validates category required', () => {
      expect(validateField('category', '')).toBe('Please select a category');
      expect(validateField('category', 'Electronics')).toBe('');
    });

    it('validates price required and strictly greater than 0', () => {
      expect(validateField('price', '')).toBe('Price is required');
      expect(validateField('price', 0)).toBe('Price must be a number strictly greater than 0');
      expect(validateField('price', -500)).toBe('Price must be a number strictly greater than 0');
      expect(validateField('price', 'abc')).toBe('Price must be a number strictly greater than 0');
      expect(validateField('price', 150000)).toBe('');
      expect(validateField('price', '250000')).toBe('');
    });

    it('validates status must be In Stock or Out of Stock', () => {
      expect(validateField('status', '')).toBe('Status must be "In Stock" or "Out of Stock"');
      expect(validateField('status', 'Pending')).toBe('Status must be "In Stock" or "Out of Stock"');
      expect(validateField('status', 'In Stock')).toBe('');
      expect(validateField('status', 'Out of Stock')).toBe('');
    });
  });

  describe('validateProductForm', () => {
    it('returns isValid: true when all fields are valid', () => {
      const validForm = {
        name: 'Coffee Mug',
        category: 'Home & Kitchen',
        price: 75000,
        status: 'In Stock',
      };
      const result = validateProductForm(validForm);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });

    it('returns isValid: false with accumulated error messages when fields are invalid', () => {
      const invalidForm = {
        name: '',
        category: '',
        price: -10,
        status: 'Archived',
      };
      const result = validateProductForm(invalidForm);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeTruthy();
      expect(result.errors.category).toBeTruthy();
      expect(result.errors.price).toBeTruthy();
      expect(result.errors.status).toBeTruthy();
    });
  });
});
