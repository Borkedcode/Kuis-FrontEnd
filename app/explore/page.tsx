import Link from "next/link";

type Quote = {
  _id: string;
  content: string;
  author: string;
};

async function getQuotes() {
  const res = await fetch("https://api.quotable.io/quotes?limit=12", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal mem-fetch quotes");
  const data = await res.json();
  return data.results as Quote[];
}

export default async function ExplorePage() {
  let quotes: Quote[] = [];
  try {
    quotes = await getQuotes();
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Explore — Quotes</h2>

      <div className="row g-3">
        {quotes.length === 0 ? (
          <div className="col-12">Tidak ada data. Cek koneksi atau API rate limit.</div>
        ) : (
          quotes.map((q) => (
            <div className="col-md-4" key={q._id}>
              <div className="card h-100">
                <div className="card-body">
                  <p className="card-text">“{q.content}”</p>
                  <p className="card-subtitle text-muted">— {q.author}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4">
        <Link href="/items" className="btn btn-secondary">Kembali ke Items</Link>
      </div>
    </div>
  );
}
