import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { Package, Tag, DollarSign, Calendar, CheckCircle } from 'lucide-react';

export function ProductDetailModal({ isOpen, onClose, product, onEdit }) {
  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Product Details"
      subtitle={`Viewing ID #${product.id}`}
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Name
            </span>
            <h4 className="text-base font-bold text-slate-900 leading-tight mt-0.5">
              {product.name}
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              Price
            </div>
            <p className="text-base font-bold text-emerald-700">
              {formatCurrency(product.price)}
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
              Status
            </div>
            <Badge variant={product.status}>{product.status}</Badge>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1.5">
              <Tag className="w-3.5 h-3.5 text-sky-600" />
              Category
            </div>
            <Badge variant={product.category}>{product.category}</Badge>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Created
            </div>
            <p className="text-sm font-semibold text-slate-700">
              {formatDate(product.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          {onEdit && (
            <Button
              variant="primary"
              onClick={() => {
                onClose();
                onEdit(product);
              }}
            >
              Edit Product
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
