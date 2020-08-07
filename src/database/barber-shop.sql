-- Database creating
/*
DROP TABLE barbers CASCADE;
DROP TABLE appointments CASCADE;
DROP TABLE clients CASCADE;
DROP TABLE services CASCADE;
*/
CREATE TABLE barbers (
	id         SERIAL       NOT NULL PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name  VARCHAR(255) NOT NULL,
	deleted    BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE services (
    id 	     SERIAL       NOT NULL PRIMARY KEY,
	name     VARCHAR(255) NOT NULL,
	time     TIME         NOT NULL,
	price    INT          NOT NULL,
    deleted  BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE clients (
	id         SERIAL       NOT NULL PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name  VARCHAR(255) NULL,
    email      VARCHAR(255) NULL UNIQUE,
    deleted    BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE appointments (
    id 	       SERIAL    NOT NULL PRIMARY KEY,
	date       TIMESTAMP NOT NULL,
	client_id  INT       NOT NULL REFERENCES "clients"  ("id") ON DELETE CASCADE ON UPDATE CASCADE,
	barber_id  INT       NOT NULL REFERENCES "barbers"  ("id") ON DELETE CASCADE ON UPDATE CASCADE,
	service_id INT       NOT NULL REFERENCES "services" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    deleted    BOOLEAN   NOT NULL DEFAULT FALSE
);


insert into barbers(1, 'Leha', 'Moroz', false);
insert into barbers(2, 'Anton', 'Trubeckoy', false);
insert into barbers(3, 'Miha', 'Korin', false);
insert into barbers(4, 'Ilya', 'Bobr', false);

insert into services(1, 'haircut', 1:00, 15, false);
insert into services(2, 'shaving', 1:00, 10, false);


-- View creating

CREATE OR REPLACE VIEW current_day AS
   SELECT
	appointments.date,
	clients.first_name,
	services.name,
	services.price
	FROM appointments
	JOIN clients ON appointments.client_id = clients.id
	JOIN services ON appointments.service_id = services.id
    WHERE
	date >= CURRENT_DATE AND date <= CURRENT_DATE+1 AND appointments.deleted = false;


-- Procedure creating

CREATE OR REPLACE PROCEDURE statistics_month()
AS $BODY$
DECLARE
    r appointments%rowtype;
    haircuts int := 0;
    shavings int := 0;

BEGIN
	FOR r IN SELECT *
	FROM appointments
	WHERE date >= current_date-30 AND date <= current_date+1 AND deleted = false
    LOOP
	IF r.service_id = 1 THEN
	haircuts:= haircuts+1;
	END IF;
	IF r.service_id = 2 THEN
	shavings:= shavings+1;
	END IF;
    END LOOP;
	RAISE NOTICE 'haircuts : %', haircuts;
   	RAISE NOTICE 'shavings : %', shavings;
END;
$BODY$ LANGUAGE plpgsql;

-- Function creating (на некоторых интернет ресурсах говорится, что это и есть хранимая процедура)

DROP FUNCTION statistics_last_month();
CREATE OR REPLACE FUNCTION statistics_last_month()
RETURNS text
AS $BODY$
DECLARE
    r appointments%rowtype;
    haircuts int := 0;
    shavings int := 0;

BEGIN
	FOR r IN SELECT *
	FROM appointments
	WHERE date >= current_date-30 AND date <= current_date+1 AND deleted = false
    LOOP
	IF r.service_id = 1 THEN
	haircuts:= haircuts+1;
	END IF;
	IF r.service_id = 2 THEN
	shavings:= shavings+1;
	END IF;
	RAISE NOTICE 'haircuts : %', haircuts;
   	RAISE NOTICE 'shavings : %', shavings;
    END LOOP;
   	return 'haircuts: ' || haircuts || '    shavings: ' || shavings || '    all: ' || (haircuts+shavings);
END;
$BODY$ LANGUAGE plpgsql;

