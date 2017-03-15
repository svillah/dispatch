USE xqkqyenonuq7erdq;  /* enter database - update when MySQL is set up */

CREATE TABLE allCharacters (
	id Int( 11 ) AUTO_INCREMENT NOT NULL,
	routeName VARCHAR( 255) NOT NULL,
	name VARCHAR( 255 ) NOT NULL,
	role VARCHAR( 255 ) NOT NULL,
	age Int(11) NOT NULL,
	points Int(11) NOT NULL,

	PRIMARY KEY ( id ) );
