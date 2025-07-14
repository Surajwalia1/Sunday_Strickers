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
      return "bg-gradient-to-br from-green-500 to-green-700";
    case "DEFENDERS":
      return "bg-gradient-to-br from-football-blue-500 to-football-blue-700";
    case "MIDFIELDERS":
      return "bg-gradient-to-br from-football-orange-500 to-football-orange-700";
    case "FORWARDS":
      return "bg-gradient-to-br from-football-maroon-500 to-football-maroon-700";
    case "COACHING STAFF":
      return "bg-gradient-to-br from-purple-500 to-purple-700";
    default:
      return "bg-gradient-to-br from-football-blue-500 to-football-maroon-500";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-football-blue-50 to-football-orange-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-football-blue-500 to-football-maroon-500 rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                The Sunday Game
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/players"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Players
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-8">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-football-blue-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-football-blue-600 to-football-maroon-600 bg-clip-text text-transparent">
              Sunday Warriors
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Meet the legends who show up every week ⚽
            </p>
          </div>

          {/* Position Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {positions.map((position) => (
              <button
                key={position}
                onClick={() => setSelectedPosition(position)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedPosition === position
                    ? "bg-football-blue-500 text-white shadow-lg"
                    : "bg-white/80 text-football-blue-700 hover:bg-football-blue-100"
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {selectedPosition}
              </h2>
            </div>
          )}
        </div>
      </section>

      {/* Players Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlayers.map((player) => (
              <Card
                key={player.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div
                  className={`relative h-80 ${getGradientByPosition(player.position)}`}
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Jersey Number */}
                  {player.jerseyNumber && (
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {player.jerseyNumber}
                      </span>
                    </div>
                  )}

                  {/* Position Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30">
                      {player.position.split(" ")[0]}
                    </Badge>
                  </div>

                  {/* Player Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="text-white">
                      <p className="text-sm opacity-80 mb-1">
                        {player.nickname}
                      </p>
                      <h3 className="text-2xl font-bold mb-2">{player.name}</h3>

                      {/* Quick Stats */}
                      <div className="flex items-center space-x-4 text-sm opacity-90">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{player.appearances}</span>
                        </div>
                        {player.goals > 0 && (
                          <div className="flex items-center space-x-1">
                            <Goal className="w-3 h-3" />
                            <span>{player.goals}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {player.bio}
                    </p>

                    {/* Team Status */}
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="border-football-orange-200 text-football-orange-600"
                      >
                        {player.team}
                      </Badge>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCard(player.id)}
                        className="text-football-blue-600 hover:text-football-blue-700 hover:bg-football-blue-50"
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
                      <div className="space-y-4 pt-4 border-t border-border animate-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-football-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-football-blue-600">
                              {player.appearances}
                            </div>
                            <div className="text-xs text-football-blue-500">
                              APPEARANCES
                            </div>
                          </div>
                          <div className="text-center p-3 bg-football-maroon-50 rounded-lg">
                            <div className="text-2xl font-bold text-football-maroon-600">
                              {player.goals}
                            </div>
                            <div className="text-xs text-football-maroon-500">
                              GOALS
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="p-3 bg-football-orange-50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Star className="w-4 h-4 text-football-orange-500" />
                              <span className="font-medium text-football-orange-700">
                                Fun Fact
                              </span>
                            </div>
                            <p className="text-football-orange-600 text-sm">
                              {player.funFact}
                            </p>
                          </div>

                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-2xl">💬</span>
                              <span className="font-medium text-gray-700">
                                Quote
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm italic">
                              "{player.quote}"
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No players found
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different position.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-football-blue-50 to-football-maroon-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-football-blue-500 to-football-maroon-500 rounded-full flex items-center justify-center">
              <Trophy className="w-3 h-3 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">
              The Sunday Game
            </span>
          </div>
          <p className="text-muted-foreground">
            Made with ❤️ for the Sunday football community
          </p>
        </div>
      </footer>
    </div>
  );
}
