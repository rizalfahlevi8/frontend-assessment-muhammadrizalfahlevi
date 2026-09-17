import { useMemo } from 'react';

export function useProductStats(products = []) {
  return useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => p.status === 'In Stock').length;
    const outOfStock = products.filter((p) => p.status === 'Out of Stock').length;
    const totalValue = products.reduce((acc, p) => acc + (Number(p.price) || 0), 0);

    return { total, inStock, outOfStock, totalValue };
  }, [products]);
}
