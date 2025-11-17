"use client";

import { useState } from "react";

export default function AddItemForm({ onAdd }: { onAdd: (v: string) => void }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2">
      <input
        className="form-control"
        placeholder="Tambah item..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btn-success">Add</button>
    </form>
  );
}