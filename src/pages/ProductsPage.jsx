import { useProducts } from '../hooks/useProducts';
import { useProductStats } from '../hooks/useProductStats';
import { useProductFilters } from '../hooks/useProductFilters';
import { usePagination } from '../hooks/usePagination';
import { useProductModals } from '../hooks/useProductModals';
import { ITEMS_PER_PAGE } from '../constants';

import { ProductFilters } from '../components/product/ProductFilters';
import { ProductTable } from '../components/product/ProductTable';
import { ProductCard } from '../components/product/ProductCard';
import { ProductFormModal } from '../components/product/ProductFormModal';
import { ProductDetailModal } from '../components/product/ProductDetailModal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { TableSkeleton } from '../components/common/Skeleton';
import { Pagination } from '../components/common/Pagination';
import { Button } from '../components/common/Button';
import { formatCurrency } from '../utils/formatCurrency';
import {
  Package,
  CheckCircle2,
  AlertOctagon,
  Boxes,
  RefreshCw,
} from 'lucide-react';

export function ProductsPage() {
  const {
    products,
    isLoading,
    error,
    fetchProducts,
    addProduct,
    editProduct,
    deleteProduct,
  } = useProducts();

  const stats = useProductStats(products);

  const {
    searchTerm,
    categoryFilter,
    statusFilter,
    filteredProducts,
    handleSearchChange,
    handleCategoryChange,
    handleStatusChange,
    handleResetFilters,
  } = useProductFilters(products);

  const {
    currentPage,
    totalPages,
    totalItems,
    paginatedItems,
    handlePrevPage,
    handleNextPage,
  } = usePagination(filteredProducts, ITEMS_PER_PAGE);

  const {
    isFormModalOpen,
    productToEdit,
    productToView,
    productToDelete,
    isSubmitting,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseFormModal,
    handleOpenView,
    handleCloseViewModal,
    handleOpenDelete,
    handleCloseDeleteModal,
    handleFormSubmit,
    handleDeleteConfirm,
  } = useProductModals({ addProduct, editProduct, deleteProduct });

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
              <img src="/logo.svg" alt="Product Inventory Logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                Product Inventory
              </h1>
              <p className="text-xs text-slate-500">
                Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              onClick={fetchProducts}
              isLoading={isLoading}
              title="Refresh product list"
            >
              Sync
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Total Products</div>
              <div className="text-lg font-bold text-slate-900">{stats.total}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">In Stock</div>
              <div className="text-lg font-bold text-emerald-700">{stats.inStock}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Out of Stock</div>
              <div className="text-lg font-bold text-rose-700">{stats.outOfStock}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Inventory Value</div>
              <div className="text-base font-bold text-slate-900 truncate">
                {formatCurrency(stats.totalValue)}
              </div>
            </div>
          </div>
        </div>

        <ProductFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          categoryFilter={categoryFilter}
          onCategoryChange={handleCategoryChange}
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
          onResetFilters={handleResetFilters}
          onAddClick={handleOpenCreate}
        />

        {isLoading && products.length === 0 ? (
          <TableSkeleton rows={4} />
        ) : error && products.length === 0 ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center max-w-md mx-auto my-8">
            <AlertOctagon className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-rose-900 mb-1">Failed to Load Products</h3>
            <p className="text-xs text-rose-700 mb-4">{error}</p>
            <Button variant="danger" size="sm" onClick={fetchProducts}>
              Retry Loading
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="hidden md:block">
              <ProductTable
                products={paginatedItems}
                onView={handleOpenView}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {paginatedItems.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onView={handleOpenView}
                  onEdit={handleOpenEdit}
                  onDelete={handleOpenDelete}
                />
              ))}
              {paginatedItems.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-500">
                  No products found.
                </div>
              )}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
            />
          </div>
        )}
      </main>

      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleFormSubmit}
        initialData={productToEdit}
        isSubmitting={isSubmitting}
      />

      <ProductDetailModal
        isOpen={Boolean(productToView)}
        onClose={handleCloseViewModal}
        product={productToView}
        onEdit={handleOpenEdit}
      />

      <ConfirmModal
        isOpen={Boolean(productToDelete)}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteConfirm}
        productName={productToDelete?.name}
        isLoading={isSubmitting}
      />
    </div>
  );
}
