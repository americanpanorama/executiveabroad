const SOSData = require('./blinken.json');

const parseDateStr = (dateStr) => {
  const months = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };
  const year = dateStr.trim().slice(-4);
  let dateStr2 = dateStr
    .trim()
    .slice(0, -6)
    .replace(/\s+\–/g, "-")
    .replace(/\–\s+/g, "-")
    .replace("–", "-")
    .replace(/\s\s+/g, " ");
  let formatedStr = "";
  if (!dateStr2.includes("-")) {
    const [monthName, date] = dateStr2.split(" ");
    formatedStr = `${year}-${months[monthName]}-${
      parseInt(date) < 10 ? 0 : ""
    }${date},`;
  } else {
    if (dateStr2.match(/\d\-\d/)) {
      const [monthName, dates] = dateStr2.split(" ");
      const [startDate, endDate] = dates.split("-");
      formatedStr = `${year}-${months[monthName]}-${
        parseInt(startDate) < 10 ? 0 : ""
      }${startDate},${year}-${months[monthName]}-${
        parseInt(endDate) < 10 ? 0 : ""
      }${endDate}`;
    } else {
      const [startDate, endDate] = dateStr2.split("-");
      const [startMonth, startDay] = startDate.split(" ");
      const [endMonth, endDay] = endDate.split(" ");
      formatedStr = `${year}-${months[startMonth]}-${
        parseInt(startDay) < 10 ? 0 : ""
      }${startDay},${year}-${months[endMonth]}-${
        parseInt(endDay) < 10 ? 0 : ""
      }${endDay}`;
    }
  }
  return formatedStr;
};
const inserts = SOSData.map((d) => {
  const [pres_id, city_id, remarks, dateStr] = d;
  const date = parseDateStr(dateStr);
  return `insert into president_sos_travel_data (pres_id, city_id, date, remarks, date_convert) values (${pres_id}, ${city_id}, '${date}', '${remarks.replace(
    /'/g,
    "\\'"
  )}', '${date}');`;
});

inserts.forEach((d) => {
  console.log(d);
});
