--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_user_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_user_role AS ENUM (
    'admin',
    'restricted'
);


ALTER TYPE public.enum_user_role OWNER TO postgres;

--
-- Name: statistics_last_month(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.statistics_last_month() RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
    r appointments%rowtype;
    haircuts int := 0;	-- количество стрижек за последний месяц
    shavings int := 0;	-- количество услуг "бритьё" за последний месяц

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
   	return 'haircuts: ' || haircuts || '	shavings: ' || shavings || '	all: ' || (haircuts+shavings);

END;
$$;


ALTER FUNCTION public.statistics_last_month() OWNER TO postgres;

--
-- Name: statistics_month(); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.statistics_month()
    LANGUAGE plpgsql
    AS $$
DECLARE
    r appointments%rowtype;
    haircuts int := 0;	-- количество стрижек за последний месяц
    shavings int := 0;	-- количество услуг "бритьё" за последний месяц

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
	--RAISE NOTICE 'haircuts : %', haircuts;
   	--RAISE NOTICE 'shavings : %', shavings;
    END LOOP;
   	--return 'haircuts: ' || haircuts || '	shavings: ' || shavings || '	all: ' || (haircuts+shavings);
	RAISE NOTICE 'haircuts : %', haircuts;
   	RAISE NOTICE 'shavings : %', shavings;
END;
$$;


ALTER PROCEDURE public.statistics_month() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointments (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    client_id integer NOT NULL,
    barber_id integer NOT NULL,
    service_id integer NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.appointments OWNER TO postgres;

--
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.appointments_id_seq OWNER TO postgres;

--
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;


--
-- Name: barbers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.barbers (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.barbers OWNER TO postgres;

--
-- Name: barbers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.barbers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.barbers_id_seq OWNER TO postgres;

--
-- Name: barbers_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.barbers_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.barbers_id_seq1 OWNER TO postgres;

--
-- Name: barbers_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.barbers_id_seq1 OWNED BY public.barbers.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255),
    email character varying(255),
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clients_id_seq OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "time" time without time zone NOT NULL,
    price integer NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.services OWNER TO postgres;

--
-- Name: current_day; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.current_day AS
 SELECT appointments.date,
    clients.first_name,
    services.name,
    services.price
   FROM ((public.appointments
     JOIN public.clients ON ((appointments.client_id = clients.id)))
     JOIN public.services ON ((appointments.service_id = services.id)))
  WHERE ((appointments.date >= CURRENT_DATE) AND (appointments.date <= (CURRENT_DATE + 1)) AND (appointments.deleted = false));


ALTER TABLE public.current_day OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.services_id_seq OWNER TO postgres;

--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- Name: appointments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);


--
-- Name: barbers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.barbers ALTER COLUMN id SET DEFAULT nextval('public.barbers_id_seq1'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
\.


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointments (id, date, client_id, barber_id, service_id, deleted) FROM stdin;
5	2022-09-09 16:00:00	585892056	4	4	f
4	2023-05-05 10:00:00	585892056	2	1	t
156	2021-02-09 13:00:00	585892056	2	1	f
222	2021-02-09 15:00:00	585892056	2	1	f
354	2021-02-09 17:00:00	585892056	2	1	f
199	2021-02-09 19:00:00	585892056	2	1	f
400	2021-02-09 10:00:00	585892056	2	1	f
111	2020-06-30 13:00:00	585892056	2	1	f
620	2020-06-30 16:00:00	585892056	2	1	f
777	2020-06-30 18:00:00	585892056	2	1	f
778	2020-06-30 12:00:00	585892056	2	1	f
888	2021-06-30 17:00:00	585892056	1	1	f
889	2020-06-30 17:00:00	585892056	1	1	f
6	2020-07-05 07:00:00	585892056	1	1	f
\.


--
-- Data for Name: barbers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.barbers (id, first_name, last_name, deleted) FROM stdin;
1	leha	leing	f
2	shrek	ferzim	f
3	yagor	jojons	f
4	kirya	gretty	f
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (id, first_name, last_name, email, deleted) FROM stdin;
1	kolyan	svatov	\N	f
2	ivan	vishenkin	\N	f
3	oleg	serim	\N	f
4	sergo	yardovoy	\N	f
585892056	Ilya	Morozov	coolmail@mail.com	f
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (id, name, "time", price, deleted) FROM stdin;
1	strizhka	01:00:00	10	f
2	britio	01:00:00	10	f
3	pokraska	01:00:00	20	f
4	model strizhka	01:00:00	15	f
\.


--
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointments_id_seq', 6, true);


--
-- Name: barbers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.barbers_id_seq', 1, false);


--
-- Name: barbers_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.barbers_id_seq1', 1, false);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_id_seq', 1, false);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.services_id_seq', 1, false);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- Name: barbers barbers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.barbers
    ADD CONSTRAINT barbers_pkey PRIMARY KEY (id);


--
-- Name: clients clients_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key UNIQUE (email);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: appointments appointments_barber_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_barber_id_fkey FOREIGN KEY (barber_id) REFERENCES public.barbers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: appointments appointments_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: appointments appointments_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

