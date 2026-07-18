"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyBorrowPage() {
  const router = useRouter();

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const borrowings = JSON.parse(localStorage.getItem("borrowings") || "[]");

    const myBorrowings = borrowings;

    setData(myBorrowings);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100";

      case "rejected":
        return "text-red-600 bg-red-100";

      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-[#8B5E3C]">
            Status Peminjaman
          </h1>

          <p className="text-gray-500 mt-2">
            Pantau seluruh permintaan peminjaman buku Anda.
          </p>

          <button
            onClick={() => router.push("/")}
            className="
              mt-5
              bg-[#8B5E3C]
              text-white
              px-6
              py-3
              rounded-xl
              hover:bg-[#70492D]
              transition
            "
          >
            ← Kembali ke Beranda
          </button>
        </div>

        {/* Empty State */}
        {data.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 shadow">
            <h2 className="text-2xl font-semibold">Belum Ada Peminjaman</h2>

            <p className="text-gray-500 mt-2">
              Silakan pinjam buku terlebih dahulu.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  border
                  border-[#EADBC8]
                  p-8
                  hover:shadow-xl
                  transition
                "
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold text-[#8B5E3C]">
                      {item.buku}
                    </h2>

                    <p className="text-gray-500 mt-2">Peminjam: {item.nama}</p>
                  </div>

                  <span
                    className={`
                      px-5
                      py-2
                      rounded-full
                      font-semibold
                      ${getStatusColor(item.status)}
                    `}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Detail */}
                <div className="grid md:grid-cols-2 gap-5 mt-8">
                  <div className="bg-[#FAF7F2] p-4 rounded-xl">
                    <p className="text-gray-500">Tanggal Pinjam</p>

                    <h3 className="font-semibold">{item.borrowDate}</h3>
                  </div>

                  <div className="bg-[#FAF7F2] p-4 rounded-xl">
                    <p className="text-gray-500">Tanggal Kembali</p>

                    <h3 className="font-semibold">{item.returnDate}</h3>
                  </div>
                </div>

                {/* Status Message */}
                <div className="mt-6">
                  {item.status === "pending" && (
                    <div className="bg-yellow-100 rounded-xl p-4">
                      ⏳ Permintaan Anda sedang diproses oleh admin.
                    </div>
                  )}

                  {item.status === "approved" && (
                    <div className="bg-green-100 rounded-xl p-4">
                      ✅ Permintaan telah disetujui. Silakan ambil buku di
                      perpustakaan.
                    </div>
                  )}

                  {item.status === "rejected" && (
                    <div className="bg-red-100 rounded-xl p-4">
                      ❌ Permintaan ditolak. Silakan hubungi admin.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
