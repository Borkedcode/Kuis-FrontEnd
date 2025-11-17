"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPage() {
  const router = useRouter();
  const params = useParams();     // <-- ambil params DI SINI
  const id = Number(params.id);   // <-- sekarang aman

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/items/${id}`);
      const data = await res.json();
      setItem(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div className="container py-5">Loading...</div>;

  if (!item) return <div className="container py-5">Item tidak ditemukan.</div>;

  return (
    <div className="container py-5">
      <div className="card p-4">
        <h2>{item.title}</h2>
        <p>{item.content ?? "(tidak ada konten)"}</p>

        <div className="d-flex gap-2 mt-4">
          <button
            className="btn btn-warning"
            onClick={() => router.push(`/items/${id}/edit`)}
          >
            Edit
          </button>

          <button className="btn btn-secondary" onClick={() => router.back()}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
