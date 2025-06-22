import { mockBooks } from "../data/mockBooks";
const STORAGE_KEY = "book_data";

// ดึงข้อมูลทั้งหมด
export function getBooks() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    // หากยังไม่มีข้อมูลใหใช้ mock data แทน
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockBooks));
    return mockBooks;
  }
  return JSON.parse(data);
}

// เพิ่มหนังสือใหม่
export function saveBook(book) {
  const books = getBooks();
  books.unshift(book);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

// ลบหนังสือ
export function deleteBook(id) {
  const books = getBooks();
  const updated = books.filter((b) => b._id !== id);
  localStorage.setItem("book_data", JSON.stringify(updated));
}

// แก้ไขข้อมูลหนังสือ
export function updateBook(updatedBook) {
  const books = getBooks().map((b) =>
    b._id === updatedBook._id ? updatedBook : b
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}
