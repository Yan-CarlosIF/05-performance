"use client";

import { FormEvent, useCallback, useState } from "react";
import SearchResults from "./components/searchResults";

interface Results {
  data: any[];
  totalPrice: number;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({ data: [], totalPrice: 0 });

  async function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (!search.trim()) return;

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data: Array<{ id: number; price: number; name: string }> =
      await response.json();

    const products = data.map((product) => {
      return {
        ...product,
        priceFormatted: new Intl.NumberFormat("pt-BR", {
          currency: "BRL",
          style: "currency",
        }).format(product.price),
      };
    });

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    setResults({
      data: products,
      totalPrice,
    });
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <h1 className="mb-5 font-semibold">Search</h1>

      <form onSubmit={handleSearch} className="flex flex-col gap-2">
        <input
          className="border border-gray-300 rounded-sm p-2"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="bg-blue-500 rounded-sm p-2" type="submit">
          Buscar
        </button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishList}
      />
    </div>
  );
}

/** Quando usar useCallback? (parecido com useMemo)
 * 1. Quando queremos memorizar(memoizar) uma função.
 */
