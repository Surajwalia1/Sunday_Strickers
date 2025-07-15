import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Trophy,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Goal,
  Users,
  Calendar,
  Star,
  Plus,
  Edit3,
  Save,
  X,
  Trash2,
} from "lucide-react";

interface Player {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  nickname: string;
  position:
    | "GOALKEEPERS"
    | "DEFENDERS"
    | "MIDFIELDERS"
    | "FORWARDS"
    | "COACHING STAFF";
  positionDisplay: string;
  team: "Team A" | "Team B";
  jerseyNumber?: string;
  photo: string;
  bio: string;
  appearances: number;
  goals: number;
  saves?: number;
  cleanSheets?: number;
  funFact: string;
  quote: string;
}

// API functions
const api = {
  async getAllPlayers(): Promise<Player[]> {
    const response = await fetch("/api/players");
    if (!response.ok) throw new Error("Failed to fetch players");
    return response.json();
  },

  async addPlayer(playerData: Omit<Player, "id">): Promise<Player> {
    const response = await fetch("/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playerData),
    });
    if (!response.ok) throw new Error("Failed to add player");
    return response.json();
  },

  async updatePlayer(id: string, playerData: Partial<Player>): Promise<Player> {
    const response = await fetch(`/api/players/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playerData),
    });
    if (!response.ok) throw new Error("Failed to update player");
    return response.json();
  },

  async deletePlayer(id: string): Promise<void> {
    const response = await fetch(`/api/players/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete player");
  },
};

const positions = [
  "ALL",
  "GOALKEEPERS",
  "DEFENDERS",
  "MIDFIELDERS",
  "FORWARDS",
  "COACHING STAFF",
];

const teams = ["ALL", "Team A", "Team B"];

const getGradientByPosition = (position: string) => {
  switch (position) {
    case "GOALKEEPERS":
      return "bg-gradient-to-br from-green-500 via-purple-600 to-purple-900";
    case "DEFENDERS":
      return "bg-gradient-to-br from-football-blue-500 via-purple-600 to-purple-900";
    case "MIDFIELDERS":
      return "bg-gradient-to-br from-football-orange-500 via-purple-600 to-purple-900";
    case "FORWARDS":
      return "bg-gradient-to-br from-football-maroon-500 via-purple-600 to-purple-900";
    case "COACHING STAFF":
      return "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-900";
    default:
      return "bg-gradient-to-br from-football-blue-500 via-purple-600 to-purple-900";
  }
};

const getTeamColor = (team: string) => {
  return team === "Team A"
    ? "bg-football-blue-500/20 border-football-blue-500/40 text-football-blue-300"
    : "bg-football-maroon-500/20 border-football-maroon-500/40 text-football-maroon-300";
};

export default function Players() {
  const { isLoggedIn } = useAuth();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState("ALL");
  const [selectedTeam, setSelectedTeam] = useState("ALL");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  // Form state for adding/editing players
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nickname: "",
    position: "FORWARDS" as Player["position"],
    team: "Team A" as Player["team"],
    jerseyNumber: "",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    bio: "",
    appearances: 0,
    goals: 0,
    saves: 0,
    cleanSheets: 0,
    funFact: "",
    quote: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showMatchView, setShowMatchView] = useState(false);
  const [matchTeamFilter, setMatchTeamFilter] = useState("ALL");

  // Fetch players on component mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const playersData = await api.getAllPlayers();
        setPlayers(playersData);
        setError(null);
      } catch (err) {
        console.error("Error fetching players:", err);
        setError("Failed to load players");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter((player) => {
    const positionMatch =
      selectedPosition === "ALL" || player.position === selectedPosition;
    const teamMatch = selectedTeam === "ALL" || player.team === selectedTeam;
    return positionMatch && teamMatch;
  });

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

  const getTeamCount = (team: string) => {
    if (team === "ALL") return players.length;
    return players.filter((p) => p.team === team).length;
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      nickname: "",
      position: "FORWARDS",
      team: "Team A",
      jerseyNumber: "",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
      bio: "",
      appearances: 0,
      goals: 0,
      saves: 0,
      cleanSheets: 0,
      funFact: "",
      quote: "",
    });
    setSelectedFile(null);
  };

  const handleFileUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("photo", file);

    setUploading(true);
    try {
      const response = await fetch("/api/upload/photo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleAddPlayer = async () => {
    try {
      let photoUrl = formData.photo;

      // Upload file if one is selected
      if (selectedFile) {
        photoUrl = await handleFileUpload(selectedFile);
      }

      const playerData = {
        name: formData.firstName,
        firstName: formData.firstName,
        lastName: formData.lastName.toUpperCase(),
        nickname: formData.nickname,
        position: formData.position,
        positionDisplay: formData.position.toLowerCase().replace("_", " "),
        team: formData.team,
        jerseyNumber: formData.jerseyNumber || undefined,
        photo: photoUrl,
        bio: formData.bio,
        appearances: formData.appearances,
        goals: formData.goals,
        saves: formData.saves,
        cleanSheets: formData.cleanSheets,
        funFact: formData.funFact,
        quote: formData.quote,
      };

      const newPlayer = await api.addPlayer(playerData);
      setPlayers([...players, newPlayer]);
      setIsAddPlayerOpen(false);
      resetForm();
    } catch (error) {
      console.error("Failed to add player:", error);
      setError("Failed to add player");
    }
  };

  const handleEditPlayer = (player: Player) => {
    setEditingPlayer(player);
    setFormData({
      firstName: player.firstName,
      lastName: player.lastName,
      nickname: player.nickname,
      position: player.position,
      team: player.team,
      jerseyNumber: player.jerseyNumber || "",
      photo: player.photo,
      bio: player.bio,
      appearances: player.appearances,
      goals: player.goals,
      saves: player.saves || 0,
      cleanSheets: player.cleanSheets || 0,
      funFact: player.funFact,
      quote: player.quote,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingPlayer) return;

    try {
      let photoUrl = formData.photo;

      // Upload file if one is selected
      if (selectedFile) {
        photoUrl = await handleFileUpload(selectedFile);
      }

      const playerData = {
        firstName: formData.firstName,
        lastName: formData.lastName.toUpperCase(),
        nickname: formData.nickname,
        position: formData.position,
        positionDisplay: formData.position.toLowerCase().replace("_", " "),
        team: formData.team,
        jerseyNumber: formData.jerseyNumber || undefined,
        photo: photoUrl,
        bio: formData.bio,
        appearances: formData.appearances,
        goals: formData.goals,
        saves: formData.saves,
        cleanSheets: formData.cleanSheets,
        funFact: formData.funFact,
        quote: formData.quote,
      };

      const updatedPlayer = await api.updatePlayer(
        editingPlayer.id,
        playerData,
      );
      setPlayers(
        players.map((p) => (p.id === editingPlayer.id ? updatedPlayer : p)),
      );
      setEditingPlayer(null);
      resetForm();
    } catch (error) {
      console.error("Failed to update player:", error);
      setError("Failed to update player");
    }
  };

  const handleDeletePlayer = async (playerId: string) => {
    try {
      await api.deletePlayer(playerId);
      setPlayers(players.filter((p) => p.id !== playerId));
      // Close expanded card if it was expanded
      const newExpanded = new Set(expandedCards);
      newExpanded.delete(playerId);
      setExpandedCards(newExpanded);
    } catch (error) {
      console.error("Failed to delete player:", error);
      setError("Failed to delete player");
    }
  };

  // Match View Component
  const MatchView = () => {
    const teamAPlayers = players.filter((p) => p.team === "Team A");
    const teamBPlayers = players.filter((p) => p.team === "Team B");
    const [hoveredPlayer, setHoveredPlayer] = useState<Player | null>(null);
    const [animationStage, setAnimationStage] = useState<
      "smoke" | "lightning" | "field"
    >("smoke");

    // Handle animation stages
    useEffect(() => {
      // Stage 1: 4 seconds of smoke
      const smokeTimer = setTimeout(() => {
        setAnimationStage("lightning");
      }, 4000);

      // Stage 2: Lightning clears smoke (0.5 seconds)
      const lightningTimer = setTimeout(() => {
        setAnimationStage("field");
      }, 4500);

      return () => {
        clearTimeout(smokeTimer);
        clearTimeout(lightningTimer);
      };
    }, []);

    const getPositionPlayers = (team: Player[], position: string) => {
      return team.filter((p) => p.position === position);
    };

    const PlayerIcon = ({
      player,
      side,
    }: {
      player: Player;
      side: "left" | "right";
    }) => (
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setHoveredPlayer(player)}
        onMouseLeave={() => setHoveredPlayer(null)}
      >
        <div
          className={`w-16 h-16 rounded-full border-4 ${
            side === "left"
              ? "border-blue-400 shadow-blue-400/50"
              : "border-red-400 shadow-red-400/50"
          } shadow-lg transform transition-all duration-300 hover:scale-110 animate-bounce`}
          style={{ animationDelay: `${Math.random() * 2}s` }}
        >
          <img
            src={player.photo}
            alt={player.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="text-white text-xs text-center mt-1 font-medium">
          {player.firstName}
        </div>

        {/* Hover Stats Card */}
        {hoveredPlayer?.id === player.id && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg p-3 min-w-48 z-10 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="text-white text-sm">
              <div className="font-bold">
                {player.firstName} {player.lastName}
              </div>
              <div className="text-white/70">{player.positionDisplay}</div>
              <div className="text-white/60 text-xs mt-1">
                Matches: {player.appearances} | Goals: {player.goals}
              </div>
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div className="fixed inset-0 z-50 bg-black">
        {/* Smokey Entrance Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-transparent to-gray-900/80 animate-pulse"></div>

        {/* Lightning Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-full h-1 bg-white animate-pulse opacity-0 animate-ping"></div>
          <div
            className="absolute bottom-10 right-10 w-full h-1 bg-blue-400 animate-pulse opacity-0"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Football Field Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2Fcabdb90a4fd44d488913e5147f1caf35%2F4bc84d7711b84df2bd48bf3b6259d7d5?format=webp&width=800')`,
          }}
        ></div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Button
            onClick={() => setShowMatchView(false)}
            variant="ghost"
            className="text-white hover:bg-white/10 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Players
          </Button>
        </div>

        {/* Team Filter */}
        <div className="absolute top-6 right-6 z-20 flex space-x-2">
          {["ALL", "Team A", "Team B"].map((filter) => (
            <Button
              key={filter}
              onClick={() => setMatchTeamFilter(filter)}
              variant={matchTeamFilter === filter ? "default" : "ghost"}
              className={`text-white backdrop-blur-md ${
                matchTeamFilter === filter ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Field Content */}
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="w-full max-w-6xl h-full max-h-96 relative">
            {/* Team A (Left Side) */}
            {(matchTeamFilter === "ALL" || matchTeamFilter === "Team A") && (
              <div className="absolute left-0 top-0 w-1/2 h-full">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-blue-400">Team A</h2>
                </div>

                {/* Goalkeeper */}
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                  {getPositionPlayers(teamAPlayers, "GOALKEEPERS")
                    .slice(0, 1)
                    .map((player) => (
                      <PlayerIcon key={player.id} player={player} side="left" />
                    ))}
                </div>

                {/* Defenders */}
                <div className="absolute left-16 top-1/2 transform -translate-y-1/2 space-y-8">
                  {getPositionPlayers(teamAPlayers, "DEFENDERS")
                    .slice(0, 3)
                    .map((player, index) => (
                      <div
                        key={player.id}
                        style={{ marginTop: index * 64 - 64 }}
                      >
                        <PlayerIcon player={player} side="left" />
                      </div>
                    ))}
                </div>

                {/* Midfielders */}
                <div className="absolute left-32 top-1/2 transform -translate-y-1/2 space-y-6">
                  {getPositionPlayers(teamAPlayers, "MIDFIELDERS")
                    .slice(0, 2)
                    .map((player, index) => (
                      <div
                        key={player.id}
                        style={{ marginTop: index * 48 - 24 }}
                      >
                        <PlayerIcon player={player} side="left" />
                      </div>
                    ))}
                </div>

                {/* Forwards */}
                <div className="absolute left-48 top-1/2 transform -translate-y-1/2 space-y-6">
                  {getPositionPlayers(teamAPlayers, "FORWARDS")
                    .slice(0, 2)
                    .map((player, index) => (
                      <div
                        key={player.id}
                        style={{ marginTop: index * 48 - 24 }}
                      >
                        <PlayerIcon player={player} side="left" />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Team B (Right Side) */}
            {(matchTeamFilter === "ALL" || matchTeamFilter === "Team B") && (
              <div className="absolute right-0 top-0 w-1/2 h-full">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-red-400">Team B</h2>
                </div>

                {/* Goalkeeper */}
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                  {getPositionPlayers(teamBPlayers, "GOALKEEPERS")
                    .slice(0, 1)
                    .map((player) => (
                      <PlayerIcon
                        key={player.id}
                        player={player}
                        side="right"
                      />
                    ))}
                </div>

                {/* Defenders */}
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2 space-y-8">
                  {getPositionPlayers(teamBPlayers, "DEFENDERS")
                    .slice(0, 3)
                    .map((player, index) => (
                      <div
                        key={player.id}
                        style={{ marginTop: index * 64 - 64 }}
                      >
                        <PlayerIcon player={player} side="right" />
                      </div>
                    ))}
                </div>

                {/* Midfielders */}
                <div className="absolute right-32 top-1/2 transform -translate-y-1/2 space-y-6">
                  {getPositionPlayers(teamBPlayers, "MIDFIELDERS")
                    .slice(0, 2)
                    .map((player, index) => (
                      <div
                        key={player.id}
                        style={{ marginTop: index * 48 - 24 }}
                      >
                        <PlayerIcon player={player} side="right" />
                      </div>
                    ))}
                </div>

                {/* Forwards */}
                <div className="absolute right-48 top-1/2 transform -translate-y-1/2 space-y-6">
                  {getPositionPlayers(teamBPlayers, "FORWARDS")
                    .slice(0, 2)
                    .map((player, index) => (
                      <div
                        key={player.id}
                        style={{ marginTop: index * 48 - 24 }}
                      >
                        <PlayerIcon player={player} side="right" />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/30 transform -translate-x-1/2"></div>
            <div className="absolute left-1/2 top-1/2 w-24 h-24 border-2 border-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Background Music Placeholder */}
        {/* Note: Actual audio would require user interaction due to browser policies */}
        <audio autoPlay loop className="hidden">
          <source src="/match-music.mp3" type="audio/mpeg" />
        </audio>
      </div>
    );
  };

  const PlayerForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-white">
            First Name
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="bg-white/10 border-white/20 text-white"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-white">
            Last Name
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="bg-white/10 border-white/20 text-white"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="nickname" className="text-white">
          Nickname
        </Label>
        <Input
          id="nickname"
          value={formData.nickname}
          onChange={(e) =>
            setFormData({ ...formData, nickname: e.target.value })
          }
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="position" className="text-white">
            Position
          </Label>
          <Select
            value={formData.position}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                position: value as Player["position"],
              })
            }
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GOALKEEPERS">Goalkeeper</SelectItem>
              <SelectItem value="DEFENDERS">Defender</SelectItem>
              <SelectItem value="MIDFIELDERS">Midfielder</SelectItem>
              <SelectItem value="FORWARDS">Forward</SelectItem>
              <SelectItem value="COACHING STAFF">Coach</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="team" className="text-white">
            Team
          </Label>
          <Select
            value={formData.team}
            onValueChange={(value) =>
              setFormData({ ...formData, team: value as Player["team"] })
            }
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Team A">Team A</SelectItem>
              <SelectItem value="Team B">Team B</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="jerseyNumber" className="text-white">
          Jersey Number
        </Label>
        <Input
          id="jerseyNumber"
          value={formData.jerseyNumber}
          onChange={(e) =>
            setFormData({ ...formData, jerseyNumber: e.target.value })
          }
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <div>
        <Label htmlFor="photo" className="text-white">
          Player Photo
        </Label>
        <Input
          id="photo"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setSelectedFile(file);
              // Create preview URL
              const previewUrl = URL.createObjectURL(file);
              setFormData({ ...formData, photo: previewUrl });
            }
          }}
          className="bg-white/10 border-white/20 text-white file:bg-football-blue-500 file:border-0 file:text-white file:rounded-md file:px-3 file:py-1 file:mr-3"
        />
        <div className="text-xs text-white/60 mt-1">
          Upload an image file (max 5MB)
        </div>
        {(formData.photo || selectedFile) && (
          <div className="mt-2">
            <img
              src={formData.photo}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-white/20"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            {uploading && (
              <div className="text-xs text-football-blue-400 mt-1">
                Uploading...
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="bio" className="text-white">
          Bio
        </Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="appearances" className="text-white">
            Appearances
          </Label>
          <Input
            id="appearances"
            type="number"
            value={formData.appearances}
            onChange={(e) =>
              setFormData({
                ...formData,
                appearances: parseInt(e.target.value) || 0,
              })
            }
            className="bg-white/10 border-white/20 text-white"
          />
        </div>
        <div>
          <Label htmlFor="goals" className="text-white">
            Goals
          </Label>
          <Input
            id="goals"
            type="number"
            value={formData.goals}
            onChange={(e) =>
              setFormData({ ...formData, goals: parseInt(e.target.value) || 0 })
            }
            className="bg-white/10 border-white/20 text-white"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="funFact" className="text-white">
          Fun Fact
        </Label>
        <Input
          id="funFact"
          value={formData.funFact}
          onChange={(e) =>
            setFormData({ ...formData, funFact: e.target.value })
          }
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <div>
        <Label htmlFor="quote" className="text-white">
          Quote
        </Label>
        <Input
          id="quote"
          value={formData.quote}
          onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          onClick={isEdit ? handleSaveEdit : handleAddPlayer}
          disabled={uploading}
          className="bg-football-blue-500 hover:bg-football-blue-600 disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {uploading ? "Uploading..." : isEdit ? "Save Changes" : "Add Player"}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (isEdit) {
              setEditingPlayer(null);
            } else {
              setIsAddPlayerOpen(false);
            }
            resetForm();
          }}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Match View Overlay */}
      {showMatchView && <MatchView />}

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
            <div className="flex items-center justify-between mb-8">
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

              <div className="flex items-center space-x-4">
                {/* Match Button */}
                <Button
                  onClick={() => setShowMatchView(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Match
                </Button>

                {/* Add Player Button - Only visible when logged in */}
                {isLoggedIn && (
                  <Dialog
                    open={isAddPlayerOpen}
                    onOpenChange={setIsAddPlayerOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-football-blue-500 to-football-maroon-500 hover:from-football-blue-600 hover:to-football-maroon-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Player
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/90 border-white/20 text-white max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-white">
                          Add New Player
                        </DialogTitle>
                      </DialogHeader>
                      <PlayerForm />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>

            <div className="text-center space-y-4 mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-football-blue-400 to-football-maroon-400 bg-clip-text text-transparent">
                Sunday Warriors
              </h1>
              <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
                Meet the legends who show up every week ⚽
              </p>
            </div>

            {/* Team Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {teams.map((team) => (
                <button
                  key={team}
                  onClick={() => setSelectedTeam(team)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedTeam === team
                      ? team === "Team A"
                        ? "bg-gradient-to-r from-football-blue-500 to-football-blue-600 text-white shadow-lg"
                        : team === "Team B"
                          ? "bg-gradient-to-r from-football-maroon-500 to-football-maroon-600 text-white shadow-lg"
                          : "bg-gradient-to-r from-football-blue-500 to-football-maroon-500 text-white shadow-lg"
                      : "bg-white/10 backdrop-blur-md text-white/70 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {team}
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                    {getTeamCount(team)}
                  </span>
                </button>
              ))}
            </div>

            {/* Position Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {positions.map((position) => (
                <button
                  key={position}
                  onClick={() => setSelectedPosition(position)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedPosition === position
                      ? "bg-gradient-to-r from-football-orange-500 to-football-orange-600 text-white shadow-lg"
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
          </div>
        </section>

        {/* Players Grid */}
        <section className="pb-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Loading State */}
            {loading && (
              <div className="text-center py-20">
                <div className="animate-spin w-8 h-8 border-2 border-football-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-white/70">Loading players...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-20">
                <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-300 mb-4">{error}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Retry
                  </Button>
                </div>
              </div>
            )}

            {/* Players Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlayers.map((player) => (
                  <div key={player.id} className="space-y-4">
                    {/* Barcelona-style Player Card */}
                    <div
                      className={`relative h-96 rounded-lg overflow-hidden cursor-pointer group ${getGradientByPosition(player.position)} shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1`}
                    >
                      {/* Player Image */}
                      <div className="absolute inset-0">
                        <img
                          src={player.photo}
                          alt={player.name}
                          className="w-full h-full object-cover object-center transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>

                      {/* Jersey Number */}
                      {player.jerseyNumber && (
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {player.jerseyNumber}
                          </span>
                        </div>
                      )}

                      {/* Team Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className={getTeamColor(player.team)}>
                          {player.team}
                        </Badge>
                      </div>

                      {/* Action Buttons - Only visible when logged in */}
                      {isLoggedIn && (
                        <div className="absolute top-4 right-16 flex space-x-2">
                          {/* Edit Button */}
                          <Dialog
                            open={editingPlayer?.id === player.id}
                            onOpenChange={(open) =>
                              !open && setEditingPlayer(null)
                            }
                          >
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditPlayer(player)}
                                className="w-8 h-8 p-0 bg-white/20 backdrop-blur-md hover:bg-white/30"
                              >
                                <Edit3 className="w-4 h-4 text-white" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-black/90 border-white/20 text-white max-w-md">
                              <DialogHeader>
                                <DialogTitle className="text-white">
                                  Edit Player Details
                                </DialogTitle>
                              </DialogHeader>
                              <PlayerForm isEdit={true} />
                            </DialogContent>
                          </Dialog>

                          {/* Delete Button */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="w-8 h-8 p-0 bg-red-500/20 backdrop-blur-md hover:bg-red-500/40"
                              >
                                <Trash2 className="w-4 h-4 text-white" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-black/90 border-white/20">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">
                                  Delete Player
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-white/70">
                                  Are you sure you want to delete{" "}
                                  <span className="font-semibold text-white">
                                    {player.firstName} {player.lastName}
                                  </span>
                                  ? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeletePlayer(player.id)}
                                  className="bg-red-500 hover:bg-red-600 text-white"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}

                      {/* Default State - Name and Position (Always Visible) */}
                      <div className="absolute bottom-6 left-6 right-6 text-white transition-all duration-300">
                        <div className="mb-2">
                          <div className="text-lg font-light text-white/90">
                            {player.firstName}
                          </div>
                          <div className="text-2xl font-black uppercase tracking-wide leading-tight">
                            {player.lastName}
                          </div>
                        </div>
                        <div className="text-sm text-white/80 mb-4">
                          {player.positionDisplay}
                        </div>
                      </div>

                      {/* Hover State - Stats Display */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="px-6 pb-6 pt-16">
                          {/* Stats Grid */}
                          <div className="grid grid-cols-3 gap-4 text-center text-white">
                            <div>
                              <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                                Sunday Appearances
                              </div>
                              <div className="text-2xl font-bold">
                                {player.appearances}
                              </div>
                              <div className="text-xs text-white/50">
                                2024 Season
                              </div>
                              <div className="text-xs text-orange-400 font-semibold">
                                0
                              </div>
                            </div>

                            {player.position === "GOALKEEPERS" ? (
                              <>
                                <div>
                                  <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                                    Sunday Clean Sheets
                                  </div>
                                  <div className="text-2xl font-bold">
                                    {player.cleanSheets || 0}
                                  </div>
                                  <div className="text-xs text-white/50">
                                    2024 Season
                                  </div>
                                  <div className="text-xs text-orange-400 font-semibold">
                                    0
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                                    Sunday Saves
                                  </div>
                                  <div className="text-2xl font-bold">
                                    {player.saves || 0}
                                  </div>
                                  <div className="text-xs text-white/50">
                                    2024 Season
                                  </div>
                                  <div className="text-xs text-orange-400 font-semibold">
                                    0
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                                    Sunday Goals
                                  </div>
                                  <div className="text-2xl font-bold">
                                    {player.goals}
                                  </div>
                                  <div className="text-xs text-white/50">
                                    2024 Season
                                  </div>
                                  <div className="text-xs text-orange-400 font-semibold">
                                    0
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                                    Sunday Vibes
                                  </div>
                                  <div className="text-2xl font-bold">100</div>
                                  <div className="text-xs text-white/50">
                                    2024 Season
                                  </div>
                                  <div className="text-xs text-orange-400 font-semibold">
                                    0
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Read More Section (Below Card) */}
                    <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <Badge className={getTeamColor(player.team)}>
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
                                Read More{" "}
                                <ChevronDown className="w-4 h-4 ml-1" />
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

                {filteredPlayers.length === 0 && !loading && (
                  <div className="text-center py-20 col-span-full">
                    <Users className="w-16 h-16 text-white/50 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No players found
                    </h3>
                    <p className="text-white/70">
                      Try selecting a different position or team.
                    </p>
                  </div>
                )}
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
              Made with <span className="text-red-400 animate-pulse">❤️</span>{" "}
              for the Sunday football community
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
