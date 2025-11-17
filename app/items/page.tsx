"use client";

import { useEffect, useState } from "react";
import AddItemForm from "@/app/components/AddItemForm";
import ItemList from "@/app/components/ItemList";

export default function ItemsPage() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("items");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const save = (list: string[]) => {
    setItems(list);
    localStorage.setItem("items", JSON.stringify(list));
  };

  const addItem = (text: string) => {
    const newList = [...items, text];
    save(newList);
  };

  const deleteItem = (index: number) => {
    const newList = items.filter((_, i) => i !== index);
    save(newList);
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <h2 className="mb-4">Daftar Catatan</h2>

        <AddItemForm onAdd={addItem} />
        <ItemList items={items} onDelete={deleteItem} />
      </div>
    </div>
  );
}
