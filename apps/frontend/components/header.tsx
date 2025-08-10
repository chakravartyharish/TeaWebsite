export default function Header(){
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="font-heading text-2xl text-tea-forest">Tea Store</a>
        <nav className="space-x-6">
          <a href="/" className="hover:text-tea-leaf">Home</a>
          <a href="/checkout" className="hover:text-tea-leaf">Checkout</a>
          <a href="/admin/new-product" className="hover:text-tea-leaf">Admin</a>
        </nav>
      </div>
    </header>
  )
}


