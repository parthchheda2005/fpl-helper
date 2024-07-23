const Pl = require("../models/plPlayerModel");
const {
  mergeFBREFandFPLData,
} = require("../getDataFromInternet/getFPLStatistics2425");

exports.refreshPLData = async (req, res) => {
  try {
    const data = await mergeFBREFandFPLData();
    await Pl.deleteMany({ season: "24-25" });
    await Promise.all(
      data.map((player) => {
        Pl.create(player);
      })
    );
    res.status(201).json({
      status: "success",
      data,
    });
  } catch (e) {
    res.status(400).json({
      status: "failure",
      errMessage: e.message,
    });
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
    res.status(400).json({
      status: "failure",
      errMessage: e,
    });
  }
};
