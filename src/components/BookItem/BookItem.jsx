import "./BookItem.css";

function getYear(date) {
  if (!date) return "Ano não informado";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? String(date) : parsed.getFullYear();
}

export default function BookItem({ book, onSelectBook, isSelected }) {
  return (
    <li className="book-item">
      <button
        className={`book-item-button ${isSelected ? "selected" : ""}`}
        type="button"
        onClick={() => onSelectBook(book)}
      >
        <span className="book-item-title">{book.title || "Título não informado"}</span>
        <span className="book-item-year">{getYear(book.releaseDate)}</span>
      </button>
    </li>
  );
}
