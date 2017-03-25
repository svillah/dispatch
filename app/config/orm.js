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

	},
	EmployeeReports: function(callback){
		var selectReport = 'SELECT * FROM Reports;';

		connection.query(selectReport,function(err, result){

			callback(err, result);

		});
	},
	InsertReport: function(body, callback){

		var SoftID = 'SELECT SoftwareID FROM Software WHERE SoftwareTitle = ?';
		connection.query(SoftID,[body.software],function(err, result){
			var insertReport = 'INSERT INTO Reports VALUES(null,?,?,?,?,"","unopened","low",current_timestamp, null);';
			console.log(result);
			connection.query(insertReport,[body.employeeID,result[0].SoftwareID,body.issueOverview,body.submissionNotes],function(err,result){
				console.log(err);
				callback(err,result);
			});

		});
		

		//connection.query(insertReport, [empID], [SoftwareID], function(err, result){

			//callback(err, result);

		//});
	},


};

module.exports = orm;
