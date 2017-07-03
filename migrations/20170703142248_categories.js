
exports.up = function (knex, Promise) {
  return knex.schema.createTable('categories', t => {
    t.increments('id').primary()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('categores')
}
