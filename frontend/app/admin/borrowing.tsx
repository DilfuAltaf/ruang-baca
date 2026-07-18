"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BorrowingsPage() {
  const router = useRouter();
  const [borrowings, setBorrowings] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("borrowings") || "[]");

    setBorrowings(data);
  }, []);

  const updateStatus = (id: number, status: string) => {
    const updated = borrowings.map((item) =>
      item.id === id ? { ...item, status } : item,
    );

    localStorage.setItem("borrowings", JSON.stringify(updated));

    setBorrowings(updated);
  };

  const getStatus = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-600";

      case "rejected":
        return "bg-red-100 text-red-600";

      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-10">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
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
    shadow-md
    border
    border-[#EADBC8]
    mb-6
    hover:bg-[#F8F1E7]
    transition
  "
        >
          <ArrowLeft size={18} />
          Kembali ke Dashboard
        </button>

        {/* Header */}
        <div className="mb-10"></div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-[#8B5E3C]">Data Peminjaman</h1>

          <p className="text-gray-500 mt-2">
            Kelola seluruh permintaan peminjaman buku.
          </p>
        </div>

        {/* Statistik */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow">
            <h3 className="text-gray-500">Total Permintaan</h3>

            <h2 className="text-4xl font-bold text-[#8B5E3C] mt-2">
              {borrowings.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <h3 className="text-gray-500">Pending</h3>

            <h2 className="text-4xl font-bold text-yellow-500 mt-2">
              {borrowings.filter((b) => b.status === "pending").length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <h3 className="text-gray-500">Approved</h3>

            <h2 className="text-4xl font-bold text-green-500 mt-2">
              {borrowings.filter((b) => b.status === "approved").length}
            </h2>
          </div>
        </div>

        {/* Card */}
        <div className="space-y-6">
          {borrowings.map((item) => (
            <div
              key={item.id}
              className="
                bg-white
                rounded-3xl
                shadow-lg
                border
                border-[#EADBC8]
                p-8
              "
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-[#8B5E3C]">
                    {item.buku}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Diajukan oleh:
                    {item.nama}
                  </p>
                </div>

                <span
                  className={`
                    px-5
                    py-2
                    rounded-full
                    font-semibold
                    ${getStatus(item.status)}
                  `}
                >
                  {item.status}
                </span>
              </div>

              {/* Detail */}
              <div className="grid md:grid-cols-2 gap-5 mt-8">
                <div className="bg-[#FAF7F2] p-4 rounded-xl">
                  <p className="text-gray-500">Email</p>

                  <h3 className="font-semibold">{item.email}</h3>
                </div>

                <div className="bg-[#FAF7F2] p-4 rounded-xl">
                  <p className="text-gray-500">NIM / NIK</p>

                  <h3 className="font-semibold">{item.nim}</h3>
                </div>

                <div className="bg-[#FAF7F2] p-4 rounded-xl">
                  <p className="text-gray-500">Nomor HP</p>

                  <h3 className="font-semibold">{item.phone}</h3>
                </div>

                <div className="bg-[#FAF7F2] p-4 rounded-xl">
                  <p className="text-gray-500">Tanggal Pinjam</p>

                  <h3 className="font-semibold">{item.borrowDate}</h3>
                </div>

                <div className="bg-[#FAF7F2] p-4 rounded-xl">
                  <p className="text-gray-500">Tanggal Kembali</p>

                  <h3 className="font-semibold">{item.returnDate}</h3>
                </div>
              </div>

              {/* Alasan */}
              <div className="mt-5 bg-[#FAF7F2] rounded-xl p-5">
                <p className="text-gray-500 mb-2">Alasan Meminjam</p>

                <p>{item.reason}</p>
              </div>

              {/* Button */}
              {item.status === "pending" && (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => updateStatus(item.id, "approved")}
                    className="
                      bg-green-500
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      hover:bg-green-600
                    "
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(item.id, "rejected")}
                    className="
                      bg-red-500
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      hover:bg-red-600
                    "
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
