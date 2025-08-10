export default function Footer(){
  return (
    <footer className="border-t mt-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 flex items-center justify-between">
        <div>© {new Date().getFullYear()} Tea Store</div>
        <div className="space-x-4">
          <a href="/privacy" className="hover:text-tea-leaf">Privacy</a>
          <a href="/terms" className="hover:text-tea-leaf">Terms</a>
        </div>
      </div>
    </footer>
  )
}


