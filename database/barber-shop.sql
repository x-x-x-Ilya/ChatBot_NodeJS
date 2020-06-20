DROP DATABASE barbershop;
CREATE DATABASE barbershop
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
DROP TABLE barbers CASCADE;
DROP TABLE appointments CASCADE;
DROP TABLE clients CASCADE;
DROP TABLE services CASCADE;
CREATE TABLE barbers (
	id         serial       NOT NULL PRIMARY KEY, -- serial == AUTO_INCREMENT,
	email      VARCHAR(255) NOT NULL UNIQUE,
	first_name VARCHAR(255) NOT NULL,
	deleted    BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE appointments (
    id 	 serial  PRIMARY KEY,
    client_id INT NOT NULL,
	date  DATE NOT NULL,
	_begin TIME NOT NULL,
	_end TIME NOT NULL,
    deleted    BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE services (
    id 	 serial  PRIMARY KEY,
	name VARCHAR(255)  NOT NULL,
	time TIME NOT NULL,
    deleted  BOOLEAN  NOT NULL DEFAULT FALSE
);

CREATE TABLE clients (
	id         INT          NOT NULL PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NULL UNIQUE,
    deleted    BOOLEAN      NOT NULL DEFAULT FALSE
);

ALTER TABLE appointments ADD CONSTRAINT client_id_idx FOREIGN KEY (client_id) REFERENCES clients(id);
ALTER TABLE appointments ADD CONSTRAINT barbers_id_idx FOREIGN KEY (id) REFERENCES barbers(id);
ALTER TABLE appointments ADD CONSTRAINT services_id_idx FOREIGN KEY (id) REFERENCES services(id);