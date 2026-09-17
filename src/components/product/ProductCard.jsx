import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { Eye, Calendar } from 'lucide-react';

export function ProductCard({ product, onView }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-3.5">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant={product.category} size="sm">
            {product.category}
          </Badge>
          <Badge variant={product.status} size="sm">
            {product.status}
          </Badge>
        </div>

        <h4
          onClick={() => onView(product)}
          className="text-base font-semibold text-slate-900 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2"
        >
          {product.name}
        </h4>

        <div className="mt-2 text-lg font-bold text-slate-900">
          {formatCurrency(product.price)}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{formatDate(product.createdAt)}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onView(product)}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
