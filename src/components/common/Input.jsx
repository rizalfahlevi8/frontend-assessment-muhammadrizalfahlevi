import { AlertCircle } from 'lucide-react';

export function Input({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  prefix,
  helperText,
  ...props
}) {
  const inputId = id || name;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-slate-700 flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-rose-500">*</span>}
          </span>
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm">
            {prefix}
          </div>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full text-sm rounded-xl border bg-white py-2.5 transition-all outline-none disabled:bg-slate-50 disabled:text-slate-400 ${
            prefix ? 'pl-9 pr-3' : 'px-3.5'
          } ${
            error
              ? 'border-rose-400 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
              : 'border-slate-200 text-slate-900 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
          }`}
          {...props}
        />
      </div>

      {error ? (
        <p className="flex items-center gap-1 text-xs text-rose-600 font-medium animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
