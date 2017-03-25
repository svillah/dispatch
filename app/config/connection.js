// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

var mysql = require('mysql');

// Edit this connection to make it work with JawsDB.
var source = {

    localhost: {
        port: 3306,
        host: '127.0.0.1',
        user: 'root',
        password: "",
        database: "jawsDB"
    },
    jawsDB: {
        port: 3306,
        host: 'am1shyeyqbxzy8gc.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'q2yv3e6veqrugo2e',
        password: "vn8fjkcr64r6ybi2",
        database: "",   //must fill in once MySQL is set up
    }
}

console.log(process.env.JAWSDB_MARIA_URL);
var connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
