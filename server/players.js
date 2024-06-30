const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const puppeteer = require("puppeteer");

exports.getPlayers = (req, res) => {};

const url = "https://fbref.com/en/comps/676/stats/European-Championship-Stats";

let eurosPlayers = [];

const getData = async () => {
  const browser = await puppeteer.launch(); // start puppeteer browser
  const page = await browser.newPage(); // start puppeteer page
  await page.goto(url); // go to the page
  await page.waitForSelector("#all_stats_standard"); // wait for the head div to load
  const headDiv = await page.$eval("#all_stats_standard", (element) => {
    // select head div with a callback function to return something
    const innerDiv = element.querySelector("#div_stats_standard"); // select innerdiv
    if (innerDiv) {
      // select table
      const table = innerDiv.querySelector("table");
      if (table) {
        const tbody = table.querySelector("tbody"); // select tbody in the table
        if (tbody) {
          const rows = Array.from(tbody.querySelectorAll("tr")); // select tr in the tbody
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
  return headDiv.length;
};

async function printData() {
  const data = await getData();
  console.log(data);
  // eurosPlayers = eurosPlayers.map((curr) =>
  //   curr.split(" ").reverse().join(" ")
  // );
  // eurosPlayers.map((curr) => console.log(curr));
}

printData();

// const getHTML = async () => {
//   // get all the html from the website
//   const { data } = await axios.get(url);
//   return data;
// };

// const getData = async () => {
//   const data = await getHTML();
//   const $ = cheerio.load(data);
//   const allStatsStandardDiv = $("#div_stats_standard");
//   console.log(allStatsStandardDiv.length);
//   //   $(tbody)
//   //     .find("tr") // get data by each 'tr' element
//   //     .each((i, tr) => {
//   //       if ($(tr).attr("class") !== "thread") {
//   //         $(tr)
//   //           .find("td")
//   //           .each((i, td) => {
//   //             // get data by each th element
//   //             console.log($(td).attr("data-stat"));
//   //             if ($(td).attr("data-stat") === "player") {
//   //               const name = $(td).attr("csk"); // get the name which is attached to the csk attribute
//   //               eurosPlayers.push(name);
//   //             }
//   //           });
//   //       }
//   //     });
// };
