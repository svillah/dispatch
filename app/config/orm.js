// *********************************************************************************
// orm.js - This file offers a set of easier-to-use methods for interacting with the MySQL db.
// *********************************************************************************

// Dependencies
var connection = require('./connection.js');

// SAMPLE ORM - MUST UPDATE

var tableName = "allcharacters"; //update this

var orm = {

	// ORM creates a simple method for performing a query of the entire table.
	// callback ensures that data is returned only once the query is done.
	allCharacters: function(callback){
		var s = 'SELECT * FROM ' + tableName;

		connection.query(s, function(err, result) {

            callback(result);

        });
	},

	// ORM creates a simple method for performing a query of a single character in the table.
	// callback grabs a specific character from the database.

	searchCharacter: function(name, callback){
		var s = 'select * from ' + tableName + ' where routeName=?';

		connection.query(s,[name], function(err, result) {

            callback(result);
        });

	},

	// ORM creates a simple method for adding characters to the database
	// ORM's simple addCharacter method translates into a more complex SQL INSERT statement.

	addCharacter: function(character, callback){

		// Creating a routeName so its easy to search.
		var routeName = character.name.replace(/\s+/g, '').toLowerCase();
		console.log(routeName);

		var s = "INSERT INTO " + tableName + " (routeName, name, role, age, forcePoints) VALUES (?,?,?,?,?)";

		connection.query(s,[routeName, character.name, character.role, character.age, character.forcePoints], function(err, result) {

            callback(result);

        });

	}


};

module.exports = orm;
