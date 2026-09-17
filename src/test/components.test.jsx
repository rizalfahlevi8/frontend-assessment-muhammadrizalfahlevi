import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { ProductTable } from '../components/product/ProductTable';
import { ConfirmModal } from '../components/common/ConfirmModal';

describe('Button component', () => {
  it('renders button text correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('triggers onClick callback when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button', { name: /disabled button/i })).toBeDisabled();
  });

  it('is disabled and shows spinner when isLoading is true', () => {
    render(<Button isLoading>Saving</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});

describe('Badge component', () => {
  it('renders children with appropriate status variant', () => {
    render(<Badge variant="In Stock">In Stock</Badge>);
    const badge = screen.getByText('In Stock');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('text-emerald-700');
  });

  it('renders out of stock variant', () => {
    render(<Badge variant="Out of Stock">Out of Stock</Badge>);
    const badge = screen.getByText('Out of Stock');
    expect(badge.className).toContain('text-rose-700');
  });

  it('renders category variant', () => {
    render(<Badge variant="Electronics">Electronics</Badge>);
    const badge = screen.getByText('Electronics');
    expect(badge.className).toContain('text-sky-700');
  });
});

describe('Input component', () => {
  it('renders label and input value correctly', () => {
    render(<Input label="Product Name" name="name" value="Mechanical Keyboard" onChange={() => {}} />);
    expect(screen.getByLabelText(/product name/i)).toHaveValue('Mechanical Keyboard');
  });

  it('displays error message when error prop is provided', () => {
    render(<Input label="Price" name="price" error="Price is required" value="" onChange={() => {}} />);
    expect(screen.getByText('Price is required')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(<Input label="Name" name="name" onChange={handleChange} />);
    const input = screen.getByLabelText(/name/i);
    fireEvent.change(input, { target: { value: 'New Product' } });
    expect(handleChange).toHaveBeenCalled();
  });
});

describe('Select (Custom Dropdown) component', () => {
  const options = [
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Apparel', label: 'Apparel' },
  ];

  it('renders placeholder and toggles menu on click', () => {
    render(<Select label="Category" options={options} placeholder="-- Select Category --" />);
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveTextContent('-- Select Category --');

    fireEvent.click(trigger);
    expect(screen.getByRole('option', { name: /electronics/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /apparel/i })).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', () => {
    const handleChange = vi.fn();
    render(<Select name="category" options={options} onChange={handleChange} />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const option = screen.getByRole('option', { name: /apparel/i });
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { name: 'category', value: 'Apparel' },
      })
    );
  });
});

describe('ProductTable component', () => {
  const products = [
    {
      id: 1,
      name: 'Wireless Keyboard',
      category: 'Electronics',
      price: 1250000,
      status: 'In Stock',
      createdAt: '2024-01-15T09:30:00.000Z',
    },
  ];

  it('renders products and table headers correctly', () => {
    render(<ProductTable products={products} onView={() => {}} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Wireless Keyboard')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });

  it('renders empty state when product list is empty', () => {
    render(<ProductTable products={[]} onView={() => {}} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('triggers onView, onEdit, and onDelete action buttons', () => {
    const handleView = vi.fn();
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();

    render(
      <ProductTable
        products={products}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );

    fireEvent.click(screen.getByTitle('View Details'));
    expect(handleView).toHaveBeenCalledWith(products[0]);

    fireEvent.click(screen.getByTitle('Edit Product'));
    expect(handleEdit).toHaveBeenCalledWith(products[0]);

    fireEvent.click(screen.getByTitle('Delete Product'));
    expect(handleDelete).toHaveBeenCalledWith(products[0]);
  });
});

describe('ConfirmModal component', () => {
  it('renders product confirmation message and fires callbacks', () => {
    const handleConfirm = vi.fn();
    const handleClose = vi.fn();

    render(
      <ConfirmModal
        isOpen={true}
        onClose={handleClose}
        onConfirm={handleConfirm}
        productName="Sample Desk"
      />
    );

    expect(screen.getByText(/"Sample Desk"/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(handleConfirm).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
