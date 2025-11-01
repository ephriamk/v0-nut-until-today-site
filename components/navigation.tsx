"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
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
          ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-primary/20"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="group flex items-center gap-2 text-2xl md:text-3xl font-black text-primary hover:scale-110 transition-all duration-300 relative flex-shrink-0"
          >
            <span className="text-3xl md:text-4xl animate-pulse-slow group-hover:rotate-12 transition-transform duration-300">
              🥜
            </span>
            <span className="text-primary">
              $NUT
            </span>
            <div className="absolute -inset-2 bg-primary/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </button>

          {/* Navigation Items */}
          <div className="flex-1 flex items-center justify-center gap-1 md:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative px-3 md:px-4 py-2 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 group"
              >
                <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                  <span className="text-base md:text-lg group-hover:scale-125 transition-transform duration-300">{item.emoji}</span>
                  <span
                    className={`hidden sm:inline transition-colors duration-300 ${
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

          {/* CTA Button & Theme Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />
            <Button
              size="sm"
              className="relative bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-4 md:px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group overflow-hidden whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="group-hover:scale-125 transition-transform duration-300">💦</span>
                <span className="hidden sm:inline">Join Now</span>
                <span className="sm:hidden">Join</span>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
