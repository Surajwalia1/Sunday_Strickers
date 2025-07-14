import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, ArrowLeft, Users, Star } from "lucide-react";

export default function Players() {
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
      <section className="py-16">
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

          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-football-blue-600 to-football-maroon-600 bg-clip-text text-transparent">
              Sunday Players
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Meet the legends who show up every week
            </p>
          </div>
        </div>
      </section>

      {/* Players Coming Soon */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/80 backdrop-blur-sm border-football-blue-100 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-football-blue-500 to-football-maroon-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-4">
                Player Profiles Coming Soon! ⚽
              </h2>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                We're putting together an amazing showcase of all our Sunday
                warriors. Each player will have their own card with photos,
                stats, positions, and fun facts!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3 p-4 bg-football-blue-50 rounded-lg">
                  <Star className="w-5 h-5 text-football-blue-500" />
                  <span className="text-football-blue-700 font-medium">
                    Player Photos & Bios
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-football-orange-50 rounded-lg">
                  <Star className="w-5 h-5 text-football-orange-500" />
                  <span className="text-football-orange-700 font-medium">
                    Positions & Stats
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-football-maroon-50 rounded-lg">
                  <Star className="w-5 h-5 text-football-maroon-500" />
                  <span className="text-football-maroon-700 font-medium">
                    Fun Facts & Quotes
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-football-blue-50 rounded-lg">
                  <Star className="w-5 h-5 text-football-blue-500" />
                  <span className="text-football-blue-700 font-medium">
                    Goals & Appearances
                  </span>
                </div>
              </div>

              <Link to="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-football-blue-200 text-football-blue-600 hover:bg-football-blue-50"
                >
                  Back to Home
                  <ArrowLeft className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
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
