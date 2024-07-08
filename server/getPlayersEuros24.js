const fs = require("fs");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const Euro = require("./euroPlayerModel");

const url = "https://fbref.com/en/comps/676/stats/UEFA-Euro-Stats"; // turns out u can use any fbref standard site urls here

const getData = async () => {
  const browser = await puppeteer.launch(); // start puppeteer browser
  const page = await browser.newPage(); // start puppeteer page
  await page.goto(url, { waitUntil: "networkidle2" }); // go to the page
  await page.screenshot({ path: `${__dirname}/screenshot.png` });
  await page.waitForSelector("#all_stats_standard", { timeout: 30000 }); // wait for the head div to load
  const playerData = await page.$eval("#all_stats_standard", (element) => {
    // select head div with a callback function to return something
    const innerDiv = element.querySelector("#div_stats_standard"); // select innerdiv
    if (innerDiv) {
      // select table
      const table = innerDiv.querySelector("table");
      if (table) {
        const tbody = table.querySelector("tbody"); // select tbody in the table
        if (tbody) {
          let rows = Array.from(tbody.querySelectorAll("tr")); // select tr in the tbody
          rows = rows.filter((row) => !row.classList.contains("thead")); // remove all rows with names of the data
          rows = rows.map((row) => {
            const cells = Array.from(row.querySelectorAll("td")).map(
              (cell) => cell.innerText
            ); // get the inner stats from each row
            return {
              name: cells.at(0),
              team: cells.at(2).split(" ").at(1),
              matchesPlayed: cells.at(5) * 1,
              matchesStarted: cells.at(6) * 1,
              minPlayed: cells.at(7) * 1,
              goals: cells.at(9) * 1,
              assists: cells.at(10) * 1,
              ga: cells.at(11) * 1,
              penalties: cells.at(13) * 1,
              gaPer90: cells.at(26) * 1,
              xGPer90: cells.at(29) * 1,
              xGAPer90: cells.at(31) * 1,
              npXGAPer90: cells.at(33) * 1,
            }; // make the object
          });
          return rows;
        } else {
          return "No tbody found";
        }
      } else {
        return "No table found";
      }
    } else {
      return "No inner div found";
    }
  });
  await page.close();
  await browser.close();
  return playerData;
};

exports.refreshEuroData = async (req, res) => {
  try {
    const data = await getData();
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
    const data = await Euro.find();
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (e) {
    console.error(e);
  }
};
