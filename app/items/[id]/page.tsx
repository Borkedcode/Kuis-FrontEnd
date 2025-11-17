"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [item, setItem] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("items");
    if (saved) {
      const list = JSON.parse(saved);
      setItem(list[parseInt(params.id)]);
    }
  }, [params.id]);

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <h2>Detail Item</h2>
        <p className="fs-4 mt-3">{item}</p>

        <button className="btn btn-secondary mt-3" onClick={() => router.back()}>
          Back
        </button>
      </div>
    </div>
  );
}
