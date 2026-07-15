"use client";

import { BookOpen, BookMarked, History, User } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const stats = [
    {
      title: "Total Buku",
      value: 150,
      icon: BookOpen,
    },
    {
      title: "Sedang Dipinjam",
      value: 3,
      icon: BookMarked,
    },
    {
      title: "Riwayat Peminjaman",
      value: 10,
      icon: History,
    },
    {
      title: "Profile User",
      value: "Aktif",
      icon: User,
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#FAF7F2] p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#8B5E3C]">Ruang Baca</h1>

          <p className="italic text-gray-500">
            "Knowledge is the key to the future."
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#8B5E3C] to-[#D4A373] rounded-3xl p-10 text-white mb-10">
          <h2 className="text-4xl font-bold">Selamat Datang, Dilfu</h2>

          <p className="mt-3">
            Jelajahi ribuan buku dan tingkatkan pengetahuanmu setiap hari.
          </p>
        </div>

        {/* Statistik */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            <Icon className="w-10 h-10 text-[#D4A373]" />;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition p-6 border border-[#F0E4D4]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{item.title}</p>

                    <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
                  </div>

                  <Icon className="w-10 h-10 text-[#D4A373]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="mt-10 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Recent Activity</h2>

          <div className="space-y-4">
            <div className="border-b pb-3">
              <p className="font-medium">Meminjam buku "Clean Code"</p>

              <p className="text-sm text-gray-500">15 Juli 2026</p>
            </div>

            <div className="border-b pb-3">
              <p className="font-medium">Mengembalikan "Atomic Habits"</p>

              <p className="text-sm text-gray-500">14 Juli 2026</p>
            </div>

            <div className="pb-3">
              <p className="font-medium">Membaca "Deep Work"</p>

              <p className="text-sm text-gray-500">13 Juli 2026</p>
            </div>
          </div>
        </div>

        {/* Quick Menu */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-5">Quick Menu</h2>

          <div className="grid md:grid-cols-3 gap-5">
            <div
              onClick={() => router.push("/books")}
              className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">Daftar Buku</h3>

              <p className="text-gray-500 mt-2">Lihat seluruh koleksi buku.</p>
            </div>

            <div
              onClick={() => router.push("/history")}
              className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">Riwayat</h3>

              <p className="text-gray-500 mt-2">Lihat histori peminjaman.</p>
            </div>

            <div
              onClick={() => router.push("/profile")}
              className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">Profile</h3>

              <p className="text-gray-500 mt-2">Kelola informasi akun Anda.</p>
            </div>

            <div
              onClick={() => {
                localStorage.removeItem("user");
                router.push("/login");
              }}
              className="bg-red-100 rounded-2xl shadow p-6 cursor-pointer hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg text-red-600">Logout</h3>

              <p className="text-gray-500 mt-2">Keluar dari aplikasi.</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
