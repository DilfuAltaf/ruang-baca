"use client";

import {
  BookOpen,
  BookMarked,
  History,
  User,
  FileText,
  LogOut,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();

  const [borrowings, setBorrowings] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("borrowings") || "[]");

    setBorrowings(data);
  }, []);

  const [books, setBooks] = useState<any[]>([]);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("books") || "[]");

    setBooks(data);
  }, []);

  const stats = [
    {
      title: "Total Buku",
      value: books.length,
      icon: BookOpen,
    },
    {
      title: "Peminjaman",
      value: borrowings.length,
      icon: BookMarked,
    },
    {
      title: "Pembaca",
      value: new Set(borrowings.map((b) => b.email)).size,
      icon: User,
    },
    {
      title: "Pending",
      value: borrowings.filter((b) => b.status === "pending").length,
      icon: History,
    },
  ];

  const deleteBook = (id: number) => {
    const filtered = books.filter((book) => book.id !== id);

    localStorage.setItem("books", JSON.stringify(filtered));

    setBooks(filtered);
  };

  const updateStatus = (id: number, status: string) => {
    const updated = borrowings.map((item) =>
      item.id === id ? { ...item, status } : item,
    );

    setBorrowings(updated);

    localStorage.setItem("borrowings", JSON.stringify(updated));
  };
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#FAF7F2] flex">
        {/* Sidebar */}
        <aside
          className="
    w-72
    bg-white
    shadow-xl
    p-6
    flex
    flex-col
    justify-between
    border-r
    border-[#EADBC8]
  "
        >
          <div>
            {/* Logo */}
            <div
              className="
        bg-gradient-to-br
        from-[#8B5E3C]
        to-[#D4A373]
        rounded-3xl
        p-6
        text-white
        shadow-lg
      "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
            bg-white/20
            w-12
            h-12
            rounded-2xl
            flex
            items-center
            justify-center
            text-2xl
          "
                >
                  📖
                </div>

                <div>
                  <h1 className="text-xl font-bold">Ruang Baca</h1>

                  <p className="text-xs text-[#FFF4E6]">Admin Panel</p>
                </div>
              </div>
            </div>

            {/* Menu */}
            <nav className="mt-10 space-y-3">
              <button
                onClick={() => setActiveMenu("dashboard")}
                className={`
  w-full
  flex
  items-center
  gap-4
  px-5
  py-4
  rounded-2xl
  transition
  ${
    activeMenu === "dashboard"
      ? "bg-[#FAE6D1] text-[#8B5E3C] font-semibold"
      : "text-gray-600 hover:bg-[#FAE6D1] hover:text-[#8B5E3C]"
  }
`}
              >
                <BookOpen size={20} />
                Dashboard
              </button>

              <button
                onClick={() => setActiveMenu("books")}
                className={`
  w-full
  flex
  items-center
  gap-4
  px-5
  py-4
  rounded-2xl
  transition
  ${
    activeMenu === "books"
      ? "bg-[#FAE6D1] text-[#8B5E3C] font-semibold"
      : "text-gray-600 hover:bg-[#FAE6D1] hover:text-[#8B5E3C]"
  }
`}
              >
                <BookOpen size={20} />
                Kelola Buku
              </button>

              <button
                onClick={() => setActiveMenu("borrowings")}
                className={`
  w-full
  flex
  items-center
  gap-4
  px-5
  py-4
  rounded-2xl
  transition
  ${
    activeMenu === "borrowings"
      ? "bg-[#FAE6D1] text-[#8B5E3C] font-semibold"
      : "text-gray-600 hover:bg-[#FAE6D1] hover:text-[#8B5E3C]"
  }
`}
              >
                <BookMarked size={20} />
                Peminjaman
              </button>

              <button
                onClick={() => setActiveMenu("readers")}
                className={`
  w-full
  flex
  items-center
  gap-4
  px-5
  py-4
  rounded-2xl
  transition
  ${
    activeMenu === "readers"
      ? "bg-[#FAE6D1] text-[#8B5E3C] font-semibold"
      : "text-gray-600 hover:bg-[#FAE6D1] hover:text-[#8B5E3C]"
  }
`}
              >
                <User size={20} />
                Pembaca
              </button>

              <button
                onClick={() => setActiveMenu("reports")}
                className={`
  w-full
  flex
  items-center
  gap-4
  px-5
  py-4
  rounded-2xl
  transition
  ${
    activeMenu === "reports"
      ? "bg-[#FAE6D1] text-[#8B5E3C] font-semibold"
      : "text-gray-600 hover:bg-[#FAE6D1] hover:text-[#8B5E3C]"
  }
`}
              >
                <FileText size={20} />
                Laporan
              </button>
            </nav>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem("user");
              router.push("/admin/login");
            }}
            className="
      flex
      items-center
      gap-3
      px-5
      py-4
      rounded-2xl
      text-red-500
      hover:bg-red-50
      transition
      font-medium
    "
          >
            <LogOut size={20} />
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">
          {activeMenu === "dashboard" && (
            <>
              {/* Hero */}
              <div className="bg-gradient-to-r from-[#8B5E3C] to-[#D4A373] rounded-3xl p-10 text-white mb-10 shadow-lg">
                <h2 className="text-4xl font-bold">Dashboard Admin</h2>

                <p className="mt-3 text-lg">
                  Kelola koleksi buku, peminjaman, dan data pembaca dalam satu
                  tempat.
                </p>
              </div>

              {/* Statistik */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="
              bg-white
              rounded-3xl
              shadow-md
              p-6
              border
              border-[#F0E4D4]
              "
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-500">{item.title}</p>

                          <h2 className="text-3xl font-bold">{item.value}</h2>
                        </div>

                        <Icon className="text-[#D4A373] w-10 h-10" />
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Aktivitas + Table */}
              <div className="grid lg:grid-cols-2 gap-6 mt-10">
                {/* Aktivitas */}
                <div className="bg-white rounded-3xl p-6 shadow">
                  <h2 className="text-xl font-semibold mb-5">
                    Aktivitas Terbaru
                  </h2>

                  <div className="space-y-4">
                    {borrowings.length > 0 ? (
                      borrowings
                        .slice(-5)
                        .reverse()
                        .map((item) => (
                          <div key={item.id} className="border-b pb-3">
                            <p className="font-medium">
                              {item.nama} meminjam "{item.buku}"
                            </p>

                            <p className="text-sm text-gray-500">
                              Status: {item.status}
                            </p>
                          </div>
                        ))
                    ) : (
                      <p className="text-gray-500">Belum ada aktivitas.</p>
                    )}
                  </div>
                </div>

                {/* Peminjaman Terbaru */}
                <div className="bg-white rounded-3xl p-6 shadow">
                  <h2 className="text-xl font-semibold mb-5">
                    Peminjaman Terbaru
                  </h2>

                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Nama</th>
                        <th className="text-left py-2">Buku</th>
                        <th className="text-left py-2">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {borrowings
                        .slice(-5)
                        .reverse()
                        .map((item) => (
                          <tr key={item.id} className="border-b">
                            <td className="py-3">{item.nama}</td>
                            <td>{item.buku}</td>

                            <td
                              className={
                                item.status === "approved"
                                  ? "text-green-500"
                                  : item.status === "rejected"
                                    ? "text-red-500"
                                    : "text-yellow-500"
                              }
                            >
                              {item.status}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-5">Quick Actions</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div
                    onClick={() => setActiveMenu("books")}
                    className="
        bg-white
        p-6
        rounded-3xl
        shadow
        cursor-pointer
        hover:shadow-xl
        hover:-translate-y-2
        transition
      "
                  >
                    <BookOpen className="text-[#D4A373] w-10 h-10" />

                    <h3 className="font-semibold mt-3">Kelola Buku</h3>

                    <p className="text-sm text-gray-500 mt-2">
                      Tambah, edit, dan hapus buku.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveMenu("borrowings")}
                    className="
        bg-white
        p-6
        rounded-3xl
        shadow
        cursor-pointer
        hover:shadow-xl
        hover:-translate-y-2
        transition
      "
                  >
                    <BookMarked className="text-[#D4A373] w-10 h-10" />

                    <h3 className="font-semibold mt-3">Peminjaman</h3>

                    <p className="text-sm text-gray-500 mt-2">
                      Kelola data peminjaman siswa.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveMenu("readers")}
                    className="
        bg-white
        p-6
        rounded-3xl
        shadow
        cursor-pointer
        hover:shadow-xl
        hover:-translate-y-2
        transition
      "
                  >
                    <User className="text-[#D4A373] w-10 h-10" />

                    <h3 className="font-semibold mt-3">Pembaca</h3>

                    <p className="text-sm text-gray-500 mt-2">
                      Lihat seluruh pengguna perpustakaan.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveMenu("reports")}
                    className="
        bg-white
        p-6
        rounded-3xl
        shadow
        cursor-pointer
        hover:shadow-xl
        hover:-translate-y-2
        transition
      "
                  >
                    <FileText className="text-[#D4A373] w-10 h-10" />

                    <h3 className="font-semibold mt-3">Laporan</h3>

                    <p className="text-sm text-gray-500 mt-2">
                      Lihat statistik dan laporan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Buku Terbaru */}
              <div className="bg-white rounded-3xl shadow p-6 mt-10">
                <h2 className="text-2xl font-semibold mb-5">
                  Buku Terbaru Ditambahkan
                </h2>

                <div className="grid md:grid-cols-4 gap-5">
                  {books
                    .slice(-4)
                    .reverse()
                    .map((book) => (
                      <div key={book.id}>
                        <img
                          src={book.image}
                          className="h-56 w-full object-cover rounded-xl"
                        />

                        <h3 className="font-semibold mt-3">{book.title}</h3>

                        <p className="text-gray-500">{book.author}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Informasi Sistem */}
              <div className="grid md:grid-cols-3 gap-5 mt-10">
                <div className="bg-white p-6 rounded-3xl shadow">
                  <h3 className="font-semibold">Storage</h3>

                  <p className="text-gray-500 mt-2">Local Storage</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow">
                  <h3 className="font-semibold">Total Admin</h3>

                  <p className="text-gray-500 mt-2">1</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow">
                  <h3 className="font-semibold">Status Sistem</h3>

                  <p className="text-green-500 mt-2">Online</p>
                </div>
              </div>
            </>
          )}

          {activeMenu === "books" && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-[#8B5E3C]">
                    Kelola Buku
                  </h1>

                  <p className="text-gray-500 mt-2">
                    Tambahkan, edit, dan hapus koleksi buku.
                  </p>
                </div>

                <button
                  onClick={() => router.push("/admin/books/add")}
                  className="
          bg-[#8B5E3C]
          text-white
          px-5
          py-3
          rounded-xl
        "
                >
                  + Tambah Buku
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="
            bg-white
            rounded-3xl
            shadow-lg
            overflow-hidden
          "
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="
              h-64
              w-full
              object-cover
            "
                    />

                    <div className="p-5">
                      <h2 className="text-xl font-bold">{book.title}</h2>

                      <p className="text-gray-500">{book.author}</p>

                      <span
                        className="
                inline-block
                mt-3
                px-3
                py-1
                bg-[#D4A373]
                text-white
                rounded-full
                text-sm
              "
                      >
                        {book.category}
                      </span>

                      <div className="flex gap-3 mt-5">
                        <button
                          onClick={() => router.push(`/admin/books/edit/${book.id}`)}
                          className="
                  flex-1
                  bg-blue-500
                  text-white
                  py-2
                  rounded-lg
                "
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteBook(book.id)}
                          className="
                  flex-1
                  bg-red-500
                  text-white
                  py-2
                  rounded-lg
                "
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeMenu === "borrowings" && (
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#8B5E3C]">
                  Data Peminjaman
                </h1>

                <p className="text-gray-500 mt-2">
                  Kelola seluruh peminjaman buku perpustakaan.
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4">Nama</th>
                      <th className="text-left">Email</th>
                      <th className="text-left">Buku</th>
                      <th className="text-left">Status</th>
                      <th className="text-left">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {borrowings.length > 0 ? (
                      borrowings.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-4">{item.nama}</td>

                          <td>{item.email}</td>

                          <td>{item.buku}</td>

                          <td
                            className={
                              item.status === "approved"
                                ? "text-green-500"
                                : item.status === "rejected"
                                  ? "text-red-500"
                                  : "text-yellow-500"
                            }
                          >
                            {item.status}
                          </td>

                          <td>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  updateStatus(item.id, "approved")
                                }
                                className="
                        bg-green-500
                        text-white
                        px-3
                        py-2
                        rounded-lg
                      "
                              >
                                Approve
                              </button>

                              <button
                                onClick={() =>
                                  updateStatus(item.id, "rejected")
                                }
                                className="
                        bg-red-500
                        text-white
                        px-3
                        py-2
                        rounded-lg
                      "
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="
                  text-center
                  py-10
                  text-gray-500
                "
                        >
                          Belum ada data peminjaman.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeMenu === "readers" && (
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#8B5E3C]">
                  Data Pembaca
                </h1>

                <p className="text-gray-500 mt-2">
                  Daftar seluruh siswa yang menggunakan perpustakaan.
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Nama</th>
                      <th className="text-left py-3">Email</th>
                      <th className="text-left py-3">Total Pinjam</th>
                    </tr>
                  </thead>

                  <tbody>
                    {[...new Set(borrowings.map((b) => b.email))].map(
                      (email: any, index) => {
                        const userBorrowings = borrowings.filter(
                          (b) => b.email === email,
                        );

                        return (
                          <tr key={index} className="border-b">
                            <td className="py-4">{userBorrowings[0]?.nama}</td>

                            <td>{email}</td>

                            <td>{userBorrowings.length} Buku</td>
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeMenu === "reports" && (
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-[#8B5E3C]">
                  Laporan Perpustakaan
                </h1>

                <p className="text-gray-500 mt-2">
                  Ringkasan aktivitas perpustakaan Ruang Baca.
                </p>
              </div>

              {/* Statistik */}
              <div className="grid md:grid-cols-4 gap-5">
                <div className="bg-white rounded-3xl p-6 shadow">
                  <h3 className="text-gray-500">Total Buku</h3>
                  <p className="text-4xl font-bold mt-2">{books.length}</p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow">
                  <h3 className="text-gray-500">Total Peminjaman</h3>
                  <p className="text-4xl font-bold mt-2">{borrowings.length}</p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow">
                  <h3 className="text-gray-500">Total Pembaca</h3>
                  <p className="text-4xl font-bold mt-2">
                    {new Set(borrowings.map((b) => b.email)).size}
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow">
                  <h3 className="text-gray-500">Status Sistem</h3>

                  <p className="text-green-500 text-2xl font-bold mt-2">
                    Online
                  </p>
                </div>
              </div>

              {/* Buku Populer */}
              <div className="bg-white rounded-3xl p-8 shadow mt-8">
                <h2 className="text-2xl font-semibold mb-5">Buku Terpopuler</h2>

                {books.length > 0 ? (
                  <div className="flex items-center gap-5">
                    <img
                      src={books[0].image}
                      className="w-32 h-44 rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="text-2xl font-bold">{books[0].title}</h3>

                      <p className="text-gray-500">{books[0].author}</p>

                      <p className="mt-2">Kategori: {books[0].category}</p>
                    </div>
                  </div>
                ) : (
                  <p>Belum ada data buku.</p>
                )}
              </div>

              {/* Aktivitas */}
              <div className="bg-white rounded-3xl p-8 shadow mt-8">
                <h2 className="text-2xl font-semibold mb-5">
                  Aktivitas Terakhir
                </h2>

                {borrowings
                  .slice(-5)
                  .reverse()
                  .map((item) => (
                    <div key={item.id} className="border-b py-3">
                      <p>
                        {item.nama} meminjam "{item.buku}"
                      </p>

                      <span className="text-sm text-gray-500">
                        {item.status}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Export */}
              <div className="grid md:grid-cols-2 gap-5 mt-8">
                <button
                  className="
          bg-[#8B5E3C]
          text-white
          p-5
          rounded-2xl
          font-semibold
        "
                >
                  Export PDF
                </button>

                <button
                  className="
          bg-[#D4A373]
          text-white
          p-5
          rounded-2xl
          font-semibold
        "
                >
                  Export Excel
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
