"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditItemPage() {
    const params = useParams();        // <-- FIX
    const router = useRouter();

    // params.id sekarang sudah benar (string)
    const id = Number(params.id);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/items/${id}`);

            console.log("STATUS:", res.status);
            const text = await res.text();
            console.log("RAW RESPONSE:", text);

            const data = await res.json();

            setTitle(data.title);
            setContent(data.content ?? "");
            setLoading(false);
        }

        fetchData();
    }, [id]);

    async function handleSave(e: any) {
        e.preventDefault();

        await fetch(`/api/items/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });

        router.push("/items");
    }

    if (loading) return <div className="container py-5">Loading...</div>;

    return (
        <div className="container py-5">
            <div className="card p-4">
                <h2>Edit Item</h2>

                <form onSubmit={handleSave} className="d-flex flex-column gap-3 mt-3">
                    <input
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Judul"
                        required
                    />

                    <textarea
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Konten"
                    />

                    <button className="btn btn-primary">Simpan Perubahan</button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => router.back()}
                    >
                        Batal
                    </button>
                </form>
            </div>
        </div>
    );
}
