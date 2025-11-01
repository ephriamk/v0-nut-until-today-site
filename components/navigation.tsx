"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { id: "commandments", label: "Sacred Laws", emoji: "📜" },
    { id: "nutonomics", label: "NUTonomics", emoji: "🥜" },
    { id: "challenge", label: "The Challenge", emoji: "⚔️" },
    { id: "memes", label: "Meme Vault", emoji: "🖼️" },
    { id: "stats", label: "Stats", emoji: "📊" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gradient-to-r from-background via-background/98 to-background backdrop-blur-xl shadow-2xl border-b-2 border-primary/30"
          : "bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="group flex items-center gap-2 text-3xl font-black text-primary hover:scale-110 transition-all duration-300 relative"
          >
            <span className="text-4xl animate-pulse-slow group-hover:rotate-12 transition-transform duration-300">
              🥜
            </span>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              $NUT
            </span>
            <div className="absolute -inset-2 bg-primary/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-lg group-hover:scale-125 transition-transform duration-300">{item.emoji}</span>
                  <span
                    className={`transition-colors duration-300 ${
                      hoveredItem === item.id ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    {item.label}
                  </span>
                </span>
                <div
                  className={`absolute inset-0 bg-primary/10 rounded-lg transition-all duration-300 ${
                    hoveredItem === item.id ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="relative bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-accent hover:to-primary font-bold px-6 py-2 rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="group-hover:rotate-180 transition-transform duration-500">🧘</span>
                Join the Monastery
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </div>
      </div>

      <div className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </nav>
  )
}
