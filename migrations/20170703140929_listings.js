exports.up = function (knex, Promise) {
  return knex.schema.createTable('listings', t => {
    t.increments('id').primary()
    t.integer('user_id').unsigned()
    t.foreign('user_id').references('users.id')
    t.integer('category_id').unsigned()
    t.foreign('category_id').references('categories.id')
    t.string('title')
    t.string('description')
    t.integer('price')
    t.boolean('per_hour')
    t.boolean('per_day')
    t.json('unavailible_dates')
    t.json('image_urls')
    t.integer('deposit')
    t.string('location')
    t.json('includes')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('listings')
}
