"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Calendar, Clock, RotateCcw, Play, Zap, Flame, Star, Award, Target, TrendingUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const CHALLENGE_DURATION = 30 // days
const MILESTONES = [
  { day: 1, title: "The Seed of Discipline", emoji: "🌱", xp: 10 },
  { day: 7, title: "Temptation Resister", emoji: "🛡️", xp: 50 },
  { day: 15, title: "Chart Abstinent", emoji: "🧘", xp: 100 },
  { day: 21, title: "FOMO Destroyer", emoji: "⚔️", xp: 200 },
  { day: 28, title: "Diamond Soul", emoji: "💎", xp: 300 },
  { day: 30, title: "Grandmaster of Patience", emoji: "👑", xp: 500, special: true },
]

const DAILY_XP = 5 // XP per day survived

interface ChallengeState {
  startDate: string | null
  endDate: string | null
  totalXP: number
  checkIns: string[] // Array of ISO date strings
  lastCheckIn: string | null
  streak: number
  achievements: number[] // Array of milestone days achieved
}

export function NutChallenge() {
  const [challengeState, setChallengeState] = useState<ChallengeState>({
    startDate: null,
    endDate: null,
    totalXP: 0,
    checkIns: [],
    lastCheckIn: null,
    streak: 0,
    achievements: [],
  })
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showConfirmReset, setShowConfirmReset] = useState(false)
  const [checkInAnimation, setCheckInAnimation] = useState(false)
  const [newAchievement, setNewAchievement] = useState<number | null>(null)

  useEffect(() => {
    // Load challenge state from localStorage
    const saved = localStorage.getItem("nut-challenge")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setChallengeState({
          ...parsed,
          checkIns: parsed.checkIns || [],
          achievements: parsed.achievements || [],
          streak: parsed.streak || 0,
          totalXP: parsed.totalXP || 0,
        })
      } catch (e) {
        console.error("Failed to load challenge state", e)
      }
    }
  }, [])

  useEffect(() => {
    // Update current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Save challenge state to localStorage
    if (challengeState.startDate) {
      localStorage.setItem("nut-challenge", JSON.stringify(challengeState))
    }
  }, [challengeState])

  useEffect(() => {
    // Check for new achievements
    if (challengeState.startDate) {
      const daysElapsed = getDaysElapsed()
      MILESTONES.forEach((milestone) => {
        if (
          daysElapsed >= milestone.day &&
          !challengeState.achievements.includes(milestone.day)
        ) {
          setNewAchievement(milestone.day)
          setTimeout(() => setNewAchievement(null), 3000)
          setChallengeState((prev) => ({
            ...prev,
            achievements: [...prev.achievements, milestone.day],
            totalXP: prev.totalXP + milestone.xp,
          }))
        }
      })

      // Award daily XP
      const today = new Date().toDateString()
      if (
        challengeState.lastCheckIn !== today &&
        daysElapsed > 0 &&
        daysElapsed <= CHALLENGE_DURATION
      ) {
        const newStreak = calculateStreak()
        setChallengeState((prev) => ({
          ...prev,
          totalXP: prev.totalXP + DAILY_XP,
          checkIns: [...new Set([...prev.checkIns, today])],
          lastCheckIn: today,
          streak: newStreak,
        }))
      }
    }
  }, [currentTime, challengeState.startDate])

  const startChallenge = () => {
    const start = new Date()
    const end = new Date(start)
    end.setDate(end.getDate() + CHALLENGE_DURATION)
    const today = new Date().toDateString()

    setChallengeState({
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      totalXP: DAILY_XP, // First day XP
      checkIns: [today],
      lastCheckIn: today,
      streak: 1,
      achievements: [1], // Day 1 achievement
    })
  }

  const resetChallenge = () => {
    localStorage.removeItem("nut-challenge")
    setChallengeState({
      startDate: null,
      endDate: null,
      totalXP: 0,
      checkIns: [],
      lastCheckIn: null,
      streak: 0,
      achievements: [],
    })
    setShowConfirmReset(false)
  }

  const dailyCheckIn = () => {
    const today = new Date().toDateString()
    if (challengeState.lastCheckIn === today) {
      return // Already checked in today
    }

    setCheckInAnimation(true)
    setTimeout(() => setCheckInAnimation(false), 2000)

    const newStreak = calculateStreak() + 1
    setChallengeState((prev) => ({
      ...prev,
      totalXP: prev.totalXP + DAILY_XP + (newStreak > 1 ? newStreak : 0), // Bonus XP for streaks
      checkIns: [...new Set([...prev.checkIns, today])],
      lastCheckIn: today,
      streak: newStreak,
    }))
  }

  const calculateStreak = (): number => {
    if (!challengeState.startDate) return 0
    const sortedCheckIns = [...challengeState.checkIns]
      .map((d) => new Date(d).getTime())
      .sort((a, b) => b - a)

    if (sortedCheckIns.length === 0) return 0

    let streak = 0
    let expectedDate = new Date().getTime()

    for (const checkInTime of sortedCheckIns) {
      const checkInDate = new Date(checkInTime)
      const expectedDateObj = new Date(expectedDate)
      expectedDateObj.setHours(0, 0, 0, 0)
      checkInDate.setHours(0, 0, 0, 0)

      const daysDiff = Math.floor((expectedDate - checkInTime) / (1000 * 60 * 60 * 24))
      if (daysDiff === 0 || daysDiff === 1) {
        streak++
        expectedDate = checkInTime - 1000 * 60 * 60 * 24 // Previous day
      } else {
        break
      }
    }
    return streak
  }

  const getDaysElapsed = (): number => {
    if (!challengeState.startDate) return 0
    const start = new Date(challengeState.startDate)
    const diff = currentTime.getTime() - start.getTime()
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  }

  const getDaysRemaining = (): number => {
    if (!challengeState.endDate) return CHALLENGE_DURATION
    const end = new Date(challengeState.endDate)
    const diff = end.getTime() - currentTime.getTime()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  const getProgress = (): number => {
    const elapsed = getDaysElapsed()
    return Math.min(100, Math.max(0, (elapsed / CHALLENGE_DURATION) * 100))
  }

  const getCurrentTitle = (): { day: number; title: string; emoji: string } => {
    const daysElapsed = getDaysElapsed()
    const milestone = [...MILESTONES].reverse().find((m) => daysElapsed >= m.day)
    return milestone || MILESTONES[0]
  }

  const isMilestoneAchieved = (milestoneDay: number): boolean => {
    return challengeState.achievements.includes(milestoneDay)
  }

  const isChallengeComplete = (): boolean => {
    return getDaysElapsed() >= CHALLENGE_DURATION
  }

  const getTimeUntilEnd = (): string => {
    if (!challengeState.endDate) return ""
    const end = new Date(challengeState.endDate)
    if (end <= currentTime) return "Challenge Complete!"
    return formatDistanceToNow(end, { addSuffix: true })
  }

  const getLevel = (): number => {
    // Level up every 100 XP
    return Math.floor(challengeState.totalXP / 100) + 1
  }

  const getXPForNextLevel = (): number => {
    const currentLevel = getLevel()
    return currentLevel * 100
  }

  const getXPProgress = (): number => {
    const currentLevel = getLevel()
    const xpInCurrentLevel = challengeState.totalXP % 100
    return (xpInCurrentLevel / 100) * 100
  }

  const hasCheckedInToday = (): boolean => {
    return challengeState.lastCheckIn === new Date().toDateString()
  }

  const daysElapsed = getDaysElapsed()
  const daysRemaining = getDaysRemaining()
  const progress = getProgress()
  const currentTitle = getCurrentTitle()
  const isComplete = isChallengeComplete()
  const level = getLevel()
  const xpProgress = getXPProgress()

  if (!challengeState.startDate) {
    return (
      <Card className="bg-card border-2 border-primary/40 p-8 md:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Trophy className="h-16 w-16 text-primary animate-pulse-slow" />
            <div className="text-6xl md:text-7xl font-bold text-primary">30 Days</div>
          </div>
          <p className="text-xl md:text-2xl text-foreground font-semibold">of Trading Discipline</p>
          <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Commit to 30 days without an unnecessary trade. Track your progress, unlock milestones, earn XP,
            build streaks, and become a Grandmaster of Patience.
          </p>
          <Button
            size="lg"
            onClick={startChallenge}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold hover:scale-110 transition-transform px-8 py-6 text-lg"
          >
            <Play className="mr-2 h-6 w-6" />
            Start Your Journey
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Achievement Notification */}
      {newAchievement && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <Card className="bg-primary/95 text-primary-foreground p-6 shadow-2xl border-2 border-primary">
            <div className="flex items-center gap-4">
              <Trophy className="h-10 w-10 animate-spin" />
              <div>
                <p className="text-xl font-bold">Achievement Unlocked!</p>
                <p className="text-base">
                  {MILESTONES.find((m) => m.day === newAchievement)?.title}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Main Challenge Card */}
      <Card className="bg-card border-2 border-primary/40 p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="space-y-6 md:space-y-8">
          {/* Level & XP Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-base md:text-lg">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="font-bold text-foreground">Level {level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-bold text-primary">{challengeState.totalXP} XP</span>
              </div>
            </div>
            <Progress value={xpProgress} className="h-4" />
            <div className="text-right text-sm text-muted-foreground">
              {getXPForNextLevel() - challengeState.totalXP} XP to Level {level + 1}
            </div>
          </div>

          {/* Game Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{daysElapsed}</div>
              <div className="text-sm md:text-base text-muted-foreground flex items-center justify-center gap-1">
                <Calendar className="h-4 w-4" />
                Days
              </div>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/20">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{daysRemaining}</div>
              <div className="text-sm md:text-base text-muted-foreground flex items-center justify-center gap-1">
                <Clock className="h-4 w-4" />
                Remaining
              </div>
            </div>
            <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">
                {challengeState.streak}
              </div>
              <div className="text-sm md:text-base text-muted-foreground flex items-center justify-center gap-1">
                <Flame className="h-4 w-4 text-orange-500" />
                Streak
              </div>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">
                {challengeState.achievements.length}
              </div>
              <div className="text-sm md:text-base text-muted-foreground flex items-center justify-center gap-1">
                <Award className="h-4 w-4" />
                Achievements
              </div>
            </div>
          </div>

          {/* Daily Check-In Button */}
          <div className="flex flex-col items-center gap-3">
            {!hasCheckedInToday() && !isComplete ? (
              <Button
                size="lg"
                onClick={dailyCheckIn}
                className={`bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-all px-8 py-6 text-lg ${
                  checkInAnimation ? "animate-bounce scale-110" : ""
                }`}
              >
                <Target className="mr-2 h-5 w-5" />
                Daily Check-In (+{DAILY_XP} XP)
              </Button>
            ) : (
              <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20 w-full">
                <div className="text-base md:text-lg font-semibold text-primary">
                  {isComplete ? "Challenge Complete!" : "✓ Checked In Today"}
                </div>
                {!isComplete && (
                  <div className="text-sm text-muted-foreground mt-1">
                    Next check-in available tomorrow
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-base md:text-lg">
              <span className="text-muted-foreground font-semibold">Challenge Progress</span>
              <span className="font-bold text-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-4" />
          </div>

          {/* Current Title */}
          <div className="text-center p-6 md:p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20">
            <div className="text-6xl md:text-7xl mb-3">{currentTitle.emoji}</div>
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
              Day {daysElapsed} of {CHALLENGE_DURATION}
            </div>
            <div className="text-xl md:text-2xl text-foreground font-bold">{currentTitle.title}</div>
            {isComplete && (
              <div className="mt-4 p-4 bg-primary/20 rounded-lg text-primary font-bold text-lg">
                🎉 Congratulations! You've completed the NUT Challenge!
              </div>
            )}
          </div>

          {/* Time Remaining */}
          {!isComplete && (
            <div className="text-center text-base md:text-lg text-muted-foreground">
              Challenge ends {getTimeUntilEnd()}
            </div>
          )}

          {/* Reset Button */}
          <div className="flex justify-center pt-4">
            {!showConfirmReset ? (
              <Button
                variant="outline"
                size="default"
                onClick={() => setShowConfirmReset(true)}
                className="text-base text-muted-foreground hover:text-destructive"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Challenge
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => setShowConfirmReset(false)}
                  className="text-base text-muted-foreground"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  size="default"
                  onClick={resetChallenge}
                  className="bg-destructive text-destructive-foreground text-base"
                >
                  Confirm Reset
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Milestones */}
      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground">Progression Titles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {MILESTONES.map((milestone, index) => {
            const achieved = isMilestoneAchieved(milestone.day)
            const isCurrent =
              daysElapsed >= milestone.day &&
              daysElapsed < (MILESTONES[index + 1]?.day || CHALLENGE_DURATION + 1)

            return (
              <Card
                key={milestone.day}
                className={`bg-card border-border p-6 md:p-8 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                  achieved ? "border-primary/50 bg-primary/5 ring-2 ring-primary/30" : ""
                } ${isCurrent ? "ring-2 ring-primary/50 border-primary" : ""}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{milestone.emoji}</span>
                  {achieved && <Trophy className="h-6 w-6 text-primary animate-pulse" />}
                </div>
                <p className="text-base md:text-lg text-muted-foreground mb-2">Day {milestone.day}</p>
                <p
                  className={`text-lg md:text-xl font-bold ${
                    achieved ? "text-primary" : "text-foreground"
                  }`}
                >
                  {milestone.title}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  {achieved && (
                    <span className="text-sm md:text-base text-primary font-semibold flex items-center gap-1">
                      ✓ Achieved
                    </span>
                  )}
                  <span className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {milestone.xp} XP
                  </span>
                </div>
                {isCurrent && !achieved && (
                  <p className="text-xs md:text-sm text-muted-foreground mt-2">Current milestone</p>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
