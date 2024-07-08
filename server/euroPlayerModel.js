const mongoose = require("mongoose");

const euroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A player must have a name"],
    unique: true,
    trim: true,
  },
  team: {
    type: String,
    required: [true, "A player must have a team"],
    trim: true,
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

const Euro = mongoose.model("euro", euroSchema);

module.exports = Euro;
