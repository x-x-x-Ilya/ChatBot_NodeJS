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
	first_name VARCHAR(255) NOT NULL,
	last_name  VARCHAR(255) NOT NULL,
	deleted    BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE appointments (
    id 	 serial  PRIMARY KEY,
	date  TIMESTAMPTZ NOT NULL,
	client_id INT NOT NULL,
	barber_id INT NOT NULL,
	service_id INT NOT NULL,
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
	last_name VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NULL UNIQUE,
    deleted    BOOLEAN      NOT NULL DEFAULT FALSE
);

ALTER TABLE appointments ADD CONSTRAINT client_id_idx FOREIGN KEY (client_id) REFERENCES clients(id);
ALTER TABLE appointments ADD CONSTRAINT barbers_id_idx FOREIGN KEY (barber_id) REFERENCES barbers(id);
ALTER TABLE appointments ADD CONSTRAINT services_id_idx FOREIGN KEY (service_id) REFERENCES services(id);