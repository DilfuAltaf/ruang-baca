"use client";

import Link from "next/link";
import { useState } from "react";

const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
  },
  {
    id: 3,
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
  },
  {
    id: 4,
    title: "Design Patterns",
    author: "Gang of Four",
    category: "Programming",
  },
];

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()),
  );

  <input
    type="text"
    placeholder="Cari buku..."
    className="border p-3 rounded-lg w-full mb-6"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />;
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Daftar Buku</h1>

      <div className="grid md:grid-cols-2 gap-5">
        {filteredBooks.map((book) => (
          <div key={book.id} className="border rounded-xl p-5 shadow">
            <h2 className="text-xl font-semibold">{book.title}</h2>

            <p>{book.author}</p>

            <p className="text-gray-500">{book.category}</p>

            <Link
              href={`/books/${book.id}`}
              className="text-blue-500 mt-3 inline-block"
            >
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
