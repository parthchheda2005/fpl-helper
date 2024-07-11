const Pl = require("../models/plPlayerModel");
const {
  mergeFBREFandFPLData,
} = require("../getDataFromInternet/getFPLStatistics2324");

exports.refreshPLData = async (req, res) => {
  try {
    const data = await mergeFBREFandFPLData();
    await Pl.deleteMany({ goals: { $gte: 0 } });
    await Promise.all(data.map((player) => Pl.create(player)));
    res.status(201).json({
      status: "success",
      data,
    });
  } catch (e) {
    console.error(e);
  }
};

exports.getPLData = async (req, res) => {
  try {
    const data = await Pl.find()
      .sort({ season: -1 })
      .sort({ team: 1 })
      .sort({ name: 1 });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (e) {
    console.error(e);
  }
};
