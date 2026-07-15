"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Dilfu Altaf",
          email,
          role: "user",
        }),
      );

      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#EADBC8] p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#8B5E3C]">Ruang Baca</h1>

          <p className="text-gray-500 mt-2">Library Management System</p>
        </div>

        <div className="flex justify-center mb-5">
          <div
            className="
      h-20
      w-20
      rounded-full
      bg-[#D4A373]
      flex
      items-center
      justify-center
      text-4xl
      shadow-lg
    "
          >
            📖
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              placeholder="Masukkan email"
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
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">Password</label>

            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
    w-full
    p-4
    rounded-xl
    bg-[#8B5E3C]
    text-white
    font-semibold
    hover:bg-[#70492D]
    transition
    shadow-lg
  "
          >
            {loading ? "Memproses..." : "Masuk ke Dashboard"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 space-y-1">
          <p>✓ 150+ Koleksi Buku</p>
          <p>✓ Dashboard Personal</p>
          <p>✓ Sistem Peminjaman Modern</p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500">Belum memiliki akun?</p>

          <Link href="/register" className="font-semibold text-[#8B5E3C]">
            Buat akun sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
