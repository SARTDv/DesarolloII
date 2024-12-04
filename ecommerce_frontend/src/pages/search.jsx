import React, { useState } from "react";
import "../css/search.css";

const Search = () => {
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/products/search/?category=${category}&keyword=${keyword}`
      );
      if (!response.ok) {
        throw new Error("Error al realizar la búsqueda");
      }
      const data = await response.json();
      setResults(data.products);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Buscar Productos</h1>
      <input
        type="text"
        placeholder="Categoría"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Palabra Clave"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <h2>Resultados</h2>
        {results.length === 0 && !loading && <p>No se encontraron productos.</p>}
        <ul>
          {results.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> - {product.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;