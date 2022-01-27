SELECT
  pt.pres_id,
  pt.cartodb_id,
  pt.city_id,
  substring(
    pt.date
    from
      1 for 4
  ) :: int as year,
  pt.date_convert,
  ct.city,
  ct.the_geom,
  ct.country,
  ct.the_geom_webmercator,
  pst.pres_sos,
  pst.position,
  r.new_region,
  remarks,
  num,
  st_distance_Sphere (
    st_point(-77.1546508, 38.899265),
    st_point(ct.long, ct.lat)
  ) as distance
FROM
  president_sos_travel_data pt
  Join city_table ct ON pt.city_id = ct.city_id
  and substring(
    pt.date_convert
    from
      1 for 4
  ) <= '2020'
  Join presidents_sos_table pst ON pt.pres_id = pst.pres_id
  join world_regions r on st_contains(r.the_geom, ct.the_geom)
Order By
  date desc