import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users,
  Calendar,
  Heart,
  Trophy,
  Star,
  Zap,
  Target,
  LogIn,
  LogOut,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-football-blue-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-football-orange-500 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-football-maroon-500 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-football-blue-400 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-football-orange-400 rounded-full animate-pulse delay-1000"></div>

        {/* Large Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-football-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-football-orange-500/15 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-32 w-80 h-80 bg-gradient-to-br from-football-maroon-500/20 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-br from-football-blue-400/25 to-transparent rounded-full blur-2xl animate-pulse delay-500"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-black/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-football-blue-500 to-football-maroon-500 rounded-full flex items-center justify-center animate-pulse">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                The Sunday Game
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-white hover:text-football-blue-400 transition-all duration-300 font-medium relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-football-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/players"
                className="text-white/70 hover:text-football-orange-400 transition-all duration-300 font-medium relative group"
              >
                Players
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-football-orange-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-8">
            {/* Main Title with Enhanced Animation */}
            <div className="relative">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-r from-football-blue-400 via-football-orange-400 to-football-maroon-400 bg-clip-text text-transparent animate-pulse">
                The Sunday Game
              </h1>

              {/* Glowing Effect */}
              <div className="absolute inset-0 text-6xl md:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-r from-football-blue-400 via-football-orange-400 to-football-maroon-400 bg-clip-text text-transparent blur-xl opacity-50 animate-pulse"></div>

              {/* Floating Elements around title */}
              <div className="absolute -top-8 -left-8 text-4xl animate-bounce delay-300">
                ⚽
              </div>
              <div className="absolute -top-4 -right-12 text-2xl animate-bounce delay-700">
                🏆
              </div>
              <div className="absolute -bottom-4 left-16 text-3xl animate-bounce delay-1000">
                💪
              </div>
            </div>

            {/* Subtitle with typing effect */}
            <div className="relative">
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-football-blue-300 animate-pulse">
                Every Sunday. No club. Just vibes.
              </p>
              <div className="absolute top-0 right-0 w-1 h-8 bg-football-orange-400 animate-pulse"></div>
            </div>

            {/* Description with stagger animation */}
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-white/80 leading-relaxed animate-fade-in-up">
                A bunch of friends who gather every Sunday to play football and
                have fun. No team. No rules. Just good games and{" "}
                <span className="text-football-orange-400 font-semibold animate-pulse">
                  shukrana
                </span>
                .
              </p>
            </div>

            {/* Enhanced CTA Button */}
            <div className="pt-8">
              <Link to="/players">
                <Button className="relative bg-gradient-to-r from-football-blue-500 to-football-maroon-500 hover:from-football-blue-600 hover:to-football-maroon-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -top-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-45 group-hover:animate-pulse"></div>

                  <span className="relative z-10 flex items-center">
                    See Sunday Players
                    <Users className="ml-2 w-5 h-5 group-hover:animate-bounce" />
                  </span>

                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-football-blue-500 to-football-maroon-500 rounded-xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 relative">
        {/* Section background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-football-blue-400 to-football-orange-400 bg-clip-text text-transparent mb-4">
              Why We Play
            </h2>
            <p className="text-white/70 text-lg">
              The beautiful game brings us together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-football-blue-900/50 to-football-blue-800/30 backdrop-blur-md border-football-blue-500/30 hover:border-football-blue-400/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-football-blue-500/20 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-football-blue-500 to-football-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse group-hover:scale-110 transition-transform duration-500">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-football-blue-300 transition-colors">
                  Weekly Games
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors">
                  Every Sunday, rain or shine. Our regular meetup brings
                  together passionate players for friendly matches.
                </p>

                {/* Floating icons */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Star className="w-4 h-4 text-football-blue-400 animate-pulse" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-football-orange-900/50 to-football-orange-800/30 backdrop-blur-md border-football-orange-500/30 hover:border-football-orange-400/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-football-orange-500/20 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-football-orange-500 to-football-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse group-hover:scale-110 transition-transform duration-500">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-football-orange-300 transition-colors">
                  No Pressure
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors">
                  Just pure love for the game. No strict rules, no pressure -
                  just friends having fun with football.
                </p>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Zap className="w-4 h-4 text-football-orange-400 animate-pulse" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-football-maroon-900/50 to-football-maroon-800/30 backdrop-blur-md border-football-maroon-500/30 hover:border-football-maroon-400/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-football-maroon-500/20 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-football-maroon-500 to-football-maroon-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse group-hover:scale-110 transition-transform duration-500">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-football-maroon-300 transition-colors">
                  Community
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors">
                  More than just a game - we're a community of friends who share
                  the passion for football and good vibes.
                </p>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Target className="w-4 h-4 text-football-maroon-400 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-football-blue-900/20 via-transparent to-football-orange-900/20"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-football-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-white/70 text-sm uppercase tracking-wider">
                Games Played
              </div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-football-orange-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="text-white/70 text-sm uppercase tracking-wider">
                Active Players
              </div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-football-maroon-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                200+
              </div>
              <div className="text-white/70 text-sm uppercase tracking-wider">
                Goals Scored
              </div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-football-blue-300 mb-2 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-white/70 text-sm uppercase tracking-wider">
                Fun Guaranteed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-md border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-football-blue-500 to-football-maroon-500 rounded-full flex items-center justify-center animate-pulse">
              <Trophy className="w-3 h-3 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              The Sunday Game
            </span>
          </div>
          <p className="text-white/70">
            Made with <span className="text-red-400 animate-pulse">❤️</span> for
            the Sunday football community
          </p>
        </div>
      </footer>
    </div>
  );
}
