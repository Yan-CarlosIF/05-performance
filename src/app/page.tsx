"use client";

import { FormEvent, useCallback, useState } from "react";
import SearchResults from "./components/searchResults";

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (!search.trim()) return;

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();
    console.log(data);
    setResults(data);
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

      <SearchResults results={results} onAddToWishList={addToWishList} />
    </div>
  );
}

/** Quando usar useCallback? (parecido com useMemo)
 * 1. Quando queremos memorizar(memoizar) uma função.
 */
