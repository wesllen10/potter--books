import "./BookDetails.css";

function getYear(date) {
  if (!date) return "Não informado";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? String(date) : parsed.getFullYear();
}

export default function BookDetails({ book }) {
  if (!book) {
    return <p className="empty-details">Selecione um livro para visualizar os detalhes.</p>;
  }

  return (
    <article className="book-card">
      {book.cover ? (
        <img className="book-cover" src={book.cover} alt={`Capa do livro ${book.title || ""}`} />
      ) : (
        <div className="cover-placeholder" role="img" aria-label="Capa não disponível">
          <span>✧</span>
          <small>Capa não disponível</small>
        </div>
      )}
      <div className="book-information">
        <h3>{book.title || "Título não informado"}</h3>
        <p className="book-year">Ano de publicação: {getYear(book.releaseDate)}</p>
        <p className="book-description">{book.description || "Descrição não disponível."}</p>
        <p className="pages"><strong>Número de páginas:</strong> {book.pages ?? "Não informado"}</p>
      </div>
    </article>
  );
}
