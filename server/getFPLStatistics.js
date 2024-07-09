const puppeteer = require("puppeteer");

const getData = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false }); // set headless to false for debugging
    const page = await browser.newPage();
    await page.goto("https://fantasy.premierleague.com/statistics", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const cookies = await page.$("#onetrust-accept-btn-handler");
    if (cookies) {
      await cookies.click();
    }

    await page.waitForSelector(".Layout__Main-eg6k6r-1.wXYnc", {
      timeout: 60000,
    });

    let tableData = [];
    let hasNextPage = true;
    let pageNo = 0;

    while (hasNextPage) {
      pageNo++;
      await page.waitForSelector(
        ".Table-ziussd-1.ElementTable-sc-1v08od9-0.dUELIG.OZmJL",
        { timeout: 60000 }
      );

      const pageData = await page.evaluate(() => {
        const table = document.querySelector(
          ".Table-ziussd-1.ElementTable-sc-1v08od9-0.dUELIG.OZmJL"
        );
        const rows = Array.from(table.querySelectorAll("tr"));
        return rows.map((row) => {
          const cells = Array.from(row.querySelectorAll("td"));
          const dataArray = cells.map((cell) => cell.innerText);
          return {
            nameTeamPosition: dataArray.at(1),
            price: dataArray.at(2),
            ownership: dataArray.at(3),
            totalPoints: dataArray.at(5),
          };
        });
      });

      tableData = tableData.concat(pageData);
      await page.screenshot({ path: `screenshot${pageNo}.png` });

      const nextButton = await page.$$(
        ".PaginatorButton__Button-xqlaki-0.cDdTXr"
      );
      if (nextButton) {
        if (nextButton.length === 1 && pageNo > 5) {
          hasNextPage = false;
        } else {
          hasNextPage = true;
          await nextButton.at(nextButton.length === 1 ? 0 : 1).click();
          await page.waitForSelector(
            ".Table-ziussd-1.ElementTable-sc-1v08od9-0.dUELIG.OZmJL",
            { timeout: 60000 }
          );
        }
      } else {
        hasNextPage = false;
      }
    }
    await page.close();
    await browser.close();
    return tableData.filter((el) => Object.keys(el).length > 0);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const logData = async () => {
  let tableData = await getData();
  tableData = tableData.map((el) => {
    console.log(el.nameTeamPosition);
    let parts = el.nameTeamPosition.split("\n");
    const name = parts.at(0);
    console.log(2);

    const team = parts.at(1).substring(0, 3);
    console.log(3);

    const position = parts.at(1).substring(3, 6);
    console.log(4);

    const newOwnership = el.ownership.split("%").at(0);
    console.log(5);
    return {
      name,
      team,
      position,
      ownership: newOwnership,
      price: el.price,
      totalPoints: el.totalPoints,
    };
  });
  console.log(tableData);
};

logData();
