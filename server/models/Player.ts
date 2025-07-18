import mongoose, { Schema, Document } from "mongoose";

export interface IPlayer extends Document {
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
  team: "Tharki Tigers" | "Nange Shikari" | "None";
  jerseyNumber?: string;
  photo: string;
  bio: string;
  appearances: number;
  goals: number;
  saves?: number;
  cleanSheets?: number;
  funFact: string;
  quote: string;
  createdAt: Date;
  updatedAt: Date;
}

const PlayerSchema: Schema<IPlayer> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    nickname: {
      type: String,
      trim: true,
      default: "",
    },
    position: {
      type: String,
      required: true,
      enum: [
        "GOALKEEPERS",
        "DEFENDERS",
        "MIDFIELDERS",
        "FORWARDS",
        "COACHING STAFF",
      ],
    },
    positionDisplay: {
      type: String,
      required: true,
      trim: true,
    },
    team: {
      type: String,
      required: true,
      enum: ["Tharki Tigers", "Nange Shikari", "None"],
      default: "None",
    },
    jerseyNumber: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      required: true,
      default:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    },
    bio: {
      type: String,
      default: "",
    },
    appearances: {
      type: Number,
      default: 0,
      min: 0,
    },
    goals: {
      type: Number,
      default: 0,
      min: 0,
    },
    saves: {
      type: Number,
      default: 0,
      min: 0,
    },
    cleanSheets: {
      type: Number,
      default: 0,
      min: 0,
    },
    funFact: {
      type: String,
      default: "",
    },
    quote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt automatically
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Add indexes for better query performance
PlayerSchema.index({ team: 1 });
PlayerSchema.index({ position: 1 });
PlayerSchema.index({ firstName: 1, lastName: 1 });

export const Player = mongoose.model<IPlayer>("Player", PlayerSchema);
