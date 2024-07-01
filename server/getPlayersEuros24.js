const fs = require("fs");
const puppeteer = require("puppeteer");

const url = "https://fbref.com/en/comps/676/stats/European-Championship-Stats"; // turns out u can use any fbref standard site urls here

const getData = async () => {
  const browser = await puppeteer.launch(); // start puppeteer browser
  const page = await browser.newPage(); // start puppeteer page
  await page.goto(url); // go to the page
  await page.waitForSelector("#all_stats_standard"); // wait for the head div to load
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
          let id = -1;
          rows = rows.map((row) => {
            id = id + 1;
            const cells = Array.from(row.querySelectorAll("td")).map(
              (cell) => cell.innerText
            ); // get the inner stats from each row
            return {
              id,
              name: cells.at(0),
              team: cells.at(2).split(" ").at(1),
              matchesPlayed: cells.at(5),
              matchesStarted: cells.at(6),
              minPlayed: cells.at(7),
              goals: cells.at(9),
              assists: cells.at(10),
              ga: cells.at(11),
              penalties: cells.at(13),
              gaPer90: cells.at(26),
              xGPer90: cells.at(29),
              xGAPer90: cells.at(31),
              npXGAPer90: cells.at(33),
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
  browser.close();
  return playerData;
};

// async function printData() {
//   const data = await getData();
//   console.log(data.map((el) => el.name));
// }

// printData();

exports.getPlayersEuros24 = (req, res) => {
  getData().then((data) =>
    res.status(200).json({
      status: "successful",
      requestedAt: req.requestTime,
      results: data.length,
      data: {
        players: data,
      },
    })
  );
};
