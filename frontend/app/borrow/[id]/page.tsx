"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function BorrowPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nim, setNim] = useState("");
  const [phone, setPhone] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [reason, setReason] = useState("");

  const books = [
    {
      id: "1",
      title: "Clean Code",
    },
    {
      id: "2",
      title: "Atomic Habits",
    },
    {
      id: "3",
      title: "Deep Work",
    },
    {
      id: "4",
      title: "Design Patterns",
    },
  ];

  const selectedBook = books.find((book) => book.id === params.id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const borrowing = {
      id: Date.now(),
      nama,
      nim,
      email,
      phone,
      buku: selectedBook?.title,
      status: "pending",
      borrowDate,
      returnDate,
      reason,
    };

    const oldData = JSON.parse(localStorage.getItem("borrowings") || "[]");

    localStorage.setItem("borrowings", JSON.stringify([...oldData, borrowing]));

    setTimeout(() => {
      router.push("/my-borrow");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold text-[#8B5E3C]">
          Form Peminjaman Buku
        </h1>

        <p className="text-gray-500 mt-2">
          Lengkapi data di bawah untuk melakukan peminjaman buku.
        </p>

        <div className="mt-5 bg-[#FAF7F2] p-5 rounded-2xl">
          <p className="text-gray-500">Buku yang dipilih</p>

          <h2 className="text-2xl font-bold text-[#8B5E3C]">
            {selectedBook?.title}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full p-4 border rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="NIM / NIK"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            className="w-full p-4 border rounded-xl"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="Nomor HP"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-4 border rounded-xl"
            required
          />

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label>Tanggal Pinjam</label>

              <input
                type="date"
                value={borrowDate}
                onChange={(e) => setBorrowDate(e.target.value)}
                className="w-full p-4 border rounded-xl mt-2"
                required
              />
            </div>

            <div>
              <label>Tanggal Kembali</label>

              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full p-4 border rounded-xl mt-2"
                required
              />
            </div>
          </div>

          <textarea
            placeholder="Alasan meminjam buku..."
            rows={5}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-4 border rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-[#8B5E3C]
              text-white
              p-4
              rounded-xl
              hover:bg-[#70492D]
            "
          >
            {loading ? "Mengirim..." : "Kirim Permintaan"}
          </button>
        </form>
      </div>
    </div>
  );
}
