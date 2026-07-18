"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Users, CheckCircle, Clock } from "lucide-react";

export default function ReportsPage() {
  const router = useRouter();

  const [borrowings, setBorrowings] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("borrowings") || "[]");

    setBorrowings(data);
  }, []);

  const total = borrowings.length;

  const approved = borrowings.filter((b) => b.status === "approved").length;

  const pending = borrowings.filter((b) => b.status === "pending").length;

  const readers = new Set(borrowings.map((b) => b.email)).size;

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-10">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="
            flex
            items-center
            gap-2
            bg-white
            px-5
            py-3
            rounded-2xl
            shadow
            mb-8
          "
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-[#8B5E3C]">
            Laporan Perpustakaan
          </h1>

          <p className="text-gray-500 mt-2">Ringkasan aktivitas Ruang Baca.</p>
        </div>

        {/* Statistik */}
        <div className="grid md:grid-cols-4 gap-5 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow">
            <BookOpen className="text-[#D4A373]" size={40} />

            <h3 className="mt-4 text-gray-500">Total Peminjaman</h3>

            <h2 className="text-4xl font-bold">{total}</h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <Users className="text-[#D4A373]" size={40} />

            <h3 className="mt-4 text-gray-500">Total Pembaca</h3>

            <h2 className="text-4xl font-bold">{readers}</h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <CheckCircle className="text-green-500" size={40} />

            <h3 className="mt-4 text-gray-500">Approved</h3>

            <h2 className="text-4xl font-bold text-green-500">{approved}</h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <Clock className="text-yellow-500" size={40} />

            <h3 className="mt-4 text-gray-500">Pending</h3>

            <h2 className="text-4xl font-bold text-yellow-500">{pending}</h2>
          </div>
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-2xl font-bold mb-6">Detail Peminjaman</h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-4">Nama</th>

                <th className="text-left pb-4">Buku</th>

                <th className="text-left pb-4">Tanggal</th>

                <th className="text-left pb-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {borrowings.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-4">{item.nama}</td>

                  <td>{item.buku}</td>

                  <td>{item.borrowDate}</td>

                  <td>
                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        ${
                          item.status === "approved"
                            ? "bg-green-100 text-green-600"
                            : item.status === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {borrowings.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Belum ada data laporan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
