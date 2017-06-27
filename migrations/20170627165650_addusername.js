
exports.up = function(knex, Promise) {
  return knex.schema.table('users', t => {
    t.string('user_name')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('users', t => {
    t.dropColumn('user_name')
  })
}
