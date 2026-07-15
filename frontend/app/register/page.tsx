"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    // Nanti hubungkan ke NestJS + Firebase
    setTimeout(() => {
      alert("Registrasi berhasil!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">
            Ruang Baca
          </h1>

          <p className="text-gray-500 mt-2">
            Buat akun baru
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Nama */}
          <div>
            <label className="block mb-2 font-medium">
              Nama Lengkap
            </label>

            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Minimal 6 karakter"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Konfirmasi Password */}
          <div>
            <label className="block mb-2 font-medium">
              Konfirmasi Password
            </label>

            <input
              type="password"
              placeholder="Masukkan ulang password"
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-gray-500">
            Sudah punya akun?
          </p>

          <Link
            href="/login"
            className="text-blue-600 font-semibold"
          >
            Masuk sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}