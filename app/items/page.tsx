"use client";

import { useEffect, useState } from "react";
import AddItemForm from "../../components/AddItemForm";
import ItemList from "../../components/ItemList";


type Item = {
  id: number;
  title: string;
  content?: string | null;
};

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const addItem = async (title: string) => {
    const res = await fetch("/api/items", {
      method: "POST",
      body: JSON.stringify({ title, content: null }),
      headers: { "Content-Type": "application/json" },
    });
    const newItem = await res.json();
    setItems((s) => [newItem, ...s]);
  };

  const deleteItem = async (id: number) => {
    const res = await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });

    console.log("Response DELETE:", res.status);

    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const editItem = async (id: number, title: string, content?: string) => {
    const res = await fetch(`/api/items/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    const updated = await res.json();
    setItems((s) => s.map((it) => (it.id === updated.id ? updated : it)));
  };

  return (
    <div className="container py-5">
      <div className="card p-4">
        <h2>Daftar Item</h2>
        <AddItemForm onAdd={addItem} />
        {loading ? <div>Loading...</div> : <ItemList
          items={items.map((i) => i.title)}
          ids={items.map((i) => i.id)}
          onDelete={(id) => deleteItem(id)}
        />
        }
      </div>
    </div>
  );
}