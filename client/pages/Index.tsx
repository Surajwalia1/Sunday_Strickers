import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, Heart, Trophy } from "lucide-react";

export default function Index() {
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
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/players"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Players
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-football-blue-500"></div>
          <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-football-orange-500"></div>
          <div className="absolute bottom-40 left-32 w-20 h-20 rounded-full bg-football-maroon-500"></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 rounded-full bg-football-blue-400"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-8">
            {/* Main Title */}
            <h1 className="hero-title">The Sunday Game</h1>

            {/* Subtitle */}
            <p className="subtitle max-w-2xl mx-auto">
              Every Sunday. No club. Just vibes.
            </p>

            {/* Description */}
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                A bunch of friends who gather every Sunday to play football and
                have fun. No team. No rules. Just good games and shukrana.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Link to="/players">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-football-blue-500 to-football-maroon-500 hover:from-football-blue-600 hover:to-football-maroon-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  See Sunday Players
                  <Users className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-football-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-football-blue-500 to-football-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Weekly Games
                </h3>
                <p className="text-muted-foreground">
                  Every Sunday, rain or shine. Our regular meetup brings
                  together passionate players for friendly matches.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-football-orange-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-football-orange-500 to-football-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  No Pressure
                </h3>
                <p className="text-muted-foreground">
                  Just pure love for the game. No strict rules, no pressure -
                  just friends having fun with football.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-football-maroon-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-football-maroon-500 to-football-maroon-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Community
                </h3>
                <p className="text-muted-foreground">
                  More than just a game - we're a community of friends who share
                  the passion for football and good vibes.
                </p>
              </CardContent>
            </Card>
          </div>
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
