import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Goal,
  Users,
  Calendar,
  Star,
} from "lucide-react";

interface Player {
  id: string;
  name: string;
  nickname: string;
  position:
    | "GOALKEEPERS"
    | "DEFENDERS"
    | "MIDFIELDERS"
    | "FORWARDS"
    | "COACHING STAFF";
  jerseyNumber?: string;
  photo: string;
  bio: string;
  appearances: number;
  goals: number;
  funFact: string;
  quote: string;
  team: string;
}

const players: Player[] = [
  {
    id: "1",
    name: "Rahul",
    nickname: "Safe Hands",
    position: "GOALKEEPERS",
    jerseyNumber: "1",
    photo:
      "https://images.unsplash.com/photo-1594736797933-d0c32e5d0b06?w=400&h=500&fit=crop&crop=face",
    bio: "Our reliable last line of defense who never gives up on a ball.",
    appearances: 42,
    goals: 0,
    funFact: "Has saved 3 penalties this season! 🥅",
    quote: "They don't call me Safe Hands for nothing!",
    team: "Coming Soon",
  },
  {
    id: "2",
    name: "Arjun",
    nickname: "The Wall",
    position: "DEFENDERS",
    jerseyNumber: "4",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    bio: "Solid defender who reads the game like a book.",
    appearances: 38,
    goals: 3,
    funFact: "Never missed a header in the penalty box 💪",
    quote: "You shall not pass!",
    team: "Coming Soon",
  },
  {
    id: "3",
    name: "Vikram",
    nickname: "Captain",
    position: "DEFENDERS",
    jerseyNumber: "5",
    photo:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=500&fit=crop&crop=face",
    bio: "Our captain and defensive stalwart who leads by example.",
    appearances: 45,
    goals: 5,
    funFact: "Always arrives 30 minutes early ⏰",
    quote: "Leading from the back since day one!",
    team: "Coming Soon",
  },
  {
    id: "4",
    name: "Amit",
    nickname: "Playmaker",
    position: "MIDFIELDERS",
    jerseyNumber: "8",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    bio: "Creative midfielder with an eye for the perfect pass.",
    appearances: 40,
    goals: 12,
    funFact: "Can bend it like Beckham from 30 yards ⚽",
    quote: "Football is about making the impossible pass!",
    team: "Coming Soon",
  },
  {
    id: "5",
    name: "Rohit",
    nickname: "Engine",
    position: "MIDFIELDERS",
    jerseyNumber: "6",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
    bio: "Box-to-box midfielder who covers every blade of grass.",
    appearances: 43,
    goals: 8,
    funFact: "Runs 12km every game without breaking a sweat 🏃‍♂️",
    quote: "I'll run until the final whistle!",
    team: "Coming Soon",
  },
  {
    id: "6",
    name: "Karan",
    nickname: "Striker",
    position: "FORWARDS",
    jerseyNumber: "9",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face",
    bio: "Clinical finisher who lives for goals.",
    appearances: 41,
    goals: 28,
    funFact: "Loves scoring volleys from impossible angles 🎯",
    quote: "Give me half a chance and I'll bury it!",
    team: "Coming Soon",
  },
  {
    id: "7",
    name: "Priya",
    nickname: "Lightning",
    position: "FORWARDS",
    jerseyNumber: "11",
    photo:
      "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=400&h=500&fit=crop&crop=face",
    bio: "Speedy winger who terrorizes defenders.",
    appearances: 37,
    goals: 15,
    funFact: "First to arrive, last to leave every Sunday 🌟",
    quote: "Speed kills, but skill pays the bills!",
    team: "Coming Soon",
  },
  {
    id: "8",
    name: "Coach Dev",
    nickname: "Guru Ji",
    position: "COACHING STAFF",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
    bio: "The mastermind behind our Sunday success.",
    appearances: 50,
    goals: 0,
    funFact: "Can spot talent from a mile away 👁️",
    quote: "Football is 90% mental, the other half is physical!",
    team: "Coming Soon",
  },
];

const positions = [
  "ALL",
  "GOALKEEPERS",
  "DEFENDERS",
  "MIDFIELDERS",
  "FORWARDS",
  "COACHING STAFF",
];

const getGradientByPosition = (position: string) => {
  switch (position) {
    case "GOALKEEPERS":
      return "bg-gradient-to-br from-green-500 via-green-600 to-purple-900";
    case "DEFENDERS":
      return "bg-gradient-to-br from-football-blue-500 via-football-blue-600 to-purple-900";
    case "MIDFIELDERS":
      return "bg-gradient-to-br from-football-orange-500 via-football-orange-600 to-purple-900";
    case "FORWARDS":
      return "bg-gradient-to-br from-football-maroon-500 via-football-maroon-600 to-purple-900";
    case "COACHING STAFF":
      return "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-900";
    default:
      return "bg-gradient-to-br from-football-blue-500 via-football-maroon-500 to-purple-900";
  }
};

export default function Players() {
  const [selectedPosition, setSelectedPosition] = useState("ALL");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const filteredPlayers =
    selectedPosition === "ALL"
      ? players
      : players.filter((player) => player.position === selectedPosition);

  const toggleCard = (playerId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(playerId)) {
      newExpanded.delete(playerId);
    } else {
      newExpanded.add(playerId);
    }
    setExpandedCards(newExpanded);
  };

  const getPositionCount = (position: string) => {
    if (position === "ALL") return players.length;
    return players.filter((p) => p.position === position).length;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-football-blue-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-football-orange-500 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-football-maroon-500 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-football-blue-400 rounded-full animate-ping delay-700"></div>

        {/* Large Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-football-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-football-orange-500/15 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-32 w-80 h-80 bg-gradient-to-br from-football-maroon-500/20 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>
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
                className="text-white/70 hover:text-football-blue-400 transition-all duration-300 font-medium relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-football-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/players"
                className="text-white hover:text-football-orange-400 transition-all duration-300 font-medium relative group"
              >
                Players
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-football-orange-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-8">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-football-blue-400 to-football-maroon-400 bg-clip-text text-transparent">
              Sunday Warriors
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
              Meet the legends who show up every week ⚽
            </p>
          </div>

          {/* Position Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {positions.map((position) => (
              <button
                key={position}
                onClick={() => setSelectedPosition(position)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedPosition === position
                    ? "bg-gradient-to-r from-football-blue-500 to-football-maroon-500 text-white shadow-lg"
                    : "bg-white/10 backdrop-blur-md text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {position}
                <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                  {getPositionCount(position)}
                </span>
              </button>
            ))}
          </div>

          {/* Position Title */}
          {selectedPosition !== "ALL" && (
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {selectedPosition}
              </h2>
            </div>
          )}
        </div>
      </section>

      {/* Players Grid */}
      <section className="pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlayers.map((player) => (
              <div key={player.id} className="space-y-4">
                {/* Barcelona-style Player Card */}
                <div
                  className={`relative h-96 rounded-lg overflow-hidden cursor-pointer group ${getGradientByPosition(player.position)} shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2`}
                >
                  {/* Player Image */}
                  <div className="absolute inset-0">
                    <img
                      src={player.photo}
                      alt={player.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  </div>

                  {/* Jersey Number */}
                  {player.jerseyNumber && (
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {player.jerseyNumber}
                      </span>
                    </div>
                  )}

                  {/* Default State - Name and Position */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
                    <div className="text-white">
                      <p className="text-sm opacity-80 mb-1">
                        {player.nickname}
                      </p>
                      <h3 className="text-2xl font-bold mb-1">{player.name}</h3>
                      <p className="text-sm text-white/80 capitalize">
                        {player.position.toLowerCase().replace("_", " ")}
                      </p>
                    </div>
                  </div>

                  {/* Hover State - Stats Display */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/95 to-transparent">
                    <div className="text-white space-y-4">
                      {/* Player Name */}
                      <div>
                        <p className="text-sm opacity-80 mb-1">
                          {player.nickname}
                        </p>
                        <h3 className="text-2xl font-bold">{player.name}</h3>
                        <p className="text-sm text-white/80 capitalize">
                          {player.position.toLowerCase().replace("_", " ")}
                        </p>
                      </div>

                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-4 pt-2">
                        <div className="text-center">
                          <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                            Appearances
                          </div>
                          <div className="text-2xl font-bold">
                            {player.appearances}
                          </div>
                          <div className="text-xs text-white/60">
                            2024 Season
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                            Goals
                          </div>
                          <div className="text-2xl font-bold">
                            {player.goals}
                          </div>
                          <div className="text-xs text-white/60">
                            2024 Season
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                            Fun Rating
                          </div>
                          <div className="text-2xl font-bold">100</div>
                          <div className="text-xs text-white/60">
                            2024 Season
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Read More Section (Below Card) */}
                <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="border-football-orange-400/30 text-football-orange-400 bg-football-orange-500/10"
                      >
                        {player.team}
                      </Badge>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCard(player.id)}
                        className="text-football-blue-400 hover:text-football-blue-300 hover:bg-football-blue-500/10"
                      >
                        {expandedCards.has(player.id) ? (
                          <>
                            Less <ChevronUp className="w-4 h-4 ml-1" />
                          </>
                        ) : (
                          <>
                            Read More <ChevronDown className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Expanded Content */}
                    {expandedCards.has(player.id) && (
                      <div className="space-y-4 pt-4 border-t border-white/10 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-white/70 leading-relaxed">
                          {player.bio}
                        </p>

                        <div className="space-y-3">
                          <div className="p-3 bg-football-orange-500/20 rounded-lg border border-football-orange-500/30">
                            <div className="flex items-center space-x-2 mb-2">
                              <Star className="w-4 h-4 text-football-orange-400" />
                              <span className="font-medium text-football-orange-300">
                                Fun Fact
                              </span>
                            </div>
                            <p className="text-football-orange-200 text-sm">
                              {player.funFact}
                            </p>
                          </div>

                          <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-2xl">💬</span>
                              <span className="font-medium text-white/80">
                                Quote
                              </span>
                            </div>
                            <p className="text-white/70 text-sm italic">
                              "{player.quote}"
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No players found
              </h3>
              <p className="text-white/70">
                Try selecting a different position.
              </p>
            </div>
          )}
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
