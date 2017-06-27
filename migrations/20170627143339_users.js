
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', t => {
    t.increments('id')
    t.boolean('buyer')
    t.boolean('seller')
    t.boolean('admin')
    t.string('auth_id')
    t.string('first_name')
    t.string('last_name')
    t.string('email')
    t.string('phone_mobile')
    t.string('address_number')
    t.string('address_street')
    t.string('address_line2')
    t.string('address_city')
    t.string('address_country')
    t.string('address_postcode')
    t.string('date_of_birth')
    t.string('profile_image_url')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
