"use client";

import { useRouter } from "next/navigation";

export default function ItemList({
  items,
  onDelete,
  ids,
}: {
  items: string[];
  ids: number[];
  onDelete: (id: number) => void;
}) {
  const router = useRouter();

  return (
    <ul className="list-group mt-3">
      {items.map((item, i) => (
        <li
          key={ids[i]}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {/* Klik nama item → detail */}
          <span
            role="button"
            onClick={() => router.push(`/items/${ids[i]}`)}
            className="fw-bold"
          >
            {item}
          </span>

          <div className="d-flex gap-2">
            {/* Tombol Edit */}
            <button
              className="btn btn-warning btn-sm"
              onClick={() => router.push(`/items/${ids[i]}/edit`)}
            >
              Edit
            </button>

            {/* Tombol Delete */}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(ids[i])}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}