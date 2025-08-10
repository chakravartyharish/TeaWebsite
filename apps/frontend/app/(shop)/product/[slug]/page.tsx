import { apiGet } from "@/lib/api";
import AddToCart from "./add-to-cart";

export default async function ProductPage({ params }: { params: { slug: string } }){
  const p = await apiGet<any>(`/products/${params.slug}`);
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <img src={p.hero_image} alt={p.name} className="rounded-xl"/>
      <div>
        <h1 className="font-heading text-3xl">{p.name}</h1>
        <p className="mt-4 whitespace-pre-line">{p.story}</p>
        <AddToCart product={p} />
        <div className="mt-8 text-sm text-gray-700">
          <div>🫖 Brew: {p.brew_time_min} min @ {p.brew_temp_c}°C</div>
        </div>
      </div>
    </div>
  )
}


