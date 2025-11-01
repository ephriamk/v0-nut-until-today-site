"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { NutChallenge } from "@/components/nut-challenge"
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
              <div className="relative h-64 w-64 md:h-96 md:w-96 rounded-2xl bg-gradient-to-br from-secondary/30 to-accent/20 overflow-hidden border-4 border-primary/40 shadow-2xl hover:scale-105 transition-transform duration-300 hover:rotate-2">
                <img src="/zen-trader.png" alt="The Enlightened Trader" className="h-full w-full object-contain" />
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
              >
                Take the Pledge
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 bg-card/50 hover:scale-105 transition-transform"
              >
                📈 Resist the Charts
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 bg-card/50 hover:scale-105 transition-transform"
              >
                𝕏 Join the Monastery
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 bg-card/50 hover:scale-105 transition-transform"
              >
                💬 Confess Your FOMOs
              </Button>
            </div>

            {/* Contract Address */}
            <div className="max-w-2xl mx-auto animate-fade-in-delay-3">
              <p className="text-sm md:text-base text-muted-foreground uppercase tracking-wider text-center mb-2">Sacred Contract</p>
              <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3 shadow-md hover:shadow-lg transition-shadow">
                <code className="flex-1 text-sm md:text-base font-mono text-muted-foreground truncate">
                  NUT7k9JRvMpJhAnZkL4aMeNvJhvzTZs7h0qstpump
                </code>
                <Button size="icon" variant="ghost" className="shrink-0 hover:bg-primary/10">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  src: "/7b9e0446-f382-43ba-b4b8-ef8b106e8e8f.jpeg", 
                  alt: "Monks Worshipping the NUT - Before & After Trading Discipline",
                  isLocal: true 
                },
                { 
                  src: "/ec50c5df-a77d-4234-9a23-62dd94192bad.jpeg", 
                  alt: "Monk Holding Glowing NUT - Peace Through Discipline",
                  isLocal: true 
                },
                { query: "funny meme about not trading at 3am crypto", alt: "3AM Trading Meme", isLocal: false },
                { query: "meme about resisting FOMO in crypto trading", alt: "FOMO Resistance Meme", isLocal: false },
                { query: "funny meme about checking charts too much", alt: "Chart Checking Meme", isLocal: false },
                { query: "meme about diamond hands and holding crypto", alt: "Diamond Hands Meme", isLocal: false },
                { query: "funny meme about touching grass instead of trading", alt: "Touch Grass Meme", isLocal: false },
                { query: "meme about crypto trading discipline and patience", alt: "Trading Discipline Meme", isLocal: false },
              ].map((meme, index) => (
                <Card
                  key={index}
                  className="bg-card border-border overflow-hidden shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                >
                  <div className="aspect-square bg-gradient-to-br from-secondary/20 to-accent/10 relative overflow-hidden">
                    <img
                      src={meme.isLocal ? meme.src : `/.jpg?height=400&width=400&query=${encodeURIComponent(meme.query)}`}
                      alt={meme.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-base md:text-lg text-muted-foreground text-center">{meme.alt}</p>
                  </div>
                </Card>
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
            <p className="text-center text-xl text-muted-foreground">
              Can you last 30 days without an unnecessary trade?
            </p>

            <NutChallenge />
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Buy Pressure Resisted", value: "420", desc: "Green candles ignored" },
                { title: "Paper Hands Converted", value: "69%", desc: "Now diamond hands" },
                { title: "Avg Time Without FOMO", value: "17", desc: "Days of peace" },
                { title: "Liquidity Locked", value: "100%", desc: "(And urges too)" },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="bg-card border-border p-6 space-y-3 shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 hover:border-primary/50"
                >
                  <p className="text-base md:text-lg text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                  <p className="text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-base md:text-lg text-muted-foreground">{stat.desc}</p>
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
