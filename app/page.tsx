import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">▲</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Goat Product Online</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">About</Link>
              <Link href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Features</Link>
              <Link href="#catalog" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Catalog</Link>
            </nav>
          </div>
        </div>
      </header>

      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Goat Product Online
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            A clean, fast, and professional online presence. Built with Next.js and deployed on Vercel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#catalog" className="btn-primary inline-flex items-center justify-center">View Catalog</a>
            <a href="#features" className="btn-secondary inline-flex items-center justify-center">Learn More</a>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">What this site offers</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3">Factual, transparent, and simple. No assumptions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature-card">
              <h3 className="text-xl font-semibold mb-2">Modern stack</h3>
              <p className="text-gray-600 dark:text-gray-300">Next.js 14, TypeScript, and Tailwind CSS.</p>
            </div>
            <div className="feature-card">
              <h3 className="text-xl font-semibold mb-2">Deploys on Vercel</h3>
              <p className="text-gray-600 dark:text-gray-300">Global CDN and automatic HTTPS.</p>
            </div>
            <div className="feature-card">
              <h3 className="text-xl font-semibold mb-2">Fast by default</h3>
              <p className="text-gray-600 dark:text-gray-300">Optimized static assets and minimal client JS.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Catalog</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3">No public items are listed yet.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <p className="text-gray-600 dark:text-gray-300">Check back soon for updates.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">▲</span>
                </div>
                <span className="text-xl font-bold">Goat Product Online</span>
              </div>
              <p className="text-gray-400">This site is a simple, factual business card presence.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Technology</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://nextjs.org" target="_blank" className="hover:text-white transition-colors">Next.js</a></li>
                <li><a href="https://vercel.com" target="_blank" className="hover:text-white transition-colors">Vercel</a></li>
                <li><a href="https://tailwindcss.com" target="_blank" className="hover:text-white transition-colors">Tailwind CSS</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#catalog" className="hover:text-white transition-colors">Catalog</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Goat Product Online. Built with Next.js and deployed on Vercel.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
