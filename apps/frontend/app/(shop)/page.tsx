import { apiGet } from "@/lib/api";

export default async function Home(){
  const products = await apiGet<any[]>("/products");
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-tea-forest text-white p-10">
        <h1 className="font-heading text-4xl">Single‑Origin Teas</h1>
        <p className="mt-2 opacity-90">Brewed with care. Sourced ethically.</p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <a key={p.id} href={`/product/${p.slug}`} className="border bg-white rounded-xl overflow-hidden hover:shadow-md transition">
            <img src={p.hero_image} alt={p.name} className="aspect-square object-cover"/>
            <div className="p-4">
              <h3 className="font-heading text-xl">{p.name}</h3>
            </div>
          </a>
        ))}
      </section>
    </div>
  )
}


