"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminBooksPage() {
  const router = useRouter();

  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("books") || "[]");

    if (data.length === 0) {
      const defaultBooks = [
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
      ];

      localStorage.setItem("books", JSON.stringify(defaultBooks));

      setBooks(defaultBooks);
    } else {
      setBooks(data);
    }
  }, []);
  const deleteBook = (id: number) => {
    const filtered = books.filter((book) => book.id !== id);

    localStorage.setItem("books", JSON.stringify(filtered));

    setBooks(filtered);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-10">
      {/* Header */}
      <div
        className="
        bg-gradient-to-r
        from-[#8B5E3C]
        to-[#D4A373]
        rounded-3xl
        p-8
        mb-10
        shadow-xl
        text-white
        flex
        justify-between
        items-center
      "
      >
        <div>
          <p className="text-sm uppercase tracking-widest text-[#F5E6D3]">
            Admin Panel
          </p>

          <h1 className="text-5xl font-bold mt-2">Kelola Buku</h1>

          <p className="mt-3 text-lg text-[#FFF4E6]">
            Tambah, edit, dan hapus koleksi buku perpustakaan.
          </p>
        </div>

        <button
          onClick={() => router.push("/admin/books/add")}
          className="
          bg-white
          text-[#8B5E3C]
          px-6
          py-3
          rounded-xl
          font-semibold
          shadow
          hover:bg-[#FAF7F2]
          transition
        "
        >
          + Tambah Buku
        </button>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push("/admin/dashboard")}
        className="
        mb-8
        bg-white
        px-5
        py-3
        rounded-xl
        shadow
        hover:shadow-lg
        transition
        text-[#8B5E3C]
        font-semibold
      "
      >
        ← Dashboard
      </button>

      {/* Book List */}
      <div
        className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
      "
      >
        {books.map((book) => (
          <div
            key={book.id}
            className="
            bg-white
            rounded-3xl
            p-6
            shadow-lg
            hover:shadow-2xl
            hover:-translate-y-2
            transition
            border
            border-[#EADBC8]
          "
          >
            <div
              className="
              w-14
              h-14
              rounded-2xl
              bg-[#D4A373]
              flex
              items-center
              justify-center
              text-white
              text-2xl
              mb-5
            "
            >
              📚
            </div>

            <h2
              className="
              text-2xl
              font-bold
              text-[#8B5E3C]
            "
            >
              {book.title}
            </h2>

            <p className="text-gray-500 mt-2">{book.author}</p>

            <span
              className="
              inline-block
              mt-4
              bg-[#FAE6D1]
              text-[#8B5E3C]
              px-4
              py-2
              rounded-full
              text-sm
              font-medium
            "
            >
              {book.category}
            </span>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => router.push(`/admin/books/edit/${book.id}`)}
                className="
                flex-1
                bg-blue-500
                text-white
                py-3
                rounded-xl
                hover:bg-blue-600
                transition
              "
              >
                Edit
              </button>

              <button
                onClick={() => deleteBook(book.id)}
                className="
                flex-1
                bg-red-500
                text-white
                py-3
                rounded-xl
                hover:bg-red-600
                transition
              "
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
