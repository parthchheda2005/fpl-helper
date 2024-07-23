const puppeteer = require("puppeteer");
require("dotenv").config();

const teamAcronymNameReference = {
  CHE: "Chelsea",
  ARS: "Arsenal",
  LIV: "Liverpool",
  EVE: "Everton",
  MCI: "Manchester City",
  TOT: "Tottenham",
  AVL: "Aston Villa",
  BOU: "Bournemouth",
  BRE: "Brentford",
  BHA: "Brighton",
  LEI: "Leicester City",
  CRY: "Crystal Palace",
  FUL: "Fulham",
  IPS: "Ipswich Town",
  MUN: "Manchester Utd",
  NEW: "Newcastle Utd",
  NFO: "Nott'ham Forest",
  SOU: "Southampton",
  WHU: "West Ham",
  WOL: "Wolves",
};

function removeSpecialCharacters(str) {
  let normalizedStr = str.normalize("NFD");
  let cleanedStr = normalizedStr.replace(/[\u0300-\u036f]/g, "");
  cleanedStr = cleanedStr.replace(/[ð]/g, "d");
  return cleanedStr;
}

const getDataFromFPLStatistics = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        // "--single-process",
        // "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto("https://fantasy.premierleague.com/statistics", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const cookies = await page.$("#onetrust-accept-btn-handler");
    if (cookies) {
      await cookies.click();
    }

    await page.waitForSelector(".Layout__Main-sc-eg6k6r-1.eRnmvx", {
      timeout: 60000,
    });

    let tableData = [];
    let hasNextPage = true;
    let pageNo = 0;

    while (hasNextPage) {
      pageNo++;
      await page.waitForSelector(
        ".Table-sc-ziussd-1.ElementTable-sc-1v08od9-0.iPaulP.OZmJL",
        { timeout: 60000 }
      );

      const pageData = await page.evaluate(() => {
        const table = document.querySelector(
          ".Table-sc-ziussd-1.ElementTable-sc-1v08od9-0.iPaulP.OZmJL"
        );
        const rows = Array.from(table.querySelectorAll("tr"));
        return rows.map((row) => {
          const cells = Array.from(row.querySelectorAll("td"));
          const dataArray = cells.map((cell) => cell.innerText);
          return {
            nameTeamPosition: dataArray.at(1),
            price: dataArray.at(2),
            ownership: dataArray.at(3),
            form: dataArray.at(4),
            totalPoints: dataArray.at(5),
          };
        });
      });

      tableData = tableData.concat(pageData);

      await page.waitForSelector(
        ".PaginatorButton__Button-sc-xqlaki-0.cmSnxm",
        {
          timeout: 60000,
        }
      );

      const nextButton = await page.$$(
        ".PaginatorButton__Button-sc-xqlaki-0.cmSnxm"
      );
      if (nextButton && nextButton.length > 0) {
        if (nextButton.length === 1 && pageNo > 5) {
          hasNextPage = false;
        } else {
          hasNextPage = true;
          await nextButton.at(nextButton.length === 1 ? 0 : 1).click();
          await page.waitForSelector(
            ".Table-sc-ziussd-1.ElementTable-sc-1v08od9-0.iPaulP.OZmJL",
            { timeout: 60000 }
          );
        }
      } else {
        hasNextPage = false;
      }
    }
    await page.close();
    await browser.close();
    tableData = tableData.filter((el) => Object.keys(el).length > 0);
    tableData = tableData.map((el) => {
      let parts = el.nameTeamPosition.split("\n");
      const name = parts.at(0);
      const team = parts.at(1).substring(0, 3);
      const position = parts.at(1).substring(3, 6);
      const newOwnership = el.ownership.split("%").at(0);
      return {
        name,
        team,
        position,
        ownership: newOwnership * 1,
        price: el.price * 1,
        form: el.form * 1,
        totalPoints: el.totalPoints * 1,
      };
    });
    tableData = Array.from(new Set(tableData.map(JSON.stringify))).map(
      JSON.parse
    );
    tableData = tableData.map((el) => {
      return { ...el, name: removeSpecialCharacters(el.name) };
    });
    return tableData;
  } catch (error) {
    console.error("An error occurred in getDataFromFPLStatistics:", error);
    if (browser) await browser.close();
  }
};

const getDataFromFBREF = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ["--disable-setuid-sandbox", "--no-sandbox"],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto("https://fbref.com/en/comps/9/stats/Premier-League-Stats", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    await page.waitForSelector("#all_stats_standard", { timeout: 30000 });

    let playerData = await page.$eval("#all_stats_standard", (element) => {
      const innerDiv = element.querySelector("#div_stats_standard");
      if (innerDiv) {
        const table = innerDiv.querySelector("table");
        if (table) {
          const tbody = table.querySelector("tbody");
          if (tbody) {
            let rows = Array.from(tbody.querySelectorAll("tr"));
            rows = rows.filter((row) => !row.classList.contains("thead"));
            rows = rows.map((row) => {
              const cells = Array.from(row.querySelectorAll("td")).map(
                (cell) => cell.innerText
              );
              return {
                name: cells.at(0),
                team: cells.at(3),
                matchesPlayed: cells.at(6) * 1,
                matchesStarted: cells.at(7) * 1,
                minPlayed: cells.at(8).replace(/,/g, "") * 1,
                goals: cells.at(10) * 1,
                assists: cells.at(11) * 1,
                ga: cells.at(12) * 1,
                penalties: cells.at(14) * 1,
                gaPer90: cells.at(27) * 1,
                xGPer90: cells.at(30) * 1,
                xGAPer90: cells.at(32) * 1,
                npXGAPer90: cells.at(34) * 1,
              };
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
    playerData = playerData.map((el) => {
      return { ...el, name: removeSpecialCharacters(el.name) };
    });
    return playerData;
  } catch (error) {
    console.error("An error occurred in getDataFromFBREF:", error);
    if (browser) await browser.close();
  }
};

const getTeamDefensiveStats = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ["--disable-setuid-sandbox", "--no-sandbox"],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto("https://fbref.com/en/comps/9/stats/Premier-League-Stats", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await page.waitForSelector(".filter.switcher");

    const selector = 'a[data-show=".assoc_stats_squads_standard_against"]';
    const element = await page.$(selector);
    if (element) {
      await element.click();
    } else {
      console.log("Element not found");
      await browser.close();
      return;
    }

    await page.waitForSelector("#div_stats_squads_standard_against");

    const div = await page.$("#div_stats_squads_standard_against");
    let array = [];
    if (div) {
      const table = await div.$("table");
      if (table) {
        const tbody = await table.$("tbody");
        if (tbody) {
          const rows = await tbody.$$("tr");
          for (const row of rows) {
            const cells = await row.$$("th, td");
            const rowArray = [];
            for (const cell of cells) {
              const cellText = await page.evaluate(
                (cell) => cell.innerText,
                cell
              );
              rowArray.push(cellText);
            }
            array.push({
              team: rowArray.at(0).split("vs ").at(1),
              goalsAllowed: rowArray.at(8) * 1,
              goalsAllowedPer90: rowArray.at(22) * 1,
              xGAllowedPer90: rowArray.at(27) * 1,
            });
          }
        } else {
          console.log("tbody not found");
        }
      } else {
        console.log("table not found");
      }
    } else {
      console.log("div not found");
    }
    await page.close();
    await browser.close();
    return array;
  } catch (error) {
    console.error("An error occurred in getTeamDefensiveStats:", error);
    if (browser) await browser.close();
  }
};

exports.mergeFBREFandFPLData = async () => {
  try {
    const dataFPL = await getDataFromFPLStatistics();
    const dataFBREF = await getDataFromFBREF();
    const dataDefensive = await getTeamDefensiveStats();

    let mergedData = [];
    for (let i = 0; i < dataFPL.length; i++) {
      let playerFPL = { ...dataFPL.at(i) };
      let playerTeam = teamAcronymNameReference[playerFPL.team];
      let playerName = playerFPL.name;
      if (playerName.includes("-")) {
        playerName = playerName.split("-").at(1);
      } else if (playerName === "Rodrigo") {
        playerName = "Rodri";
      } else if (playerName === "D.D.Fofana") {
        playerName = "Fofana";
      } else if (playerName === "Y. Chermiti") {
        playerName = "Chermiti";
      } else if (!playerName.includes(" ") && !playerName.includes(".")) {
        playerName = playerName;
      } else {
        if (playerName.includes(" ")) {
          playerName = playerName.split(" ").at(0);
        }
        if (playerName.includes(".")) {
          playerName = playerName.split(".").at(1);
        }
      }
      let playerFBREF = dataFBREF.find(
        (el) => el.name.includes(playerName) && el.team === playerTeam
      );

      let playerDefensive = dataDefensive.find((el) => el.team === playerTeam);

      mergedData.push({
        name: playerFPL.name,
        season: "24-25",
        team: playerTeam,
        position: playerFPL.position,
        ownership: playerFPL.ownership,
        price: playerFPL.price,
        form: playerFPL.form,
        totalPoints: playerFPL.totalPoints,
        matchesPlayed: playerFBREF?.matchesPlayed || 0,
        matchesStarted: playerFBREF?.matchesStarted || 0,
        minPlayed: playerFBREF?.minPlayed || 0,
        goals: playerFBREF?.goals || 0,
        assists: playerFBREF?.assists || 0,
        ga: playerFBREF?.ga || 0,
        penalties: playerFBREF?.penalties || 0,
        gaPer90: playerFBREF?.gaPer90 || 0,
        xGPer90: playerFBREF?.xGPer90 || 0,
        xGAPer90: playerFBREF?.xGAPer90 || 0,
        npXGAPer90: playerFBREF?.npXGAPer90 || 0,
        goalsAllowed: playerDefensive?.goalsAllowed || 0,
        goalsAllowedPer90: playerDefensive?.goalsAllowedPer90 || 0,
        xGAllowedPer90: playerDefensive?.xGAllowedPer90 || 0,
      });
    }
    return mergedData;
  } catch (error) {
    console.error("An error occurred in mergeFBREFandFPLData:", error);
  }
};
