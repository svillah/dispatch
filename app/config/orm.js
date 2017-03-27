// *********************************************************************************
// orm.js - This file offers a set of easier-to-use methods for interacting with the MySQL db.
// *********************************************************************************

// Dependencies
var connection = require('./connection.js');
var orm = {

	// ORM creates a simple method for performing a query of the entire table.
	// callback ensures that data is returned only once the query is done.
	EmployeeReports: function(callback){
		var selectReport = 'SELECT * FROM Reports LEFT JOIN Software ON Reports.SoftwareID = Software.SoftwareID;';
		connection.query(selectReport,function(err, result){
			callback(err, result);
		});
	},
	InsertReport: function(body, callback){
		var SoftID = 'SELECT SoftwareID FROM Software WHERE SoftwareTitle = ?';
		connection.query(SoftID,[body.software],function(err, result){
			var insertReport = 'INSERT INTO Reports VALUES(null,?,?,?,?,"","Unopened","Low",current_timestamp, null);';
			console.log(result);
			connection.query(insertReport,[body.employeeID,result[0].SoftwareID,body.issueOverview,body.submissionNotes],function(err,result){
				console.log(err);
				callback(err,result);
			});
		});
	},
	UpdateReport: function(body, callback){
			console.log("sup");
			var UpdateReport = 'UPDATE Reports SET ResponderNotes = ?, ReportStatus = ?, Priority = ?, DateOpened = current_timestamp WHERE ReportID = ?;';
			console.log(body);
			connection.query(UpdateReport,[body.responderNotes,body.status,body.priority,body.reportID],function(err,result){
				console.log(err);
				callback(err,result);
			});
	},
};

module.exports = orm;
