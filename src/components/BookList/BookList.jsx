import BookItem from "../BookItem/BookItem";
import "./BookList.css";

export default function BookList({ books, onSelectBook, selectedBook }) {
  return (
    <ul className="book-list">
      {books.map((book, index) => {
        const stableId = book.number ?? book.id ?? book.title ?? index;
        return (
          <BookItem
            key={stableId}
            book={book}
            onSelectBook={onSelectBook}
            isSelected={selectedBook === book}
          />
        );
      })}
    </ul>
  );
}
