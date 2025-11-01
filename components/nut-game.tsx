"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Zap, Flame, Target, X, Check, Star } from "lucide-react"

interface GameStats {
  score: number
  level: number
  streak: number
  perfectRounds: number
  totalResisted: number
  xp: number
  gameLevel: number
}

const INITIAL_STATS: GameStats = {
  score: 0,
  level: 1,
  streak: 0,
  perfectRounds: 0,
  totalResisted: 0,
  xp: 0,
  gameLevel: 1,
}

const DIFFICULTY = [
  { name: "Apprentice", fallSpeed: 3, spawnRate: 2000, nutRatio: 0.7 },
  { name: "Novice", fallSpeed: 4, spawnRate: 1700, nutRatio: 0.65 },
  { name: "Warrior", fallSpeed: 5, spawnRate: 1400, nutRatio: 0.6 },
  { name: "Master", fallSpeed: 6, spawnRate: 1200, nutRatio: 0.55 },
  { name: "Grandmaster", fallSpeed: 7, spawnRate: 1000, nutRatio: 0.5 },
]

interface GameButton {
  id: number
  x: number
  y: number
  value: number
  type: "nut" | "temptation"
  rotation: number
}

export function NutGame() {
  const [gameStats, setGameStats] = useState<GameStats>(() => {
    try {
      const saved = localStorage.getItem("nut-game-stats")
      if (saved) {
        const parsed = JSON.parse(saved)
        return { ...INITIAL_STATS, ...parsed }
      }
    } catch (e) {
      console.error("Failed to load stats", e)
    }
    return INITIAL_STATS
  })
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [buttons, setButtons] = useState<GameButton[]>([])
  const [roundScore, setRoundScore] = useState(0)
  const [missed, setMissed] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [showTutorial, setShowTutorial] = useState(true)
  const [combo, setCombo] = useState(0)
  const [showRoundComplete, setShowRoundComplete] = useState(false)
  const [lastComboTime, setLastComboTime] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; value: number }>>([])
  
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const spawnTimerRef = useRef<NodeJS.Timeout | null>(null)
  const buttonIdRef = useRef(0)
  const particleIdRef = useRef(0)

  // Save stats
  useEffect(() => {
    localStorage.setItem("nut-game-stats", JSON.stringify(gameStats))
  }, [gameStats])

  // Combo timeout
  useEffect(() => {
    if (combo > 0 && isPlaying) {
      const timer = setTimeout(() => {
        setCombo(0)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [combo, isPlaying])

  // Particle animation
  useEffect(() => {
    if (particles.length === 0) return

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, y: p.y - 2 }))
          .filter((p) => p.y > -50)
      )
    }, 16)

    return () => clearInterval(interval)
  }, [particles.length])

  // Main game loop - smooth Tetris-like falling
  useEffect(() => {
    if (!isPlaying || gameOver || showRoundComplete) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      return
    }

    const gameLoop = () => {
      if (!gameAreaRef.current) {
        animationFrameRef.current = requestAnimationFrame(gameLoop)
        return
      }

      const areaHeight = gameAreaRef.current.clientHeight
      const difficulty = DIFFICULTY[Math.min(gameStats.gameLevel - 1, DIFFICULTY.length - 1)]
      const fallSpeed = difficulty?.fallSpeed || 2

      setButtons((prevButtons) => {
        const updated = prevButtons
          .map((btn) => {
            // Smooth, constant falling speed like Tetris
            const newY = btn.y + fallSpeed
            const newRotation = btn.rotation + 0.5

            // Remove if off screen
            if (newY > areaHeight + 100) {
              if (btn.type === "nut") {
                setMissed((prev) => {
                  const newMissed = prev + 1
                  if (newMissed >= 5) {
                    setTimeout(() => {
                      setGameOver(true)
                      setIsPlaying(false)
                    }, 100)
                  }
                  return newMissed
                })
              }
              return null
            }
            return { ...btn, y: newY, rotation: newRotation }
          })
          .filter((btn): btn is GameButton => btn !== null)

        return updated
      })

      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [isPlaying, gameOver, gameStats.gameLevel, showRoundComplete])

  // Spawn buttons
  useEffect(() => {
    if (!isPlaying || gameOver) {
      if (spawnTimerRef.current) {
        clearInterval(spawnTimerRef.current)
        spawnTimerRef.current = null
      }
      return
    }

    const spawnButton = () => {
      if (!gameAreaRef.current) return

      const area = gameAreaRef.current.getBoundingClientRect()
      const difficulty = DIFFICULTY[Math.min(gameStats.gameLevel - 1, DIFFICULTY.length - 1)]
      const isNut = Math.random() < (difficulty?.nutRatio || 0.6)
      
      const value = isNut
        ? Math.floor(Math.random() * 40) + 10
        : Math.floor(Math.random() * 80) + 50

      const newButton: GameButton = {
        id: buttonIdRef.current++,
        x: Math.random() * Math.max(0, area.width - 140) + 70,
        y: -80,
        value,
        type: isNut ? "nut" : "temptation",
        rotation: Math.random() * 360,
      }

      setButtons((prev) => [...prev, newButton])
    }

    const difficulty = DIFFICULTY[Math.min(gameStats.gameLevel - 1, DIFFICULTY.length - 1)]
    const spawnRate = difficulty?.spawnRate || 1500
    spawnTimerRef.current = setInterval(spawnButton, spawnRate)

    return () => {
      if (spawnTimerRef.current) {
        clearInterval(spawnTimerRef.current)
      }
    }
  }, [isPlaying, gameOver, gameStats.gameLevel])

  const handleButtonClick = (button: GameButton) => {
    if (!isPlaying || gameOver) return

    if (button.type === "temptation") {
      setGameOver(true)
      setIsPlaying(false)
      setButtons([])
      return
    }

    // Collect NUT - success!
    const points = button.value
    const now = Date.now()
    const timeSinceLastCombo = now - lastComboTime
    
    let newCombo = combo
    if (timeSinceLastCombo < 2000) {
      newCombo = combo + 1
    } else {
      newCombo = 1
    }
    setLastComboTime(now)
    setCombo(newCombo)

    const comboBonus = newCombo > 1 ? newCombo * 5 : 0
    const totalPoints = points + comboBonus

    // Create particles
    const newParticles = Array.from({ length: 3 }, (_, i) => ({
      id: particleIdRef.current++,
      x: button.x,
      y: button.y,
      value: totalPoints,
    }))
    setParticles((prev) => [...prev, ...newParticles])

    setRoundScore((prev) => prev + totalPoints)
    setGameStats((prev) => ({
      ...prev,
      totalResisted: prev.totalResisted + 1,
    }))

    // Remove button immediately
    setButtons((prev) => prev.filter((b) => b.id !== button.id))
  }

  const startGame = () => {
    setGameOver(false)
    setIsPlaying(true)
    setButtons([])
    setRoundScore(0)
    setMissed(0)
    setCombo(0)
    setShowRoundComplete(false)
    setShowTutorial(false)
    setParticles([])
    buttonIdRef.current = 0
    particleIdRef.current = 0
    setLastComboTime(Date.now())
  }

  const endRound = () => {
    const finalScore = roundScore
    const perfectBonus = missed === 0 && roundScore > 0 ? 100 : 0
    const streakBonus = gameStats.streak > 0 ? gameStats.streak * 10 : 0
    const totalRoundScore = finalScore + perfectBonus + streakBonus

    const xpGained = Math.floor(totalRoundScore / 10)
    const newXP = gameStats.xp + xpGained
    const newLevel = Math.floor(newXP / 100) + 1
    const newGameLevel = Math.min(Math.floor(newXP / 200) + 1, DIFFICULTY.length)

    setGameStats((prev) => ({
      ...prev,
      score: prev.score + totalRoundScore,
      level: newLevel,
      streak: missed === 0 ? prev.streak + 1 : 0,
      perfectRounds: missed === 0 ? prev.perfectRounds + 1 : prev.perfectRounds,
      xp: newXP,
      gameLevel: newGameLevel,
    }))

    setIsPlaying(false)
    setButtons([])
    setRoundScore(0)
    setMissed(0)
    setCombo(0)
    setShowRoundComplete(false)
  }

  const handleManualRoundEnd = () => {
    setIsPlaying(false)
    setShowRoundComplete(true)
  }

  const resetStats = () => {
    setGameStats(INITIAL_STATS)
    localStorage.removeItem("nut-game-stats")
  }

  const getLevelProgress = () => {
    return ((gameStats.xp % 100) / 100) * 100
  }

  const difficulty = DIFFICULTY[Math.min(gameStats.gameLevel - 1, DIFFICULTY.length - 1)]

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Stats Dashboard */}
      <Card className="bg-card border-2 border-primary/40 p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              Level {gameStats.level}
            </div>
            <div className="text-sm md:text-base text-muted-foreground flex items-center justify-center gap-1">
              <Zap className="h-4 w-4" />
              {gameStats.xp} XP
            </div>
            <Progress value={getLevelProgress()} className="h-2 mt-2" />
          </div>
          <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/20">
            <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
              {gameStats.score.toLocaleString()}
            </div>
            <div className="text-sm md:text-base text-muted-foreground">Total Score</div>
          </div>
          <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-1">
              {gameStats.streak}
            </div>
            <div className="text-sm md:text-base text-muted-foreground flex items-center justify-center gap-1">
              <Flame className="h-4 w-4 text-orange-500" />
              Streak
            </div>
          </div>
          <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
            <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">
              {gameStats.perfectRounds}
            </div>
            <div className="text-sm md:text-base text-muted-foreground flex items-center justify-center gap-1">
              <Target className="h-4 w-4" />
              Perfect
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-base md:text-lg font-semibold text-foreground">
              Difficulty: {difficulty?.name || "Apprentice"}
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              Resisted: {gameStats.totalResisted} trades
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetStats}
            className="text-muted-foreground hover:text-destructive"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </Card>

      {/* Game Area */}
      <Card className="bg-card border-2 border-primary/40 p-6 md:p-8">
        {showTutorial && !isPlaying && !gameOver && !showRoundComplete && (
          <div className="mb-6 p-6 bg-primary/10 rounded-lg border border-primary/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">How to Play</h3>
            <ul className="space-y-3 text-base md:text-lg text-foreground">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Click the <strong className="text-primary">Acorn buttons</strong> to collect them and earn points
                </span>
              </li>
              <li className="flex items-start gap-2">
                <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-destructive">NEVER click</strong> the ⚠️ temptation buttons or you lose!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Build combos by clicking acorns quickly for bonus points!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Miss fewer than 5 acorns per round for perfect rounds (bonus XP!)
                </span>
              </li>
            </ul>
          </div>
        )}

        {gameOver && (
          <div className="mb-6 p-6 bg-destructive/10 rounded-lg border border-destructive/20 text-center">
            <div className="text-2xl md:text-3xl font-bold text-destructive mb-2">Game Over!</div>
            <div className="text-base md:text-lg text-muted-foreground mb-4">
              You clicked a temptation! Your discipline failed this round.
            </div>
            <div className="text-lg md:text-xl font-semibold text-foreground mb-4">
              Round Score: {roundScore.toLocaleString()}
            </div>
            <Button onClick={startGame} className="bg-primary text-primary-foreground">
              <Play className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}

        {isPlaying && (
          <div className="mb-4 flex items-center justify-between">
            <div className="text-base md:text-lg font-semibold">
              Round Score: <span className="text-primary">{roundScore.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3">
              {combo > 0 && (
                <div className="text-base md:text-lg font-bold text-primary animate-pulse">
                  🔥 Combo x{combo}
                </div>
              )}
              <div className="text-sm md:text-base text-muted-foreground">
                Missed: <span className={missed >= 4 ? "text-destructive font-bold" : ""}>{missed}/5</span>
              </div>
            </div>
          </div>
        )}

        <div
          ref={gameAreaRef}
          className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-b from-secondary/10 to-accent/5 rounded-lg border-2 border-border overflow-hidden"
          style={{ touchAction: "none" }}
        >
          {/* Game buttons */}
          {buttons.map((button) => (
            <div
              key={button.id}
              onClick={() => handleButtonClick(button)}
              onTouchStart={(e) => {
                e.preventDefault()
                handleButtonClick(button)
              }}
              className={`absolute cursor-pointer select-none ${
                button.type === "temptation"
                  ? "hover:scale-110"
                  : "hover:scale-110 active:scale-95"
              } z-50`}
              style={{
                left: `${button.x}px`,
                top: `${button.y}px`,
                transform: `translate(-50%, -50%) rotate(${button.rotation}deg)`,
                pointerEvents: "auto",
                willChange: "transform",
                transformOrigin: "center center",
              }}
            >
              <div
                className={`flex items-center justify-center gap-2 font-bold rounded-xl px-5 py-3 text-base md:text-lg shadow-xl min-w-[120px] ${
                  button.type === "temptation"
                    ? "bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground border-2 border-destructive"
                    : "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-2 border-primary"
                }`}
              >
                {button.type === "temptation" ? (
                  <>
                    <span>⚠️</span>
                    <span>Trade Now</span>
                  </>
                ) : (
                  <>
                    <img src="/acorn-icon.svg" alt="Acorn" className="w-6 h-6" />
                    <span>+{button.value}</span>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Score particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute text-primary font-bold text-lg pointer-events-none z-50"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              +{particle.value}
            </div>
          ))}

          {!isPlaying && !gameOver && !showRoundComplete && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-40">
              <Button
                size="lg"
                onClick={startGame}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg px-8 py-6 shadow-xl"
              >
                <Play className="mr-2 h-6 w-6" />
                Start Round
              </Button>
            </div>
          )}

          {isPlaying && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40">
              <Button
                variant="outline"
                onClick={handleManualRoundEnd}
                className="bg-background/90 backdrop-blur-sm hover:bg-background"
              >
                <Pause className="mr-2 h-4 w-4" />
                End Round
              </Button>
            </div>
          )}

          {showRoundComplete && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm z-50">
              <div className="text-center space-y-4 p-6">
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  Round Complete! 🎉
                </div>
                <div className="text-xl md:text-2xl text-primary font-semibold">
                  Score: {roundScore.toLocaleString()}
                </div>
                {missed === 0 && (
                  <div className="text-lg text-primary font-bold">Perfect Round! +100 Bonus!</div>
                )}
                <div className="flex gap-3 justify-center">
                  <Button onClick={startGame} className="bg-primary text-primary-foreground">
                    Next Round
                  </Button>
                  <Button onClick={endRound} variant="outline">
                    End & Collect XP
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {isPlaying && (
          <div className="mt-4 text-center text-base md:text-lg text-muted-foreground font-semibold">
            Click <img src="/acorn-icon.svg" alt="Acorn" className="w-5 h-5 inline-block mx-1" /> Acorns, avoid ⚠️ Temptations!
          </div>
        )}
      </Card>
    </div>
  )
}
