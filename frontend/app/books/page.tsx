"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Star } from "lucide-react";

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("books") || "[]");

    if (data.length === 0) {
      const defaultBooks = [
        {
          id: 1,
          title: "Clean Code",
          author: "Robert C. Martin",
          category: "Programming",
          rating: 4.8,
          stock: 5,
          image:
            "https://images-na.ssl-images-amazon.com/images/I/41jEbK-jG+L.jpg",
        },
        {
          id: 2,
          title: "Atomic Habits",
          author: "James Clear",
          category: "Self Development",
          rating: 4.9,
          stock: 3,
          image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
        },
        {
          id: 3,
          title: "Deep Work",
          author: "Cal Newport",
          category: "Productivity",
          rating: 4.7,
          stock: 7,
          image: "https://m.media-amazon.com/images/I/41-sN-mzwKL.jpg",
        },
        {
          id: 4,
          title: "Design Patterns",
          author: "Gang of Four",
          category: "Programming",
          rating: 4.8,
          stock: 4,
          image: "https://m.media-amazon.com/images/I/81gtKoapHFL.jpg",
        },
      ];

      localStorage.setItem("books", JSON.stringify(defaultBooks));

      setBooks(defaultBooks);
    } else {
      setBooks(data);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-10">
      {/* Hero */}
      <div
        className="
    relative
    overflow-hidden
    bg-gradient-to-br
    from-[#6F4328]
    via-[#8B5E3C]
    to-[#D4A373]
    rounded-3xl
    p-10
    md:p-14
    text-white
    mb-10
    shadow-xl
  "
      >
        {/* Background Decoration */}
        <div
          className="
      absolute
      -top-20
      -right-20
      w-72
      h-72
      bg-white/10
      rounded-full
    "
        />

        <div
          className="
      absolute
      -bottom-24
      -left-20
      w-80
      h-80
      bg-white/10
      rounded-full
    "
        />

        <div className="relative z-10">
          <p
            className="
  uppercase
  tracking-widest
  text-sm
  text-[#F5E6D3]
  font-semibold
"
          >
            Sistem Informasi Perpustakaan Sekolah
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mt-3 leading-tight">
            Sistem Informasi
            <br />
            Perpustakaan Sekolah
          </h1>

          <p className="mt-5 text-lg md:text-xl text-[#FFF4E6] max-w-2xl">
            Platform digital untuk mendukung pengelolaan perpustakaan, layanan
            peminjaman buku, serta akses informasi koleksi bagi seluruh civitas
            sekolah.
          </p>
        </div>
      </div>

      <div
        className="
  bg-white
  rounded-3xl
  p-8
  shadow-lg
  mb-10
  border-l-8
  border-[#D4A373]
"
      >
        <h2 className="text-2xl font-bold text-[#8B5E3C]">
          Pengumuman Perpustakaan
        </h2>

        <ul className="mt-4 space-y-2 text-gray-600">
          <li>📚 Maksimal peminjaman 3 buku.</li>
          <li>⏰ Durasi peminjaman selama 7 hari.</li>
          <li>💰 Keterlambatan dikenakan denda sesuai aturan.</li>
          <li>🏫 Buku hanya untuk warga sekolah.</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-10">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="text-5xl">📚</div>
          <h2 className="text-xl font-bold text-[#8B5E3C] mt-4">
            Koleksi Lengkap
          </h2>

          <p className="text-gray-500 mt-2">
            Ribuan koleksi buku pelajaran dan literatur tersedia.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="text-5xl">💻</div>

          <h2 className="text-xl font-bold text-[#8B5E3C] mt-4">
            Layanan Digital
          </h2>

          <p className="text-gray-500 mt-2">
            Ajukan peminjaman buku secara online dengan mudah.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="text-5xl">🏫</div>

          <h2 className="text-xl font-bold text-[#8B5E3C] mt-4">
            Literasi Sekolah
          </h2>

          <p className="text-gray-500 mt-2">
            Mendukung budaya membaca di lingkungan sekolah.
          </p>
        </div>
      </div>

      <div
        className="
    bg-gradient-to-r
    from-[#8B5E3C]
    to-[#D4A373]
    rounded-3xl
    p-8
    text-white
    mb-10
    shadow-xl
  "
      >
        <h2 className="text-3xl font-bold">Jam Operasional Perpustakaan</h2>

        <p className="mt-4 text-lg">Senin - Jumat : 07.00 - 15.00 WIB</p>

        <p className="mt-2 text-lg">Sabtu : 08.00 - 12.00 WIB</p>
      </div>

      {/* Search */}
      <div className="relative mb-10">
        <Search
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          type="text"
          placeholder="Cari buku..."
          className="
            w-full
            rounded-2xl
            border
            border-[#EADBC8]
            p-4
            pl-12
            bg-white
            shadow-sm
            outline-none
            focus:ring-2
            focus:ring-[#D4A373]
          "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter Kategori */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <button
          className="
            px-4
            py-2
            bg-[#8B5E3C]
            text-white
            rounded-full
          "
        >
          Semua
        </button>

        <button
          className="
            px-4
            py-2
            bg-[#D4A373]
            text-white
            rounded-full
          "
        >
          Programming
        </button>

        <button
          className="
            px-4
            py-2
            bg-[#D4A373]
            text-white
            rounded-full
          "
        >
          Self Development
        </button>

        <button
          className="
            px-4
            py-2
            bg-[#D4A373]
            text-white
            rounded-full
          "
        >
          Productivity
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-5 mb-10">
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-gray-500">Total Buku</h3>
          <h1 className="text-4xl font-bold text-[#8B5E3C]">{books.length}</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-gray-500">Kategori</h3>
          <h1 className="text-4xl font-bold text-[#8B5E3C]">10+</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-gray-500">Peminjaman</h3>
          <h1 className="text-4xl font-bold text-[#8B5E3C]">150+</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-gray-500">Status</h3>
          <h1 className="text-4xl font-bold text-green-500">Online</h1>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-4xl font-bold text-[#8B5E3C]">Koleksi Buku</h2>

        <p className="text-gray-500 mt-2">
          Temukan buku yang ingin Anda pinjam dari perpustakaan.
        </p>
      </div>

      {/* Books */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="
              bg-white
              rounded-3xl
              overflow-hidden
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              transition
            "
          >
            <img
              src={
                book.image ||
                "https://via.placeholder.com/300x450?text=No+Cover"
              }
              alt={book.title}
              className="h-80 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold">{book.title}</h2>

              <p className="text-sm text-gray-500 mt-2">
                Stok: {book.stock} buku
              </p>

              <div className="flex items-center gap-2 mt-3">
                <Star size={16} className="text-yellow-500" />

                <span>{book.rating}</span>
              </div>

              <span
                className="
                  inline-block
                  mt-3
                  px-3
                  py-1
                  rounded-full
                  bg-[#D4A373]
                  text-white
                  text-sm
                "
              >
                {book.category}
              </span>

              <Link
                href={`/books/${book.id}`}
                className="
                  block
                  mt-5
                  text-center
                  bg-[#8B5E3C]
                  text-white
                  py-3
                  rounded-xl
                  hover:bg-[#70492D]
                  transition
                "
              >
                Detail Buku
              </Link>
              <Link
                href={`/borrow/${book.id}`}
                className="
    block
    mt-3
    w-full
    text-center
    bg-[#D4A373]
    text-white
    py-3
    rounded-xl
    hover:bg-[#B88652]
    transition
  "
              >
                Ajukan Peminjaman
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
