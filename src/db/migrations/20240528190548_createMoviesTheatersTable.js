exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    // Foreign key referencing movies table 
    table
      .integer("movie_id")
      .notNullable() // Ensures movie_id has a value for every row
      .unsigned(); // Ensures movie_id is a non-negative number
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("CASCADE"); // Cascade delete on movie removal from movies table

    // Foreign key referencing theaters table 
    table
      .integer("theater_id")
      .notNullable() // Ensures theater_id has a value for every row
      .unsigned(); // Ensures theater_id is a non-negative number
    table
      .foreign("theater_id")
      .references("theater_id")
      .inTable("theaters")
      .onDelete("CASCADE"); // Cascade delete on theater removal from theaters table

    
    table.boolean("is_showing").notNullable(); 
    // Creates timestamp columns for created and updated at timestamps
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};