const Euro = require("../models/euroPlayerModel");
const { getEuroData } = require("../getDataFromInternet/getPlayersEuros24");

exports.refreshEuroData = async (req, res) => {
  try {
    const data = await getEuroData();
    await Euro.deleteMany({ goals: { $gte: 0 } });
    await Promise.all(data.map((player) => Euro.create(player)));
    res.status(201).json({
      status: "success",
      data,
    });
  } catch (e) {
    console.error(e);
  }
};

exports.getEuroData = async (req, res) => {
  try {
    const data = await Euro.find().sort({ team: 1 }).sort({ name: 1 });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (e) {
    console.error(e);
  }
};

exports.keepDBActive = async (req, res) => {
  try {
    const data = await Euro.find().sort({ team: 1 }).sort({ name: 1 }).limit(5);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (e) {
    console.error(e);
  }
};
