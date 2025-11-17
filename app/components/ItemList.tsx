"use client";

import { useRouter } from "next/navigation";

export default function ItemList({
  items,
  onDelete,
}: {
  items: string[];
  onDelete: (index: number) => void;
}) {
  const router = useRouter();

  return (
    <ul className="list-group mt-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            role="button"
            onClick={() => router.push(`/items/${i}`)}
            className="fw-bold"
          >
            {item}
          </span>

          <button className="btn btn-danger btn-sm" onClick={() => onDelete(i)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}