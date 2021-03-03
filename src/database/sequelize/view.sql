
-- View creating

CREATE OR REPLACE VIEW current_day AS
   SELECT
	a.date,
	c.first_name,
	s.name,
	s.price
	FROM appointments a
	JOIN clients c  ON a.client_id = c.id
	JOIN services s ON a.service_id = s.id
    WHERE
	date >= CURRENT_DATE AND date <= CURRENT_DATE+1 AND a.deleted = false;


-- Procedure creating

CREATE OR REPLACE PROCEDURE statistics_month()
AS $BODY$
DECLARE
    r appointments%rowtype;
    haircuts int := 0;
    shavings int := 0;

BEGIN
	FOR r IN SELECT appointments.service_id
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
	FOR r IN SELECT a.service_id
	FROM a
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

