"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditBookPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem("books") || "[]");

    const book = books.find((item: any) => item.id.toString() === id);

    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setCategory(book.category);
      setDescription(book.description || "");
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const books = JSON.parse(localStorage.getItem("books") || "[]");

    const updatedBooks = books.map((book: any) =>
      book.id.toString() === id
        ? {
            ...book,
            title,
            author,
            category,
            description,
          }
        : book,
    );

    localStorage.setItem("books", JSON.stringify(updatedBooks));

    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-10">
      <div
        className="
        max-w-4xl
        mx-auto
      "
      >
        {/* Header */}
        <div
          className="
          bg-gradient-to-r
          from-[#8B5E3C]
          to-[#D4A373]
          rounded-3xl
          p-8
          text-white
          shadow-xl
          mb-8
        "
        >
          <p className="text-sm uppercase tracking-widest text-[#F5E6D3]">
            Admin Panel
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-2">Edit Buku</h1>

          <p className="mt-3 text-lg text-[#FFF4E6]">
            Perbarui informasi koleksi buku perpustakaan.
          </p>
        </div>

        {/* Form Card */}
        <div
          className="
          bg-white
          rounded-3xl
          shadow-xl
          p-8
          border
          border-[#EADBC8]
        "
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul */}
            <div>
              <label className="font-semibold text-[#8B5E3C]">Judul Buku</label>

              <input
                type="text"
                placeholder="Masukkan judul buku"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="
                mt-2
                w-full
                p-4
                rounded-xl
                border
                border-[#EADBC8]
                outline-none
                focus:ring-2
                focus:ring-[#D4A373]
              "
                required
              />
            </div>

            {/* Author */}
            <div>
              <label className="font-semibold text-[#8B5E3C]">Penulis</label>

              <input
                type="text"
                placeholder="Masukkan nama penulis"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="
                mt-2
                w-full
                p-4
                rounded-xl
                border
                border-[#EADBC8]
                outline-none
                focus:ring-2
                focus:ring-[#D4A373]
              "
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="font-semibold text-[#8B5E3C]">Kategori</label>

              <input
                type="text"
                placeholder="Contoh: Programming"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="
                mt-2
                w-full
                p-4
                rounded-xl
                border
                border-[#EADBC8]
                outline-none
                focus:ring-2
                focus:ring-[#D4A373]
              "
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold text-[#8B5E3C]">
                Deskripsi Buku
              </label>

              <textarea
                rows={6}
                placeholder="Masukkan deskripsi buku"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="
                mt-2
                w-full
                p-4
                rounded-xl
                border
                border-[#EADBC8]
                outline-none
                resize-none
                focus:ring-2
                focus:ring-[#D4A373]
              "
              />
            </div>

            {/* Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/admin/dashboard")}
                className="
      flex-1
      bg-gray-100
      text-gray-700
      py-4
      rounded-xl
      font-semibold
      hover:bg-gray-200
      transition
    "
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
      flex-1
      bg-[#8B5E3C]
      text-white
      py-4
      rounded-xl
      font-semibold
      hover:bg-[#70492D]
      transition
      shadow
      disabled:opacity-50
    "
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
