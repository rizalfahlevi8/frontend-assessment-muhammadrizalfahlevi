import { Search, Plus, X } from 'lucide-react';
import { Button } from '../common/Button';
import { Select } from '../common/Select';
import { SEEDED_CATEGORIES, PRODUCT_STATUSES } from '../../constants';

export function ProductFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  onResetFilters,
  onAddClick,
}) {
  const hasActiveFilters = Boolean(searchTerm || categoryFilter || statusFilter);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...SEEDED_CATEGORIES.map((cat) => ({ value: cat, label: cat })),
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    ...PRODUCT_STATUSES.map((stat) => ({ value: stat, label: stat })),
  ];

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6 space-y-3 sm:space-y-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="min-w-[155px]">
            <Select
              size="sm"
              value={categoryFilter}
              options={categoryOptions}
              onChange={(e) => onCategoryChange(e.target.value)}
              placeholder="All Categories"
            />
          </div>

          <div className="min-w-[145px]">
            <Select
              size="sm"
              value={statusFilter}
              options={statusOptions}
              onChange={(e) => onStatusChange(e.target.value)}
              placeholder="All Statuses"
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs font-medium text-slate-500 hover:text-slate-700 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}

          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={onAddClick}
            className="ml-auto sm:ml-0"
          >
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
}
