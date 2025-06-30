import { useMemo } from "react";
import { ProductItem } from "./productItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    name: string;
  }>;
  onAddToWishList: (id: number) => void;
}

export default function SearchResults({
  results,
  onAddToWishList,
}: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]);

  return (
    <div>
      {/* Só esse calculo pode fazer o re-render ser 2x mais lento */}
      <h2>Total: {totalPrice}</h2>
      {results.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToWishList={onAddToWishList}
        />
      ))}
    </div>
  );
}

/** Quando usar useMemo?
 * 1. Quando o cálculo for muito pesado.
 * 2. Igualdade referencial (quando a informação é repassada para um componente filho).
 */
