const mongoose = require("mongoose");

const plSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A player must have a name"],
    trim: true,
  },
  season: {
    type: String,
    required: [true, "A player must have a season"],
    trim: true,
  },
  team: {
    type: String,
    required: [true, "A player must have a team"],
    trim: true,
  },
  position: {
    type: String,
    required: [true, "A player must have a position"],
    trim: true,
    enum: {
      values: ["GKP", "DEF", "MID", "FWD"],
      message: "Position can only be GKP, DEF, MID or FWD",
    },
  },
  ownership: {
    type: Number,
    required: [true, "A player must have a value for ownership"],
    min: [0, "Ownership is at least 0"],
    max: [100, "Ownership is at most 100"],
  },
  price: {
    type: Number,
    required: [true, "A player must have a value for price"],
  },
  totalPoints: {
    type: Number,
    required: [true, "A player must have a value for their total points"],
  },
  matchesPlayed: {
    type: Number,
    required: [true, "A player must have a value for matches played"],
  },
  matchesStarted: {
    type: Number,
    required: [true, "A player must have a value for matches started"],
  },
  minPlayed: {
    type: Number,
    required: [true, "A player must have a value for minutes played"],
  },
  goals: {
    type: Number,
    required: [true, "A player must have a value for goals"],
  },
  assists: {
    type: Number,
    required: [true, "A player must have a value for assists"],
  },
  ga: {
    type: Number,
    required: [true, "A player must have a combined goals and assists value"],
  },
  penalties: {
    type: Number,
    required: [true, "A player must have a value for penalties"],
  },
  gaPer90: {
    type: Number,
    required: [
      true,
      "A player must have an expected value of goals and assists per 90",
    ],
  },
  xGPer90: {
    type: Number,
    required: [true, "A player must have a value of goals per 90"],
  },
  xGAPer90: {
    type: Number,
    required: [
      true,
      "A player must have an expected value of goals and assists per 90",
    ],
  },
  npXGAPer90: {
    type: Number,
    required: [
      true,
      "A player must have a non-penalty expected value of goals and assists per 90",
    ],
  },
});

const Pl = mongoose.model("pl", plSchema);

module.exports = Pl;
