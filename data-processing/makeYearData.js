var DestinationsJson = require("./destinations.json");

const yearData = {
  SOS: [],
  President: [],
};

DestinationsJson.features.forEach((d) => {
  const { new_region, position, year } = d.properties;
  const region = new_region;
  const key = region.toLowerCase().replace(/[^a-zA-Z]/g, "");
  let idx = yearData[position].findIndex((_d) => _d.key === key);
  if (idx === -1) {
    const initialValuesArray = [];
    for (let y = 1905; y <= 2022; y++) {
      initialValuesArray.push({
        region,
        year: y,
        visits: 0,
      });
    }
    yearData[position].push({
      key,
      values: initialValuesArray,
    });
    idx = yearData[position].length - 1;
  }
  const valuesIdx = yearData[position][idx].values.findIndex(
    (__d) => __d.year === year
  );
  if (valuesIdx !== -1) {
    yearData[position][idx].values[valuesIdx].visits += 1;
  }
});

console.log(JSON.stringify(yearData.President));
