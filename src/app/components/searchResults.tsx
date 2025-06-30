import { List, ListRowRenderer } from "react-virtualized";
import { ProductItem } from "./productItem";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    name: string;
    priceFormatted: string;
  }>;
  onAddToWishList: (id: number) => void;
}

export default function SearchResults({
  results,
  totalPrice,
  onAddToWishList,
}: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Só esse calculo pode fazer o re-render ser 2x mais lento */}
      <h2 className="self-center mt-2 font-semibold">Total: {totalPrice}</h2>

      <List
        height={700}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  );
}

/** Quando usar useMemo?
 * 1. Quando o cálculo for muito pesado.
 * 2. Igualdade referencial (quando a informação é repassada para um componente filho).
 */
