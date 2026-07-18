import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-6xl font-bold text-[#8B5E3C]">
          Ruang Baca
        </h1>

        <p className="mt-5 text-xl text-gray-600">
          Sistem Manajemen Perpustakaan Modern
        </p>

        <div className="mt-10 flex gap-5">
          <Link
            href="/books"
            className="bg-[#8B5E3C] text-white px-6 py-3 rounded-xl"
          >
            Jelajahi Buku
          </Link>

          <Link
            href="/admin/login"
            className="border px-6 py-3 rounded-xl"
          >
            Login Admin
          </Link>
        </div>
      </div>
    </div>
  );
}