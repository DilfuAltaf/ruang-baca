"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookOpen, ArrowLeft } from "lucide-react";

export default function AddBookPage() {
  const router = useRouter();

  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const newBook = {
      id: Date.now(),
      title,
      author,
      category,
      description,
      rating: 4.5,
      image: image || "https://via.placeholder.com/300x450?text=No+Cover",
    };
    const oldBooks = JSON.parse(localStorage.getItem("books") || "[]");

    localStorage.setItem("books", JSON.stringify([...oldBooks, newBook]));

    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="
            flex
            items-center
            gap-2
            mb-5
            text-[#8B5E3C]
            font-medium
          "
        >
          <ArrowLeft size={18} />
          Kembali ke Dashboard
        </button>

        {/* Hero */}
        <div
          className="
            bg-gradient-to-r
            from-[#8B5E3C]
            to-[#D4A373]
            rounded-3xl
            p-8
            text-white
            shadow-lg
            mb-8
          "
        >
          <div className="flex items-center gap-5">
            <div
              className="
                h-20
                w-20
                rounded-full
                bg-white/20
                flex
                items-center
                justify-center
              "
            >
              <BookOpen size={40} />
            </div>

            <div>
              <h1 className="text-4xl font-bold">Tambah Buku Baru</h1>

              <p className="mt-2 text-lg">
                Tambahkan koleksi buku ke dalam perpustakaan Ruang Baca.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-medium">Judul Buku</label>

              <input
                type="text"
                placeholder="Masukkan judul buku"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="
                  w-full
                  mt-2
                  p-4
                  border
                  rounded-xl
                "
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="font-medium">Penulis</label>

                <input
                  type="text"
                  placeholder="Nama penulis"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="
                    w-full
                    mt-2
                    p-4
                    border
                    rounded-xl
                  "
                  required
                />
              </div>

              <div>
                <label className="font-medium">Kategori</label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="
                    w-full
                    mt-2
                    p-4
                    border
                    rounded-xl
                  "
                >
                  <option value="">Pilih Kategori</option>
                  <option>Programming</option>
                  <option>Self Development</option>
                  <option>Productivity</option>
                  <option>Design</option>
                  <option>Novel</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-medium">Deskripsi Buku</label>

              <textarea
                rows={6}
                placeholder="Masukkan deskripsi buku..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="
                  w-full
                  mt-2
                  p-4
                  border
                  rounded-xl
                "
              />
            </div>

            <div>
              <label className="font-medium">Upload Cover (Opsional)</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="
      w-full
      mt-2
      p-4
      border
      rounded-xl
    "
              />

              {/* Preview */}
              {image && (
                <img
                  src={image}
                  alt="Preview Cover"
                  className="
        h-64
        w-48
        object-cover
        rounded-xl
        mt-4
        shadow-lg
        border
      "
                />
              )}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Buku"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
