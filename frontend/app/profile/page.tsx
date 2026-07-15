'use client';

export default function ProfilePage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Profile
      </h1>

      <div className="bg-white shadow rounded-xl p-6 max-w-md">
        <p>
          <strong>Nama:</strong> Dilfu Altaf
        </p>

        <p className="mt-3">
          <strong>Email:</strong>
          dilfu@gmail.com
        </p>

        <p className="mt-3">
          <strong>Role:</strong> User
        </p>

        <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg">
          Edit Profile
        </button>
      </div>
    </div>
  );
}