"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      alert("Registrasi berhasil!");
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-[#EADBC8]
          p-8
        "
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#8B5E3C]">Buat Akun Baru</h1>

          <p className="text-gray-500 mt-2">Bergabung dengan Ruang Baca</p>

          <p className="text-sm text-gray-400 mt-1">
            Mulai menjelajahi koleksi buku dan nikmati pengalaman perpustakaan
            digital modern.
          </p>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className="
      h-24
      w-24
      rounded-full
      bg-[#D4A373]
      flex
      items-center
      justify-center
      text-5xl
      shadow-xl
    "
          >
            📖
          </div>
        </div>

        <div className="mb-6 rounded-2xl bg-[#FAF3EA] p-4 border border-[#EADBC8]">
          <h2 className="font-semibold text-[#8B5E3C]">
            Jadilah Bagian dari Ruang Baca
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Buat akun untuk mengakses dashboard, histori peminjaman, dan
            berbagai fitur perpustakaan digital.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="
              w-full
              p-4
              rounded-xl
              border
              border-[#EADBC8]
              focus:ring-2
              focus:ring-[#D4A373]
              outline-none
            "
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="
              w-full
              p-4
              rounded-xl
              border
              border-[#EADBC8]
              focus:ring-2
              focus:ring-[#D4A373]
              outline-none
            "
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full
              p-4
              rounded-xl
              border
              border-[#EADBC8]
              focus:ring-2
              focus:ring-[#D4A373]
              outline-none
            "
            required
          />

          <input
            type="password"
            placeholder="Konfirmasi Password"
            className="
              w-full
              p-4
              rounded-xl
              border
              border-[#EADBC8]
              focus:ring-2
              focus:ring-[#D4A373]
              outline-none
            "
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="
w-full
p-4
rounded-xl
bg-[#D4A373]
text-white
font-semibold
hover:bg-[#C4925E]
transition
shadow-lg
"
          >
            {loading ? "Loading..." : "Daftar"}
          </button>
        </form>

        {/* Benefit */}
        <div className="mt-6 text-center text-sm text-gray-500 space-y-1">
          <p>✓ Akses ribuan buku</p>
          <p>✓ Riwayat peminjaman</p>
          <p>✓ Dashboard personal</p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500">Sudah punya akun?</p>

          <Link href="/login" className="font-semibold text-[#8B5E3C]">
            Masuk sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
