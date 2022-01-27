const visits = require("./BidenTrips.json");

const inserts = visits.map((d) => {
  const [pres_id, city_id, date,  remarks] = d;
  return `insert into president_sos_travel_data (pres_id, city_id, date, remarks, date_convert) values (${pres_id}, ${city_id}, '${date}', '${remarks.replace(
    /'/g,
    "''"
  )}', '${date}');`;
});

inserts.forEach((d) => {
  console.log(d);
});
