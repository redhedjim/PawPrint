
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('users', function(table) {
          table.increments('id').primary();
          table.string('email').unique();
          table.string('first');
          table.string('last'); 
          table.string('password');
          table.boolean('admin');
          table.boolean('archived');
          table.timestamps();
      }),
      knex.schema.createTable('contacts', function(table) {
          table.increments('id').primary();
          table.string('prefix');
          table.string('first');
          table.string('last'); 
          table.string('email');
          table.string('job_title');
          table.string('phone1');
          table.string('phone2');
          table.boolean('archived');
          table.timestamps();
      }),
      knex.schema.createTable('clinic_types', function(table){
          table.increments('id').primary();
          table.string('type');
          table.boolean('archived');
          table.timestamps();
      }),
      knex.schema.createTable('clinics', function(table){
          table.increments('id').primary();
          table.string('name');
          table.string('clinic_code');
          table.string('pms');
          table.integer('accounting_number');
          table.date('conversion_date');
          table.integer('type').unsigned().references('id').inTable('clinic_types');
          table.integer('regional_director').unsigned().references('id').inTable('contacts');
          table.integer('medical_director').unsigned().references('id').inTable('contacts');
          table.integer('clinic_manager').unsigned().references('id').inTable('contacts');
          table.string('phone1');
          table.string('phone2');
          table.string('address');
          table.string('city');
          table.string('province');
          table.string('country');
          table.string('postal');
          table.string('email1');
          table.string('email2');
          table.boolean('archived');
          table.timestamps();
      })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([  
    knex.schema.dropTable('clinics'),
    knex.schema.dropTable('clinic_types'),
    knex.schema.dropTable('contacts'),
    knex.schema.dropTable('users')
  ])
};
