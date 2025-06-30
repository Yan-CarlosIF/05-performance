import { memo, useState } from "react";
import dynamic from "next/dynamic";

const AddProductToWishlist = dynamic(async () => {
  const module = await import("./AddProductToWishlist");
  return module.AddProductToWishlist;
});

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    name: string;
    priceFormatted: string;
  };
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      <div>
        {product.name} - <strong>{product.priceFormatted}</strong>
        <button
          onClick={() => setIsAddingToWishList(true)}
          className="bg-green-500 ml-5 rounded-sm p-2"
        >
          Adicionar aos favoritos
        </button>
      </div>
      {isAddingToWishList && (
        <AddProductToWishlist
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) =>
  Object.is(prevProps.product, nextProps.product)
);

/** O que o memo faz:
 * Sem o memo: irá renderizar o componente se o componente pai mudar.
 * com o memo: Só irá renderizar o componente se as props passadas para ele mudarem.
 */

/** Situações em que o memo pode ser utilizado:
 * 1. componentes apenas para abstrair a interface de um componente complexo (Pure functional component).
 * 2. componentes que renderizam muitas vezes (Ex: listas de itens).
 * 3. componentes que re-renderizam com as mesmas props.
 * 4. quando o componente tem o tamanho médio a grande, o memo vai trazer melhores resultados.
 */
