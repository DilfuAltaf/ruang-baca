"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Star, BookOpen } from "lucide-react";

export default function DetailBookPage() {
  const params = useParams();
  const router = useRouter();

  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem("books") || "[]");

    const selectedBook = books.find((b: any) => b.id === Number(params.id));

    setBook(selectedBook);
  }, [params.id]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Buku Tidak Ditemukan</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-10">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <button
          onClick={() => router.push("/books")}
          className="
            flex
            items-center
            gap-2
            mb-8
            text-[#8B5E3C]
            font-medium
          "
        >
          <ArrowLeft size={18} />
          Kembali ke Koleksi Buku
        </button>

        {/* Card */}
        <div
          className="
            bg-white
            rounded-3xl
            shadow-xl
            overflow-hidden
            grid
            lg:grid-cols-2
          "
        >
          {/* Cover */}
          <div className="p-10 flex justify-center">
            <img
              src={book.image}
              alt={book.title}
              className="
                h-[550px]
                rounded-3xl
                object-cover
                shadow-2xl
              "
            />
          </div>

          {/* Content */}
          <div className="p-10">
            <span
              className="
                px-4
                py-2
                rounded-full
                bg-[#D4A373]
                text-white
              "
            >
              {book.category}
            </span>

            <h1 className="text-5xl font-bold mt-5">{book.title}</h1>

            <p className="text-xl text-gray-500 mt-3">{book.author}</p>

            <div className="flex items-center gap-2 mt-5">
              <Star className="text-yellow-500" />
              <span>{book.rating}</span>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-semibold">Deskripsi</h2>

              <p className="text-gray-600 mt-4 leading-8">{book.description}</p>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-5 mt-10">
              <div className="bg-[#FAF7F2] p-5 rounded-2xl">
                <BookOpen size={24} />

                <h3 className="font-semibold mt-2">Kategori</h3>

                <p>{book.category}</p>
              </div>

              <div className="bg-[#FAF7F2] p-5 rounded-2xl">
                <Star size={24} />

                <h3 className="font-semibold mt-2">Rating</h3>

                <p>{book.rating}</p>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => router.push(`/borrow/${book.id}`)}
              className="
                w-full
                mt-10
                bg-[#8B5E3C]
                text-white
                py-5
                rounded-2xl
                text-lg
                font-semibold
                hover:bg-[#70492D]
                transition
              "
            >
              Pinjam Buku
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
