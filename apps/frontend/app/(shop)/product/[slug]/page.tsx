import { apiGet } from "@/lib/api";

export default async function ProductPage({ params }: { params: { slug: string } }){
  const p = await apiGet<any>(`/products/${params.slug}`);
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <img src={p.hero_image} alt={p.name} className="rounded-xl"/>
      <div>
        <h1 className="font-heading text-3xl">{p.name}</h1>
        <p className="mt-4 whitespace-pre-line">{p.story}</p>
        <div className="mt-6 space-y-3">
          {p.variants?.map((v:any)=> (
            <div key={v.id} className="flex items-center justify-between border rounded-lg p-3">
              <div>{v.pack_size_g}g</div>
              <div className="font-semibold">₹{v.price_inr}</div>
              <button className="bg-tea-forest text-white rounded-lg px-4 py-2">Add to cart</button>
            </div>
          ))}
        </div>
        <div className="mt-8 text-sm text-gray-700">
          <div>🫖 Brew: {p.brew_time_min} min @ {p.brew_temp_c}°C</div>
        </div>
      </div>
    </div>
  )
}


