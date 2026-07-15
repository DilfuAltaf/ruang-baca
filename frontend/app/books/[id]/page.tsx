"use client";

import { useParams } from "next/navigation";

const books = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "A Handbook of Agile Software Craftsmanship.",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    description: "An Easy & Proven Way to Build Good Habits.",
  },
  {
    id: "3",
    title: "Deep Work",
    author: "Cal Newport",
    description: "Rules for Focused Success in a Distracted World.",
  },
];

export default function DetailBook() {
  const params = useParams();

  const book = books.find((item) => item.id === params.id);

  if (!book) {
    return <h1>Buku tidak ditemukan.</h1>;
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">{book.title}</h1>

      <p className="mt-4 text-lg">Penulis: {book.author}</p>

      <p className="mt-4 text-gray-600">{book.description}</p>

      <button className="mt-6 bg-blue-500 text-white px-5 py-2 rounded-lg">
        Pinjam Buku
      </button>
    </div>
  );
}
