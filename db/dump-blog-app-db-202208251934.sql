--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

-- Started on 2022-08-25 19:34:06 CST

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
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 2984 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 16463)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    name character varying(250) NOT NULL,
    email character varying(250) NOT NULL,
    body text NOT NULL,
    post_id integer NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16461)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO postgres;

--
-- TOC entry 2985 (class 0 OID 0)
-- Dependencies: 204
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 203 (class 1259 OID 16428)
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    title character varying(50),
    content text,
    description text
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16426)
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_post_id_seq OWNER TO postgres;

--
-- TOC entry 2986 (class 0 OID 0)
-- Dependencies: 202
-- Name: posts_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_post_id_seq OWNED BY public.posts.id;


--
-- TOC entry 2841 (class 2604 OID 16466)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 2840 (class 2604 OID 16431)
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_post_id_seq'::regclass);


--
-- TOC entry 2978 (class 0 OID 16463)
-- Dependencies: 205
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, name, email, body, post_id) FROM stdin;
2	Oscar Cornejo	oscar.cornejo@telus.com	This is a Test 2	2
1	Javier Cornejo	javier.cornejo@telus.com	Test	2
\.


--
-- TOC entry 2976 (class 0 OID 16428)
-- Dependencies: 203
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, title, content, description) FROM stdin;
2	Post 2	Content 2	Test
3	My New Post	This is my new Post	Post Description
6	My New Post 5	This is my new Post	Post Description
7	My New Post X	This is my new Post	Post Description
8	My New Post 6	This is my new Post	Post Description
9	My New Post 7	This is my new Post	Post Description
1	My New Post Updated from Node	This is my new Post	Post Description
4	My New Post 4	This is my new Post	Post Description
10	My New Post 10	This is my new Post	Post Description
5	My New Post 13	This is my new Post	Post Description
\.


--
-- TOC entry 2987 (class 0 OID 0)
-- Dependencies: 204
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 6, true);


--
-- TOC entry 2988 (class 0 OID 0)
-- Dependencies: 202
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 16, true);


--
-- TOC entry 2847 (class 2606 OID 16471)
-- Name: comments pk_comments; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT pk_comments PRIMARY KEY (id);


--
-- TOC entry 2843 (class 2606 OID 16436)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- TOC entry 2845 (class 2606 OID 16439)
-- Name: posts ukmchce1gm7f6otpphxd6ixsdps; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT ukmchce1gm7f6otpphxd6ixsdps UNIQUE (title);


--
-- TOC entry 2848 (class 2606 OID 16472)
-- Name: comments fk1_comments_post; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk1_comments_post FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2022-08-25 19:34:06 CST

--
-- PostgreSQL database dump complete
--

