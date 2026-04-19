import { ProductList } from './features/products';

function App() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">
            STORE<span className="text-purple-600">FRONT</span>
          </h1>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Products</a>
            <a href="#" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">About</a>
            <button className="rounded-full bg-purple-600 px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95">
              Cart (0)
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl">
        <div className="px-6 py-12 text-center md:py-20">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
            Featured Collections
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
            Explore our curated selection of products designed for style and functionality.
          </p>
        </div>
        
        <ProductList />
      </main>

      <footer className="mt-20 border-t border-zinc-200 py-12 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-zinc-500">
          <p>© 2026 Storefront Inc. Architecture Demo.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
