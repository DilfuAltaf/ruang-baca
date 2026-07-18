"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReadersPage() {
  const router = useRouter();

  const [readers, setReaders] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("borrowings") || "[]");

    // Hilangkan duplikat email
    const uniqueReaders = data.filter(
      (reader: any, index: number, self: any[]) =>
        index === self.findIndex((r) => r.email === reader.email),
    );

    setReaders(uniqueReaders);
  }, []);

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
            mb-5
          "
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-[#8B5E3C]">Data Pembaca</h1>

          <p className="text-gray-500 mt-2">
            Seluruh pengguna yang pernah melakukan peminjaman buku.
          </p>
        </div>

        {/* Statistik */}
        <div className="bg-white rounded-3xl shadow p-6 mb-10">
          <p className="text-gray-500">Total Pembaca</p>

          <h2 className="text-5xl font-bold text-[#8B5E3C] mt-2">
            {readers.length}
          </h2>
        </div>

        {/* Readers */}
        <div className="grid md:grid-cols-2 gap-6">
          {readers.map((reader) => (
            <div
              key={reader.email}
              className="
                bg-white
                rounded-3xl
                shadow-lg
                p-6
                border
                border-[#EADBC8]
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    h-16
                    w-16
                    rounded-full
                    bg-[#D4A373]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <User size={28} color="white" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">{reader.nama}</h2>

                  <p className="text-gray-500">{reader.email}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div>
                  <p className="text-gray-500">NIM / NIK</p>

                  <h3>{reader.nim}</h3>
                </div>

                <div>
                  <p className="text-gray-500">Nomor HP</p>

                  <h3>{reader.phone}</h3>
                </div>

                <div>
                  <p className="text-gray-500">Buku Terakhir</p>

                  <h3>{reader.buku}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {readers.length === 0 && (
          <div className="bg-white p-10 rounded-3xl shadow text-center">
            <h2 className="text-2xl font-bold">Belum Ada Pembaca</h2>

            <p className="text-gray-500 mt-2">
              Data akan muncul setelah seseorang melakukan peminjaman.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
