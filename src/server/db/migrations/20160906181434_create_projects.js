exports.up = function(knex, Promise) {
  return knex.schema.createTable('proposals', function (table) {
    table.increments();
    table.string('project_name');
    table.string('student_name');
    table.integer('class_period');
    table.string('testable_question');
    table.boolean('safe');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('proposals');
};
