DROP TABLE barbers CASCADE;
DROP TABLE appointments CASCADE;
DROP TABLE clients CASCADE;
DROP TABLE services CASCADE;

CREATE TABLE barbers (
	id         serial       NOT NULL PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name  VARCHAR(255) NOT NULL,
	deleted    BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE services (
    id 	 serial  PRIMARY KEY,
	name VARCHAR(255)  NOT NULL,
	time TIME NOT NULL,
	price INT NOT NULL,
    deleted  BOOLEAN  NOT NULL DEFAULT FALSE
);

CREATE TABLE clients (
	id         INT          NOT NULL PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255)  NULL,
    email      VARCHAR(255) NULL UNIQUE,
    deleted    BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE appointments (
    id 	 serial  PRIMARY KEY,
	date  TIMESTAMP NOT NULL,
	client_id INT NOT NULL  REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
	barber_id INT NOT NULL REFERENCES "barbers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
	service_id INT NOT NULL REFERENCES "services" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    deleted    BOOLEAN      NOT NULL DEFAULT FALSE
);