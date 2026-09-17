import { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { SEEDED_CATEGORIES, PRODUCT_STATUSES } from '../../constants';
import { validateField, validateProductForm } from '../../utils/validation';

export function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isSubmitting = false,
}) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Product' : 'Add New Product'}
      subtitle={
        initialData
          ? 'Update product details below and save your changes.'
          : 'Fill in the information to add a new product to inventory.'
      }
      maxWidth="max-w-lg"
    >
      <ProductFormContent
        key={initialData?.id || 'new'}
        initialData={initialData}
        onClose={onClose}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}

function ProductFormContent({
  initialData,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const isEdit = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || '',
    category: initialData?.category || '',
    price: initialData?.price !== undefined ? String(initialData.price) : '',
    status: initialData?.status || 'In Stock',
  }));

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const formValidation = validateProductForm(formData);
  const isFormValid = formValidation.isValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateProductForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      setTouched({
        name: true,
        category: true,
        price: true,
        status: true,
      });
      return;
    }

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      price: Number(formData.price),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Input
        label="Product Name"
        name="name"
        placeholder="e.g. Wireless Mechanical Keyboard"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name ? errors.name : errors.name && formData.name ? errors.name : ''}
        required
        autoFocus
      />

      <Select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        onBlur={handleBlur}
        options={SEEDED_CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
        placeholder="-- Select Category --"
        error={touched.category ? errors.category : ''}
        required
      />

      <Input
        label="Price (IDR)"
        name="price"
        type="number"
        min="1"
        step="1"
        prefix="Rp"
        placeholder="e.g. 1250000"
        value={formData.price}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.price ? errors.price : errors.price && formData.price ? errors.price : ''}
        helperText="Enter numbers only, greater than 0"
        required
      />

      <Select
        label="Inventory Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        onBlur={handleBlur}
        options={PRODUCT_STATUSES.map((stat) => ({ value: stat, label: stat }))}
        error={touched.status ? errors.status : ''}
        required
      />

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={!isFormValid || isSubmitting}
          isLoading={isSubmitting}
        >
          {isEdit ? 'Save Changes' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
}
