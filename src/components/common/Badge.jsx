export function Badge({ children, variant = 'default', size = 'md' }) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium',
    lg: 'px-3 py-1.5 text-sm font-medium',
  }[size] || 'px-2.5 py-1 text-xs font-medium';

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (variant === 'In Stock' || variant === 'success') {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-600/10';
  } else if (variant === 'Out of Stock' || variant === 'danger') {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-600/10';
  } else if (variant === 'Electronics' || variant === 'info') {
    colorClasses = 'bg-sky-50 text-sky-700 border-sky-200 ring-1 ring-sky-600/10';
  } else if (variant === 'Home & Kitchen' || variant === 'warning') {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-600/10';
  } else if (variant === 'Apparel' || variant === 'purple') {
    colorClasses = 'bg-purple-50 text-purple-700 border-purple-200 ring-1 ring-purple-600/10';
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-colors ${sizeClasses} ${colorClasses}`}
    >
      {children}
    </span>
  );
}
