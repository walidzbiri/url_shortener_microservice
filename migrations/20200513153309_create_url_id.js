
exports.up = function(knex) {
  return knex.schema.createTable('urls',(table)=>{
    table.increments();
    table.string('url').unique();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('urls')
};
