'use client';

const histories = [
  {
    id: 1,
    title: 'Clean Code',
    date: '15 Juli 2026',
    status: 'Dikembalikan',
  },
  {
    id: 2,
    title: 'Atomic Habits',
    date: '12 Juli 2026',
    status: 'Dipinjam',
  },
];

export default function HistoryPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Riwayat Peminjaman
      </h1>

      <div className="space-y-4">
        {histories.map((history) => (
          <div
            key={history.id}
            className="border rounded-xl p-5 shadow"
          >
            <h2 className="font-semibold">
              {history.title}
            </h2>

            <p>{history.date}</p>

            <p className="text-blue-500">
              {history.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}