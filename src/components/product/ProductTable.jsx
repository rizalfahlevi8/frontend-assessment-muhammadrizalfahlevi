import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { Eye, PackageSearch } from 'lucide-react';

export function ProductTable({ products, onView }) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
          <PackageSearch className="w-6 h-6" />
        </div>
        <h4 className="text-base font-semibold text-slate-800 mb-1">No products found</h4>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          No items match your search criteria or inventory is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th scope="col" className="py-3.5 px-5">Name</th>
              <th scope="col" className="py-3.5 px-5">Category</th>
              <th scope="col" className="py-3.5 px-5">Price</th>
              <th scope="col" className="py-3.5 px-5">Status</th>
              <th scope="col" className="py-3.5 px-5">Created</th>
              <th scope="col" className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {products.map((product) => (
              <tr
                key={product.id}
                onClick={() => onView(product)}
                className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
              >
                <td className="py-3.5 px-5">
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 max-w-xs">
                    {product.name}
                  </div>
                  <div className="text-xs text-slate-400">ID: #{product.id}</div>
                </td>

                <td className="py-3.5 px-5 whitespace-nowrap">
                  <Badge variant={product.category}>
                    {product.category}
                  </Badge>
                </td>

                <td className="py-3.5 px-5 whitespace-nowrap font-semibold text-slate-800">
                  {formatCurrency(product.price)}
                </td>

                <td className="py-3.5 px-5 whitespace-nowrap">
                  <Badge variant={product.status}>
                    {product.status}
                  </Badge>
                </td>

                <td className="py-3.5 px-5 whitespace-nowrap text-slate-500 text-xs">
                  {formatDate(product.createdAt)}
                </td>

                <td
                  className="py-3.5 px-5 whitespace-nowrap text-right text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => onView(product)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
