"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { NutGame } from "@/components/nut-game"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section id="hero" className="flex flex-col items-center justify-center px-4 py-24 md:py-32 min-h-screen">
          <div className="w-full max-w-5xl space-y-8">
            <div className="flex justify-center animate-fade-in">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-primary animate-pulse-slow">$NUT</h1>
            </div>

            <div className="flex justify-center animate-slide-up">
              <div className="relative group">
                {/* Outer Glow Ring - Breathing Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl opacity-60 animate-breathe"></div>
                
                {/* Middle Glow */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/10 via-accent/15 to-primary/10 blur-2xl opacity-40 animate-breathe-delayed"></div>
                
                {/* Main Container - Transparent background to show image better */}
                <div className="relative z-10 h-64 w-64 md:h-96 md:w-96 flex items-center justify-center transition-all duration-700">
                  {/* Subtle backdrop for contrast */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-card/40 via-card/20 to-card/40 backdrop-blur-sm border-2 border-primary/20 shadow-2xl transition-all duration-700 group-hover:border-primary/40 group-hover:shadow-[0_0_40px_rgba(251,191,36,0.3)] group-hover:bg-gradient-to-br group-hover:from-card/50 group-hover:via-card/30 group-hover:to-card/50"></div>
                  
                  {/* Image - Transparent PNG */}
                  <img 
                    src="/d1bf5e28-4cd6-4bcf-8fdc-92f48a4ab458.png" 
                    alt="The Enlightened Trader - Monk with Trading Wisdom" 
                    className="relative z-10 h-full w-full object-contain p-6 md:p-8 transition-all duration-700 group-hover:scale-[1.02] drop-shadow-2xl" 
                  />
                </div>
              </div>
            </div>

            <div className="text-center space-y-3 animate-fade-in-delay">
              <p className="text-2xl md:text-4xl font-bold tracking-tight text-balance text-foreground">
                No Unnecessary Trades
              </p>
              <p className="text-lg md:text-2xl text-muted-foreground text-balance">
                Master the Ancient Art of Not Aping In
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-delay-2">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg hover:scale-105 transition-transform"
                onClick={() => {
                  const challengeSection = document.getElementById("challenge")
                  if (challengeSection) {
                    challengeSection.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
              >
                Take the Pledge
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 bg-card/50 hover:scale-105 transition-transform"
                onClick={() => {
                  const challengeSection = document.getElementById("challenge")
                  if (challengeSection) {
                    challengeSection.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
              >
                📈 Resist the Charts
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 bg-card/50 hover:scale-105 transition-transform"
                onClick={() => {
                  window.open("https://x.com/i/communities/1984748228378837134/", "_blank", "noopener,noreferrer")
                }}
              >
                𝕏 Join the Monastery
              </Button>
              
            </div>

            {/* Contract Address */}
            <div className="max-w-2xl mx-auto animate-fade-in-delay-3">
              <p className="text-sm md:text-base text-muted-foreground uppercase tracking-wider text-center mb-2">Sacred Contract</p>
              <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3 shadow-md hover:shadow-lg transition-shadow">
                <code className="flex-1 text-sm md:text-base font-mono text-muted-foreground truncate">
                  cuming soon
                </code>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="shrink-0 hover:bg-primary/10"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText("cuming soon")
                      // Optional: Show a toast or feedback
                    } catch (err) {
                      console.error("Failed to copy:", err)
                    }
                  }}
                >
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="commandments"
          data-animate
          className={`px-4 py-16 bg-card/30 transition-all duration-1000 ${
            isVisible["commandments"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                The Ten Commandments of NUT
              </h2>
              <p className="text-muted-foreground text-base md:text-lg uppercase tracking-wider">Sacred Principles for the Disciplined Trader</p>
            </div>

            <Card className="bg-card border-2 border-primary/20 shadow-xl overflow-hidden">
              <div className="divide-y divide-border">
                {[
                  { number: "I", text: "Thou shalt not market buy at 3 AM." },
                  { number: "II", text: "Thou shalt not chase green candles." },
                  { number: "III", text: "Thou shalt not check DexScreener every 10 minutes." },
                  { number: "IV", text: "Thou shalt hodl until enlightenment (or the dev rugs)." },
                  { number: "V", text: "If tempted, go outside. Touch grass." },
                  { number: "VI", text: "Drink water. Stay hydrated, not liquidated." },
                  { number: "VII", text: "Thou shalt not FOMO into rugs." },
                  { number: "VIII", text: "Thou shalt not revenge trade." },
                  { number: "IX", text: "Thou shalt not ape thy entire stack." },
                  { number: "X", text: "Thou shalt remember: discipline > dopamine." },
                ].map((commandment, index) => (
                  <div
                    key={index}
                    className="group px-6 py-4 md:px-8 md:py-5 hover:bg-primary/5 transition-colors duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="flex-shrink-0 w-12 md:w-14 h-12 md:h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-200">
                        <span className="text-lg md:text-xl font-bold text-primary">{commandment.number}</span>
                      </div>
                      <p className="flex-1 text-base md:text-lg font-medium text-foreground whitespace-nowrap overflow-hidden text-ellipsis">
                        {commandment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section
          id="nutonomics"
          data-animate
          className={`px-4 py-16 transition-all duration-1000 ${
            isVisible["nutonomics"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">NUTonomics</h2>
            <p className="text-center text-muted-foreground text-lg">
              A parody of tokenomics for the disciplined trader
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Self-Control Fund", percent: "69%", desc: "For those who didn't ape." },
                { title: "FOMO Tax", percent: "20%", desc: "Burned when you can't resist." },
                { title: "Temptation Pool", percent: "10%", desc: "Rewards for holding during pump season." },
                { title: "Nourishment Fund", percent: "1%", desc: "Reserved for post-November celebrations." },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-card border-border p-6 space-y-3 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/50"
                >
                  <p className="text-base md:text-lg text-muted-foreground uppercase tracking-wider">{item.title}</p>
                  <p className="text-4xl font-bold text-primary">{item.percent}</p>
                  <p className="text-base md:text-lg text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="science"
          data-animate
          className={`px-4 py-16 bg-card/30 transition-all duration-1000 ${
            isVisible["science"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">The Science of Discipline</h2>

            <Card className="bg-card border-2 border-primary/30 p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <p className="text-xl leading-relaxed text-foreground text-center">
                "Studies show that traders who refrain from unnecessary entries experience a{" "}
                <span className="text-primary font-bold text-2xl">69%</span> increase in peace, patience, and portfolio
                longevity. Coincidence? We think NUT."
              </p>
              <p className="text-base md:text-lg text-muted-foreground text-center mt-4 italic">
                *Not actual science. But it feels true, doesn't it?
              </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { emoji: "🧠", title: "Mental Clarity", desc: "No more 3 AM chart anxiety" },
                { emoji: "💪", title: "Diamond Hands", desc: "Forged through discipline" },
                { emoji: "🧘", title: "Inner Peace", desc: "Charts can't hurt you anymore" },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-card border-border p-6 text-center shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <p className="font-bold text-foreground mb-2">{item.title}</p>
                  <p className="text-base md:text-lg text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="memes"
          data-animate
          className={`px-4 py-16 transition-all duration-1000 ${
            isVisible["memes"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">The Meme Vault</h2>
            <p className="text-center text-muted-foreground text-lg">Sacred scrolls of trading wisdom</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  src: "/7b9e0446-f382-43ba-b4b8-ef8b106e8e8f.jpeg", 
                  alt: "The Transformation: From Chaotic Trading to Enlightened Discipline",
                  isLocal: true 
                },
                { 
                  src: "/ec50c5df-a77d-4234-9a23-62dd94192bad.jpeg", 
                  alt: "Inner Peace Through Patience: The Monk's Path to Trading Enlightenment",
                  isLocal: true 
                },
                { 
                  src: "/photo_4913612985616501559_y.jpg", 
                  alt: "The Sacred Vow: 'No Unnecessary Trades Until Today'",
                  isLocal: true 
                },
                { 
                  src: "/photo_4913612985616501560_y.jpg", 
                  alt: "Evolution of the Trader: From Impulse to Mastery",
                  isLocal: true 
                },
                { 
                  src: "/photo_4913612985616501561_y.jpg", 
                  alt: "Wisdom in the Graveyard: Learning from Past Trading Mistakes",
                  isLocal: true 
                },
                { 
                  src: "/f849b6fa-c847-4a9b-904d-728c82c030ca.jpeg", 
                  alt: "The Temptation: The Devil Offers Green Candles, The Monk Chooses Silence",
                  isLocal: true 
                },
                { 
                  src: "/c180bb48-166f-4e36-8030-e1d6bcaaef3f.jpeg", 
                  alt: "The Choice: Join the FOMO Warriors or Walk Away in Peace",
                  isLocal: true 
                },
                { 
                  src: "/790daf9b-9ea3-4f33-8e8c-084d84a78473.jpeg", 
                  alt: "The Achievement: 30 Days of Discipline - A Hard-Won Certificate",
                  isLocal: true 
                },
                { 
                  src: "/photo_4913612985616501570_y.jpg", 
                  alt: "The FOMO Panic: Crying at the BUY Button While Markets Rally",
                  isLocal: true 
                },
              ].map((meme, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  {/* Outer Bezel Frame - Lighter */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-amber-300/40 via-amber-400/50 to-amber-300/40 dark:from-amber-800/50 dark:via-amber-700/60 dark:to-amber-800/50 rounded-2xl shadow-2xl opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Middle Bezel Layer - Lighter */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-amber-200/30 via-amber-300/40 to-amber-400/30 dark:from-amber-700/50 dark:via-amber-600/60 dark:to-amber-500/50 rounded-xl"></div>
                  
                  {/* Inner Scroll Container - Much Lighter */}
                  <div className="relative bg-gradient-to-b from-amber-50/95 via-amber-100/98 to-amber-50/95 dark:from-amber-800/60 dark:via-amber-700/70 dark:to-amber-800/60 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden rounded-lg"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(184, 134, 11, 0.08) 2px, rgba(184, 134, 11, 0.08) 4px),
                        repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(139, 90, 43, 0.04) 1px, rgba(139, 90, 43, 0.04) 2px)
                      `
                    }}
                  >
                    {/* Top Rolled Scroll Edge */}
                    <div className="absolute top-0 left-0 right-0 h-12 z-10">
                      <svg className="w-full h-full" viewBox="0 0 300 48" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id={`topGradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgb(254, 243, 199)" stopOpacity="0.9" />
                            <stop offset="50%" stopColor="rgb(251, 191, 36)" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="rgb(217, 119, 6)" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>
                        <path d="M0,48 Q75,0 150,12 Q225,0 300,12 L300,48 Z" 
                              fill={`url(#topGradient-${index})`}
                              className="dark:opacity-60"/>
                      </svg>
                    </div>
                    
                    {/* Main Content Area */}
                    <div className="pt-10 pb-10 px-4 relative z-0 flex flex-col">
                       {/* Image Container with Inner Shadow - Fixed height for uniform cards */}
                       <div className="relative h-[320px] w-full overflow-hidden rounded-sm border-2 border-amber-200/60 dark:border-amber-600/50 shadow-xl bg-white/50 dark:bg-black/20 group/image-group" 
                         style={{
                           boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(217, 119, 6, 0.2)'
                         }}>
                        <div className="relative w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out group-hover:scale-[0.97]">
                          <img
                            src={meme.src}
                            alt={meme.alt}
                            className="max-w-full max-h-full w-auto h-auto transition-all duration-700 ease-in-out"
                            style={{
                              objectFit: 'cover',
                              width: '100%',
                              height: '100%',
                              transition: 'object-fit 700ms cubic-bezier(0.4, 0, 0.2, 1), width 700ms cubic-bezier(0.4, 0, 0.2, 1), height 700ms cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                            onMouseEnter={(e) => {
                              const img = e.currentTarget
                              img.style.objectFit = 'contain'
                              img.style.width = 'auto'
                              img.style.height = 'auto'
                              img.style.maxWidth = '100%'
                              img.style.maxHeight = '100%'
                            }}
                            onMouseLeave={(e) => {
                              const img = e.currentTarget
                              img.style.objectFit = 'cover'
                              img.style.width = '100%'
                              img.style.height = '100%'
                              img.style.maxWidth = 'none'
                              img.style.maxHeight = 'none'
                            }}
                          />
                        </div>
                        {/* Inner vignette */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                          background: 'radial-gradient(circle, transparent 0%, transparent 70%, rgba(0,0,0,0.05) 100%)'
                        }}></div>
                      </div>
                      
                       {/* Title Text - Lighter - Fixed height for consistency */}
                       <div className="mt-4 px-3 relative min-h-[60px] flex items-center">
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/30 to-transparent dark:via-amber-800/25 blur-sm"></div>
                         <p className="text-base md:text-lg text-foreground text-center font-bold italic leading-relaxed relative z-10 w-full" 
                            style={{ textShadow: '0 1px 2px rgba(255,255,255,0.5), 0 1px 1px rgba(0,0,0,0.05)' }}>
                           {meme.alt}
                         </p>
                       </div>
                    </div>
                    
                    {/* Bottom Rolled Scroll Edge */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 z-10">
                      <svg className="w-full h-full" viewBox="0 0 300 48" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id={`bottomGradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgb(217, 119, 6)" stopOpacity="0.1" />
                            <stop offset="50%" stopColor="rgb(251, 191, 36)" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="rgb(254, 243, 199)" stopOpacity="0.9" />
                          </linearGradient>
                        </defs>
                        <path d="M0,0 Q75,48 150,36 Q225,48 300,36 L300,0 Z" 
                              fill={`url(#bottomGradient-${index})`}
                              className="dark:opacity-60"/>
                      </svg>
                    </div>
                    
                    {/* Aged Parchment Texture - Lighter */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-15 z-0" 
                      style={{
                        backgroundImage: `
                          radial-gradient(circle at 15% 25%, rgba(251, 191, 36, 0.08) 0%, transparent 40%),
                          radial-gradient(circle at 85% 75%, rgba(217, 119, 6, 0.06) 0%, transparent 40%),
                          radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.04) 0%, transparent 60%),
                          repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(217, 119, 6, 0.02) 10px, rgba(217, 119, 6, 0.02) 11px)
                        `,
                      }}
                    ></div>
                    
                    {/* Left Edge Shadow - Lighter */}
                    <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-amber-700/20 via-amber-600/12 to-transparent dark:from-amber-800/30 dark:via-amber-700/20"></div>
                    <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-amber-700/20 via-amber-600/12 to-transparent dark:from-amber-800/30 dark:via-amber-700/20"></div>
                    
                    {/* Decorative Scroll Rods (Left & Right) - Lighter */}
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-amber-500/50 via-amber-400/40 to-amber-500/50 dark:from-amber-700/60 dark:via-amber-600/50 dark:to-amber-700/60"></div>
                    <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-gradient-to-b from-amber-500/50 via-amber-400/40 to-amber-500/50 dark:from-amber-700/60 dark:via-amber-600/50 dark:to-amber-700/60"></div>
                    
                    {/* Ornamental Corner Details - Lighter */}
                    <div className="absolute top-3 left-3 w-4 h-4">
                      <div className="w-full h-full border-t-2 border-l-2 border-amber-500/40 dark:border-amber-500/50 rounded-tl-lg"></div>
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-amber-500/25 dark:bg-amber-500/35 rounded-full"></div>
                    </div>
                    <div className="absolute top-3 right-3 w-4 h-4">
                      <div className="w-full h-full border-t-2 border-r-2 border-amber-500/40 dark:border-amber-500/50 rounded-tr-lg"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500/25 dark:bg-amber-500/35 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-3 left-3 w-4 h-4">
                      <div className="w-full h-full border-b-2 border-l-2 border-amber-500/40 dark:border-amber-500/50 rounded-bl-lg"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-500/25 dark:bg-amber-500/35 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-3 right-3 w-4 h-4">
                      <div className="w-full h-full border-b-2 border-r-2 border-amber-500/40 dark:border-amber-500/50 rounded-br-lg"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-amber-500/25 dark:bg-amber-500/35 rounded-full"></div>
                    </div>
                  </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="challenge"
          data-animate
          className={`px-4 py-16 bg-card/30 transition-all duration-1000 ${
            isVisible["challenge"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">The NUT Challenge</h2>
            <p className="text-center text-xl md:text-2xl text-muted-foreground">
              Test your discipline! Resist temptation and collect NUTs!
            </p>

            <NutGame />
          </div>
        </section>

        <section
          id="stats"
          data-animate
          className={`px-4 py-16 transition-all duration-1000 ${
            isVisible["stats"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">NUT Stats</h2>
            <p className="text-center text-muted-foreground">Totally real, definitely not made up numbers</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Temptations Resisted", value: "420", desc: "Green candles ignored with discipline" },
                { title: "Warriors Converted", value: "69%", desc: "From paper hands to diamond souls" },
                { title: "Days of Inner Peace", value: "17", desc: "Average time without FOMO" },
                { title: "Liquidity & Urges Locked", value: "100%", desc: "Forever secure, never trading" },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="bg-card border-border p-6 space-y-4 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/50 text-center"
                >
                  <p className="text-sm md:text-base text-muted-foreground uppercase tracking-wider font-semibold">{stat.title}</p>
                  <p className="text-5xl md:text-6xl font-bold text-primary leading-none">{stat.value}</p>
                  <p className="text-sm md:text-base text-muted-foreground italic">{stat.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-2xl">🧘</span>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">reformed degen</span>
                    <span className="text-muted-foreground">@no_more_3am_buys</span>
                  </div>
                  <p className="text-foreground">
                    day 23 of NUT. haven't checked dexscreener in 3 weeks. touched grass. drank water. my portfolio is
                    still down but my soul is up. this is the way. 🧘📈✨
                  </p>
                  <div className="flex items-center gap-4 text-base md:text-lg text-muted-foreground">
                    <span>4:20 PM · Nov 23, 2025</span>
                    <span>·</span>
                    <span>420K Views</span>
                  </div>
                  <div className="flex items-center gap-6 text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <span>💬</span>
                      <span>1.2K</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <span>🔄</span>
                      <span>4.2K</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <span>❤️</span>
                      <span>6.9K</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                      <span>📊</span>
                      <span>420</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <footer className="border-t border-border px-4 py-8 mt-16 bg-card/50">
          <div className="max-w-5xl mx-auto text-center text-base md:text-lg text-muted-foreground space-y-2">
            <p className="text-foreground font-semibold text-lg md:text-xl">$NUT - No Unnecessary Trades</p>
            <p>
              A movement for traders who are tired of getting rekt at 3 AM. Practice discipline. Touch grass. Drink
              water.
            </p>
            <p>This is not financial advice. This is barely even a token. But it might save your portfolio.</p>
            <p className="text-sm md:text-base pt-4">DYOR. NFA. WAGMI if you can resist the FOMO. 🧘</p>
          </div>
        </footer>
      </main>
    </>
  )
}
