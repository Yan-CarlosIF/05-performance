import { memo } from "react";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    name: string;
  };
}

function ProductItemComponent({ product }: ProductItemProps) {
  return (
    <div>
      {product.name} - <strong>{product.price}</strong>
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
