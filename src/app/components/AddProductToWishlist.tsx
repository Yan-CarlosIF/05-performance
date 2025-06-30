interface AddProductToWishlistProps {
  onAddToWishList: () => void;
  onRequestClose: () => void;
}

export function AddProductToWishlist({
  onAddToWishList,
  onRequestClose,
}: AddProductToWishlistProps) {
  return (
    <span className="ml-5 flex gap-3 items-center">
      Deseja adicionar aos favoritos?
      <button onClick={onAddToWishList} className="bg-blue-500 rounded-sm p-2">
        Sim
      </button>
      <button onClick={onRequestClose} className="bg-red-500 rounded-sm p-2">
        Não
      </button>
    </span>
  );
}
