
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('listings').del()
    .then(function () {
      // Inserts seed entries
      return knex('listings').insert([
        {id: 1, user_id: 1, category_id: 1, title: 'Power Drill', description: 'A good condition powerful drill', price: 10, per_hour: false, per_day: true, unavailible_dates: {"dates": ['12/07/2017', '14/07/2017']}, image_urls: {"urls": ['http://toolguyd.com/blog/wp-content/uploads/2013/03/Bosch-Corded-Hammer-Drill.jpg']}, deposit: 40, location: 'auckland', includes: {"items": ['drill bits', 'extension cord']}},
        {id: 2, user_id: 1, category_id: 1, title: 'Grinder', description: 'A good condition grinder', price: 8, per_hour: false, per_day: true, unavailible_dates: {"dates": ['10/07/2017', '11/07/2017']}, image_urls: {"urls": ['https://www.boschtools.com/us/en/ocsmedia/optimized/full/Angle_Grinder_1375A.png']}, deposit: 30, location: 'auckland', includes: {"items": ['discs', 'extension cord']}}
      ])
    })
}
