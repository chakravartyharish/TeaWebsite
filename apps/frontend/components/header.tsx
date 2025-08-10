import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs"
export default function Header(){
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="font-heading text-2xl text-tea-forest">Tea Store</a>
        <nav className="space-x-6 flex items-center">
          <a href="/" className="hover:text-tea-leaf">Home</a>
          <a href="/cart" className="hover:text-tea-leaf">Cart</a>
          <a href="/checkout" className="hover:text-tea-leaf">Checkout</a>
          <a href="/admin/new-product" className="hover:text-tea-leaf">Admin</a>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="ml-4 underline">Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <button className="ml-4 underline">Sign out</button>
            </SignOutButton>
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}


