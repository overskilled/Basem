import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Package, Search, Users } from 'lucide-react'
import Footer from '@/components/Dashboard/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center gap-x-2" href="#">
          <Package className="h-6 w-6" />
          <span className="text-primary">BASEM</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Buy and Selam Easy Market
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Connect with top suppliers, discover great products, and grow your business.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline">Log In</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <ShoppingCart className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">Easy Ordering</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Place orders with just a few clicks</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Package className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">Wide Product Range</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Access thousands of wholesale products</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Search className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">Advanced Search</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Find exactly what you need, fast</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white mb-4">1</div>
                <h3 className="text-lg font-bold">Register</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Create your account in minutes</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white mb-4">2</div>
                <h3 className="text-lg font-bold">Browse Products</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Explore our wide range of wholesale items</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white mb-4">3</div>
                <h3 className="text-lg font-bold">Place Orders</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Buy directly from verified suppliers</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to get started?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join our marketplace today and start growing your business.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button size="lg">Register Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}