import { useState } from "react";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";

const API_URL = "https://potterapi-fedeperin.vercel.app/en/books";

export default function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function buscarLivros() {
    setLoading(true);
    setError("");
    setSearched(true);
    setSelectedBook(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Não foi possível consultar os livros. Tente novamente.");
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("A API retornou um formato de dados inesperado.");
      }
      setBooks(data);
    } catch (err) {
      setError(err.message || "Ocorreu um erro inesperado.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <header className="hero">
        <div className="hero-mark" aria-hidden="true">✦</div>
        <p className="kicker">UM MUNDO DE MAGIA E AVENTURA</p>
        <h1>Catálogo de Livros <span>— Harry Potter</span></h1>
        <p className="intro">
          Explore os livros da saga, escolha uma história e descubra seus detalhes.
        </p>
        <button className="search-button" onClick={buscarLivros} disabled={loading}>
          {loading ? "Buscando..." : "Buscar Livros"}
        </button>
      </header>

      <section className="content">
        <div className="list-panel">
          <div className="section-heading">
            <span className="section-icon">✧</span>
            <div>
              <p className="kicker">BIBLIOTECA</p>
              <h2>Livros disponíveis</h2>
            </div>
          </div>

          {loading && <p className="notice">Carregando livros....</p>}
          {error && <p className="error" role="alert">{error}</p>}
          {!loading && !error && !searched && (
            <p className="notice">Clique em “Buscar Livros” para carregar a lista.</p>
          )}
          {!loading && !error && searched && books.length === 0 && (
            <p className="notice">Nenhum livro foi encontrado.</p>
          )}
          {!loading && !error && books.length > 0 && (
            <BookList books={books} onSelectBook={setSelectedBook} selectedBook={selectedBook} />
          )}
        </div>

        <div className="details-panel">
          <div className="section-heading">
            <span className="section-icon">✧</span>
            <div>
              <p className="kicker">SUA LEITURA</p>
              <h2>Detalhes do livro</h2>
            </div>
          </div>
          <BookDetails book={selectedBook} />
        </div>
      </section>

      <footer className="footer">Catálogo desenvolvido com React · Dados fornecidos pela PotterAPI</footer>
    </main>
  );
}
