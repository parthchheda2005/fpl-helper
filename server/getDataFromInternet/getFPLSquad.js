const puppeteer = require("puppeteer");

exports.getFPLSquad = async (req, res) => {
  try {
    const teamId = req.params.id;
    const gameweek = req.params.gw;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://fantasy.premierleague.com/entry/${teamId}/event/${gameweek}`
    );

    await page.waitForSelector(
      ".Pitch__ElementRow-sc-1mctasb-1.Pitch__PitchRow-sc-1mctasb-2.iAuEaL.gPAVqU" // PITCH ELEMENT
    );

    const divs = await page.$$(
      ".Pitch__ElementRow-sc-1mctasb-1.Pitch__PitchRow-sc-1mctasb-2.iAuEaL.gPAVqU"
    );

    let squad = [];

    let index = 0;
    for (const div of divs) {
      const innerElements = await div.$$(
        ".PitchElementData__ElementName-sc-1u4y6pr-1.etyMDj"
      );
      for (const innerElement of innerElements) {
        const name = await page.evaluate((el) => el.textContent, innerElement);
        squad.push({
          position:
            index === 0
              ? "GKP"
              : index === 1
              ? "DEF"
              : index === 2
              ? "MID"
              : "FWD",
          name,
        });
      }
      index++;
    }

    await page.waitForSelector(".Pitch__ElementRow-sc-1mctasb-1.iAuEaL");

    const benchDivs = await page.$$(
      ".BenchUnit__StyledBenchUnit-sc-1ua794p-0.ePeQtg"
    );

    for (const div of benchDivs) {
      const positions = await div.$("h3");
      const names = await div.$$(
        ".PitchElementData__ElementName-sc-1u4y6pr-1.etyMDj" // VERY SPECIFIC ITS THE DIV WITH THE PLAYERS NAME IN IT
      );
      for (const nameDiv of names) {
        let position = await page.evaluate((el) => el.textContent, positions);
        if (position.includes(". ")) {
          position = position.split(". ").at(1);
        }
        const name = await page.evaluate((el) => el.textContent, nameDiv);
        squad.push({
          position,
          name,
        });
      }
    }

    await page.close();
    await browser.close();
    res.status(200).json({
      status: "success",
      squad,
    });
  } catch (e) {
    res.status(404).json({
      status: "failure",
    });
  }
};
