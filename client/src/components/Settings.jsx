function Settings({ enabledStatistics, setEnabledStatistics }) {
  function handleChange(e) {
    const { value, checked } = e.target;
    if (!checked) {
      setEnabledStatistics((curr) => curr.filter((el) => el !== value));
    }
    if (checked) {
      setEnabledStatistics((curr) => [...curr, value]);
    }
  }

  return (
    <div className="h-full md:h-screen w-full pt-24 pb-10 bg-neutral-800 text-stone-100 flex justify-center items-center flex-col">
      <h1 className="text-2xl font-bold">Enable/Disable Statistics: </h1>
      <div className="m-5 overflow-scroll">
        <h2 className="text-xl">General Statistics:</h2>
        <ul className="list-none text-lg">
          <li>
            <input
              type="checkbox"
              value="comparisonHighlight"
              checked={enabledStatistics.includes("comparisonHighlight")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Enable Comparison Highlight</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="team"
              checked={enabledStatistics.includes("team")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Team</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="matchesPlayed"
              checked={enabledStatistics.includes("matchesPlayed")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Matches Played</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="matchesStarted"
              checked={enabledStatistics.includes("matchesStarted")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Matches Started</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="minPlayed"
              checked={enabledStatistics.includes("minPlayed")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Minutes Played</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="goals"
              checked={enabledStatistics.includes("goals")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Goals</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="assists"
              checked={enabledStatistics.includes("assists")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Assists</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="ga"
              checked={enabledStatistics.includes("ga")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Goals + Assists</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="penalties"
              checked={enabledStatistics.includes("penalties")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Penalties</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="gaPer90"
              checked={enabledStatistics.includes("gaPer90")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Goals + Assists Per 90</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="xGPer90"
              checked={enabledStatistics.includes("xGPer90")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">xG Per 90</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="xGAPer90"
              checked={enabledStatistics.includes("xGAPer90")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">xG + xA Per 90</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="npXGAPer90"
              checked={enabledStatistics.includes("npXGAPer90")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Non-Penalty xG + xA Per 90</span>
          </li>
        </ul>
        <h2 className="text-xl pt-4">FPL-Specific Statistics:</h2>
        <ul className="list-none text-lg">
          <li>
            <input
              type="checkbox"
              value="season"
              checked={enabledStatistics.includes("season")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Season</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="position"
              checked={enabledStatistics.includes("position")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Position</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="ownership"
              checked={enabledStatistics.includes("ownership")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Ownership</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="price"
              checked={enabledStatistics.includes("price")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Price</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="form"
              checked={enabledStatistics.includes("form")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Form</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="totalPoints"
              checked={enabledStatistics.includes("totalPoints")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Total Points</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="fixtureDifficultyRanking"
              checked={enabledStatistics.includes("fixtureDifficultyRanking")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Fixture Difficulty Ranking</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="goalsAllowed"
              checked={enabledStatistics.includes("goalsAllowed")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Goals Allowed</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="goalsAllowedPer90"
              checked={enabledStatistics.includes("goalsAllowedPer90")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">Goals Allowed Per 90</span>
          </li>
          <li>
            <input
              type="checkbox"
              value="xGAllowedPer90"
              checked={enabledStatistics.includes("xGAllowedPer90")}
              onChange={(e) => handleChange(e)}
            />
            <span className="mx-3">xG Allowed Per 90</span>
          </li>
        </ul>
      </div>
      <div className="m-5"></div>
    </div>
  );
}

export default Settings;
