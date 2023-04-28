exports.up = knex => knex.schema.createTable("foods", table => {
    table.increments("id");
    table.text("category").notNullable();
    table.text("picture");
    table.text("name").notNullable();
    table.decimal("price", 10,2).notNullable();
    table.text("description").notNullable();
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
  
  exports.down = knex => knex.schema.dropTable("foods");