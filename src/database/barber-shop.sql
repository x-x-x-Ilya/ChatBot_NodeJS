DROP TABLE IF EXISTS barbers      CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS clients      CASCADE;
DROP TABLE IF EXISTS services     CASCADE;

CREATE TABLE barbers (
	id         SERIAL       NOT NULL PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name  VARCHAR(255) NOT NULL,
	deleted    BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE services (
    id 	     SERIAL       NOT NULL PRIMARY KEY,
	name     VARCHAR(255) NOT NULL,
	duration TIME         NOT NULL DEFAULT '1:00',
	price    INT          NOT NULL DEFAULT 1,
    deleted  BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE clients (
	id         SERIAL       NOT NULL PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name  VARCHAR(255) NULL,
    email      VARCHAR(255) NULL     UNIQUE,
    deleted    BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE appointments (
    id 	       SERIAL    NOT NULL PRIMARY KEY,
	appointment_date       TIMESTAMP NOT NULL,
	client_id  INT       NOT NULL,
	barber_id  INT       NOT NULL,
	service_id INT       NOT NULL,
    deleted    BOOLEAN   NOT NULL DEFAULT FALSE
);

ALTER TABLE appointments ADD CONSTRAINT appointments_clients
FOREIGN KEY (client_id) REFERENCES clients(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE appointments ADD CONSTRAINT appointments_barbers
FOREIGN KEY (barber_id) REFERENCES barbers(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE appointments ADD CONSTRAINT appointments_services
FOREIGN KEY (service_id) REFERENCES services(id)
ON DELETE CASCADE ON UPDATE CASCADE;


insert into barbers
(id, first_name, last_name, deleted)
VALUES
(1, 'Leha', 'Moroz', false),
(2, 'Anton', 'Trubeckoy', false),
(3, 'Miha', 'Korin', false),
(4, 'Ilya', 'Bobr', false);

insert into services
(id, name, duration, price, deleted)
VALUES
(1, 'haircut', '1:00', 15, false),
(2, 'shaving', '1:00', 10, false);
