--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.18
-- Dumped by pg_dump version 9.6.18

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

ALTER TABLE IF EXISTS ONLY public."Users" DROP CONSTRAINT IF EXISTS "Users_organizationId_fkey";
ALTER TABLE IF EXISTS ONLY public."UserRoles" DROP CONSTRAINT IF EXISTS "UserRoles_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."UserRoles" DROP CONSTRAINT IF EXISTS "UserRoles_roleId_fkey";
ALTER TABLE IF EXISTS ONLY public."StudentCourses" DROP CONSTRAINT IF EXISTS "StudentCourses_studentId_fkey";
ALTER TABLE IF EXISTS ONLY public."StudentCourses" DROP CONSTRAINT IF EXISTS "StudentCourses_courseId_fkey";
ALTER TABLE IF EXISTS ONLY public."Roles" DROP CONSTRAINT IF EXISTS "Roles_organizationId_fkey";
ALTER TABLE IF EXISTS ONLY public."Questions" DROP CONSTRAINT IF EXISTS "Questions_quizId_fkey";
ALTER TABLE IF EXISTS ONLY public."PasswordResets" DROP CONSTRAINT IF EXISTS "PasswordResets_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Modules" DROP CONSTRAINT IF EXISTS "Modules_courseId_fkey";
ALTER TABLE IF EXISTS ONLY public."ModuleItems" DROP CONSTRAINT IF EXISTS "ModuleItems_moduleId_fkey";
ALTER TABLE IF EXISTS ONLY public."ModuleItems" DROP CONSTRAINT IF EXISTS "ModuleItems_createdBy_fkey";
ALTER TABLE IF EXISTS ONLY public."Meetings" DROP CONSTRAINT IF EXISTS "Meetings_meetingRoomId_fkey";
ALTER TABLE IF EXISTS ONLY public."Meetings" DROP CONSTRAINT IF EXISTS "Meetings_hostId_fkey";
ALTER TABLE IF EXISTS ONLY public."MeetingRooms" DROP CONSTRAINT IF EXISTS "MeetingRooms_organizationId_fkey";
ALTER TABLE IF EXISTS ONLY public."MeetingRoomMembers" DROP CONSTRAINT IF EXISTS "MeetingRoomMembers_participantId_fkey";
ALTER TABLE IF EXISTS ONLY public."MeetingRoomMembers" DROP CONSTRAINT IF EXISTS "MeetingRoomMembers_meetingRoomId_fkey";
ALTER TABLE IF EXISTS ONLY public."Groups" DROP CONSTRAINT IF EXISTS "Groups_organizationId_fkey";
ALTER TABLE IF EXISTS ONLY public."Groups" DROP CONSTRAINT IF EXISTS "Groups_createdBy_fkey";
ALTER TABLE IF EXISTS ONLY public."GroupMembers" DROP CONSTRAINT IF EXISTS "GroupMembers_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."GroupMembers" DROP CONSTRAINT IF EXISTS "GroupMembers_groupId_fkey";
ALTER TABLE IF EXISTS ONLY public."GroupMembers" DROP CONSTRAINT IF EXISTS "GroupMembers_addedBy_fkey";
ALTER TABLE IF EXISTS ONLY public."Files" DROP CONSTRAINT IF EXISTS "Files_ownerId_fkey";
ALTER TABLE IF EXISTS ONLY public."Files" DROP CONSTRAINT IF EXISTS "Files_organizationId_fkey";
ALTER TABLE IF EXISTS ONLY public."Courses" DROP CONSTRAINT IF EXISTS "Courses_organizationId_fkey";
ALTER TABLE IF EXISTS ONLY public."Courses" DROP CONSTRAINT IF EXISTS "Courses_meetingRoomId_fkey";
ALTER TABLE IF EXISTS ONLY public."Courses" DROP CONSTRAINT IF EXISTS "Courses_createdBy_fkey";
ALTER TABLE IF EXISTS ONLY public."CourseManagers" DROP CONSTRAINT IF EXISTS "CourseManagers_managerId_fkey";
ALTER TABLE IF EXISTS ONLY public."CourseManagers" DROP CONSTRAINT IF EXISTS "CourseManagers_enrolledById_fkey";
ALTER TABLE IF EXISTS ONLY public."CourseManagers" DROP CONSTRAINT IF EXISTS "CourseManagers_courseId_fkey";
ALTER TABLE IF EXISTS ONLY public."Classrooms" DROP CONSTRAINT IF EXISTS "Classrooms_schoolId_fkey";
ALTER TABLE IF EXISTS ONLY public."Classrooms" DROP CONSTRAINT IF EXISTS "Classrooms_meetingRoomId_fkey";
ALTER TABLE IF EXISTS ONLY public."AssignmentSubmissions" DROP CONSTRAINT IF EXISTS "AssignmentSubmissions_studentId_fkey";
ALTER TABLE IF EXISTS ONLY public."AssignmentSubmissions" DROP CONSTRAINT IF EXISTS "AssignmentSubmissions_reviewerId_fkey";
ALTER TABLE IF EXISTS ONLY public."AssignmentSubmissions" DROP CONSTRAINT IF EXISTS "AssignmentSubmissions_assignmentId_fkey";
ALTER TABLE IF EXISTS ONLY public."Answers" DROP CONSTRAINT IF EXISTS "Answers_questionId_fkey";
ALTER TABLE IF EXISTS ONLY public."Users" DROP CONSTRAINT IF EXISTS "Users_pkey";
ALTER TABLE IF EXISTS ONLY public."UserRoles" DROP CONSTRAINT IF EXISTS "UserRoles_pkey";
ALTER TABLE IF EXISTS ONLY public."StudentCourses" DROP CONSTRAINT IF EXISTS "StudentCourses_pkey";
ALTER TABLE IF EXISTS ONLY public."SequelizeMeta" DROP CONSTRAINT IF EXISTS "SequelizeMeta_pkey";
ALTER TABLE IF EXISTS ONLY public."SequelizeData" DROP CONSTRAINT IF EXISTS "SequelizeData_pkey";
ALTER TABLE IF EXISTS ONLY public."Schools" DROP CONSTRAINT IF EXISTS "Schools_pkey";
ALTER TABLE IF EXISTS ONLY public."Roles" DROP CONSTRAINT IF EXISTS "Roles_pkey";
ALTER TABLE IF EXISTS ONLY public."Questions" DROP CONSTRAINT IF EXISTS "Questions_pkey";
ALTER TABLE IF EXISTS ONLY public."PasswordResets" DROP CONSTRAINT IF EXISTS "PasswordResets_pkey";
ALTER TABLE IF EXISTS ONLY public."Organizations" DROP CONSTRAINT IF EXISTS "Organizations_pkey";
ALTER TABLE IF EXISTS ONLY public."Organizations" DROP CONSTRAINT IF EXISTS "Organizations_name_key";
ALTER TABLE IF EXISTS ONLY public."Modules" DROP CONSTRAINT IF EXISTS "Modules_pkey";
ALTER TABLE IF EXISTS ONLY public."ModuleItems" DROP CONSTRAINT IF EXISTS "ModuleItems_pkey";
ALTER TABLE IF EXISTS ONLY public."Meetings" DROP CONSTRAINT IF EXISTS "Meetings_pkey";
ALTER TABLE IF EXISTS ONLY public."MeetingRooms" DROP CONSTRAINT IF EXISTS "MeetingRooms_pkey";
ALTER TABLE IF EXISTS ONLY public."MeetingRoomMembers" DROP CONSTRAINT IF EXISTS "MeetingRoomMembers_pkey";
ALTER TABLE IF EXISTS ONLY public."Groups" DROP CONSTRAINT IF EXISTS "Groups_pkey";
ALTER TABLE IF EXISTS ONLY public."GroupMembers" DROP CONSTRAINT IF EXISTS "GroupMembers_pkey";
ALTER TABLE IF EXISTS ONLY public."Files" DROP CONSTRAINT IF EXISTS "Files_pkey";
ALTER TABLE IF EXISTS ONLY public."Courses" DROP CONSTRAINT IF EXISTS "Courses_pkey";
ALTER TABLE IF EXISTS ONLY public."CourseManagers" DROP CONSTRAINT IF EXISTS "CourseManagers_pkey";
ALTER TABLE IF EXISTS ONLY public."Classrooms" DROP CONSTRAINT IF EXISTS "Classrooms_pkey";
ALTER TABLE IF EXISTS ONLY public."AssignmentSubmissions" DROP CONSTRAINT IF EXISTS "AssignmentSubmissions_pkey";
ALTER TABLE IF EXISTS ONLY public."Answers" DROP CONSTRAINT IF EXISTS "Answers_pkey";
DROP TABLE IF EXISTS public."Users";
DROP TABLE IF EXISTS public."UserRoles";
DROP TABLE IF EXISTS public."StudentCourses";
DROP TABLE IF EXISTS public."SequelizeMeta";
DROP TABLE IF EXISTS public."SequelizeData";
DROP TABLE IF EXISTS public."Schools";
DROP TABLE IF EXISTS public."Roles";
DROP TABLE IF EXISTS public."Questions";
DROP TABLE IF EXISTS public."PasswordResets";
DROP TABLE IF EXISTS public."Organizations";
DROP TABLE IF EXISTS public."Modules";
DROP TABLE IF EXISTS public."ModuleItems";
DROP TABLE IF EXISTS public."Meetings";
DROP TABLE IF EXISTS public."MeetingRooms";
DROP TABLE IF EXISTS public."MeetingRoomMembers";
DROP TABLE IF EXISTS public."Groups";
DROP TABLE IF EXISTS public."GroupMembers";
DROP TABLE IF EXISTS public."Files";
DROP TABLE IF EXISTS public."Courses";
DROP TABLE IF EXISTS public."CourseManagers";
DROP TABLE IF EXISTS public."Classrooms";
DROP TABLE IF EXISTS public."AssignmentSubmissions";
DROP TABLE IF EXISTS public."Answers";
DROP TYPE IF EXISTS public."enum_Users_gender";
DROP TYPE IF EXISTS public."enum_MeetingRoomMembers_role";
DROP TYPE IF EXISTS public."enum_GroupMembers_role";
DROP TYPE IF EXISTS public."enum_Courses_status";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: enum_Courses_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Courses_status" AS ENUM (
    'REVIEW',
    'PUBLISHED',
    'FINISHED'
);


ALTER TYPE public."enum_Courses_status" OWNER TO postgres;

--
-- Name: enum_GroupMembers_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_GroupMembers_role" AS ENUM (
    'ADMINISTRATOR',
    'PARTICIPANT'
);


ALTER TYPE public."enum_GroupMembers_role" OWNER TO postgres;

--
-- Name: enum_MeetingRoomMembers_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_MeetingRoomMembers_role" AS ENUM (
    'SUBSCRIBER',
    'PUBLISHER',
    'MODERATOR'
);


ALTER TYPE public."enum_MeetingRoomMembers_role" OWNER TO postgres;

--
-- Name: enum_Users_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Users_gender" AS ENUM (
    'Male',
    'Female',
    'Rather not say'
);


ALTER TYPE public."enum_Users_gender" OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Answers" (
    id character varying(255) NOT NULL,
    answer json,
    description json,
    correct boolean DEFAULT false,
    "questionId" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Answers" OWNER TO postgres;

--
-- Name: AssignmentSubmissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AssignmentSubmissions" (
    id character varying(255) NOT NULL,
    "studentId" character varying(255) NOT NULL,
    "assignmentId" character varying(255) NOT NULL,
    "reviewerId" character varying(255),
    "submissionType" character varying(255) NOT NULL,
    submission text,
    "reviewedOn" timestamp with time zone,
    points integer,
    resubmission boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."AssignmentSubmissions" OWNER TO postgres;

--
-- Name: Classrooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Classrooms" (
    id character varying(255) NOT NULL,
    name character varying(255),
    "schoolId" character varying(255),
    "meetingRoomId" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Classrooms" OWNER TO postgres;

--
-- Name: CourseManagers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CourseManagers" (
    id character varying(255) NOT NULL,
    "managerId" character varying(255),
    "courseId" character varying(255),
    "enrolledById" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."CourseManagers" OWNER TO postgres;

--
-- Name: Courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Courses" (
    id character varying(255) NOT NULL,
    title character varying(255),
    description text,
    objectives text,
    requirements text,
    status public."enum_Courses_status" DEFAULT 'REVIEW'::public."enum_Courses_status",
    "createdBy" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone,
    "meetingRoomId" character varying(255),
    "organizationId" character varying(255) DEFAULT '0000000000000000000000'::character varying
);


ALTER TABLE public."Courses" OWNER TO postgres;

--
-- Name: Files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Files" (
    id character varying(255) NOT NULL,
    name character varying(255),
    "ownerId" character varying(255),
    "organizationId" character varying(255),
    "publicFile" boolean DEFAULT false,
    "publicUrl" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Files" OWNER TO postgres;

--
-- Name: GroupMembers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GroupMembers" (
    id character varying(255) NOT NULL,
    "userId" character varying(255),
    "groupId" character varying(255),
    "addedBy" character varying(255),
    role public."enum_GroupMembers_role" DEFAULT 'PARTICIPANT'::public."enum_GroupMembers_role",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."GroupMembers" OWNER TO postgres;

--
-- Name: Groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Groups" (
    id character varying(255) NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "createdBy" character varying(255),
    "organizationId" character varying(255),
    type character varying(255),
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Groups" OWNER TO postgres;

--
-- Name: MeetingRoomMembers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MeetingRoomMembers" (
    id character varying(255) NOT NULL,
    "meetingRoomId" character varying(255),
    "participantId" character varying(255),
    role public."enum_MeetingRoomMembers_role" DEFAULT 'PUBLISHER'::public."enum_MeetingRoomMembers_role",
    "deletedAt" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."MeetingRoomMembers" OWNER TO postgres;

--
-- Name: MeetingRooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MeetingRooms" (
    id text NOT NULL,
    title character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "organizationId" character varying(255) DEFAULT '0000000000000000000000'::character varying,
    "deletedAt" timestamp with time zone,
    type character varying(255) DEFAULT 'PRIVATE'::character varying
);


ALTER TABLE public."MeetingRooms" OWNER TO postgres;

--
-- Name: Meetings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Meetings" (
    id character varying(255) NOT NULL,
    "sessionId" character varying(255) NOT NULL,
    "hostId" character varying(255),
    "meetingRoomId" character varying(255),
    "numParticipants" integer DEFAULT 0,
    status character varying(255) DEFAULT 'STARTED'::character varying,
    "endedAt" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Meetings" OWNER TO postgres;

--
-- Name: ModuleItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ModuleItems" (
    id character varying(255) NOT NULL,
    title character varying(255),
    content jsonb DEFAULT '{}'::jsonb NOT NULL,
    type character varying(255) DEFAULT 'Page'::character varying NOT NULL,
    "moduleId" character varying(255) NOT NULL,
    "createdBy" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL,
    "order" integer DEFAULT 0
);


ALTER TABLE public."ModuleItems" OWNER TO postgres;

--
-- Name: Modules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Modules" (
    id character varying(255) NOT NULL,
    description text,
    title character varying(255),
    "courseId" character varying(255) NOT NULL,
    "deletedAt" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "order" integer DEFAULT 0
);


ALTER TABLE public."Modules" OWNER TO postgres;

--
-- Name: Organizations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Organizations" (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone,
    icon character varying(255) DEFAULT ''::character varying,
    link character varying(255) DEFAULT ''::character varying,
    "darkThemeIcon" character varying(255) DEFAULT ''::character varying
);


ALTER TABLE public."Organizations" OWNER TO postgres;

--
-- Name: PasswordResets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PasswordResets" (
    id character varying(255) NOT NULL,
    token text,
    "userId" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."PasswordResets" OWNER TO postgres;

--
-- Name: Questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Questions" (
    id character varying(255) NOT NULL,
    question json,
    "createdAt" timestamp with time zone NOT NULL,
    points integer DEFAULT 0,
    "quizId" character varying(255),
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Questions" OWNER TO postgres;

--
-- Name: Roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Roles" (
    id character varying(255) NOT NULL,
    name character varying(255),
    description text,
    "organizationId" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Roles" OWNER TO postgres;

--
-- Name: Schools; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Schools" (
    id character varying(255) NOT NULL,
    name character varying(255),
    email character varying(255),
    "phoneNumber" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Schools" OWNER TO postgres;

--
-- Name: SequelizeData; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeData" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeData" OWNER TO postgres;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: StudentCourses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StudentCourses" (
    id character varying(255) NOT NULL,
    "studentId" character varying(255) NOT NULL,
    "courseId" character varying(255) NOT NULL,
    status character varying(255) DEFAULT 'PENDING'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."StudentCourses" OWNER TO postgres;

--
-- Name: UserRoles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserRoles" (
    id character varying(255) NOT NULL,
    "userId" character varying(255) NOT NULL,
    "roleId" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."UserRoles" OWNER TO postgres;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255),
    "firstName" character varying(255),
    "lastName" character varying(255),
    email character varying(255) NOT NULL,
    "zipCode" character varying(255),
    country character varying(255),
    city character varying(255),
    gender public."enum_Users_gender",
    "organizationId" character varying(255),
    status character varying(255) DEFAULT 'PENDING'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Data for Name: Answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('X1uaNnbS6ZtG1SzAjqxcEJoB5bwdTz', '"1"', NULL, false, '1AxCZtsKAPNyFPBDDXm6g7B8F1BPwx', '2020-06-18 19:06:24.224+00', '2020-06-18 19:06:24.224+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('lmz85LrJQrXZghzipY-zASBGlIW6i-', '"2"', NULL, false, '1AxCZtsKAPNyFPBDDXm6g7B8F1BPwx', '2020-06-18 19:06:24.224+00', '2020-06-18 19:06:24.224+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('ztc_fTxOdfnAs3r_3CnCEYwdRJtzXCf9', '"4"', NULL, false, '1AxCZtsKAPNyFPBDDXm6g7B8F1BPwx', '2020-06-18 19:06:24.224+00', '2020-06-18 19:06:24.224+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('-vSnPmkfw2R8UKxgD84aUC6kcbd56MC4x', '"7"', NULL, true, '1AxCZtsKAPNyFPBDDXm6g7B8F1BPwx', '2020-06-18 19:06:24.225+00', '2020-06-18 19:06:24.225+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('B120u05JIHw0lM_FK0lJfsHv2WNIYIh9l', '"uu"', NULL, true, '0iOQKDvrMqUXxHdjbq4cAoL9Db6lGD', '2020-06-18 19:06:24.236+00', '2020-06-18 19:06:24.236+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('apblDTXQVKaYHxEApNbuH8YiPsLoWk8tz', '"ffss"', NULL, false, '0iOQKDvrMqUXxHdjbq4cAoL9Db6lGD', '2020-06-18 19:06:24.236+00', '2020-06-18 19:06:24.236+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('_qt3OoKg3qx7eoUa022sU8WXOnd-rwDZC', '"lll"', NULL, false, '0iOQKDvrMqUXxHdjbq4cAoL9Db6lGD', '2020-06-18 19:06:24.237+00', '2020-06-18 19:06:24.237+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('ZJWbFAHEnaCy1xHC2ZRcEI_D09auVozup', '"ghh"', NULL, false, '0iOQKDvrMqUXxHdjbq4cAoL9Db6lGD', '2020-06-18 19:06:24.237+00', '2020-06-18 19:06:24.237+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('mKzbziluZJN7xmXF4Ac2y0UTc8AEqh', '"a"', NULL, false, 'vWZhGt_7jgwPW8JjuLKhY2te-GfsQF', '2020-06-27 10:00:20.082+00', '2020-06-27 10:00:20.082+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('HBFJ8_60EdCHDMpX1QR_X2QAsKuf92', '"b"', NULL, true, 'vWZhGt_7jgwPW8JjuLKhY2te-GfsQF', '2020-06-27 10:00:20.082+00', '2020-06-27 10:00:20.082+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('FY3YhEYFa2YzkGwA-1SR68V3WA5y2NF8', '"d"', NULL, false, 'vWZhGt_7jgwPW8JjuLKhY2te-GfsQF', '2020-06-27 10:00:20.082+00', '2020-06-27 10:00:20.082+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('m0t4rTZDmA5jJoZDn6HUaoT7dMstq6', '"c"', NULL, false, 'vWZhGt_7jgwPW8JjuLKhY2te-GfsQF', '2020-06-27 10:00:20.082+00', '2020-06-27 10:00:20.082+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('umkzLsbTyUesip-5OWSd5pduqRVsqc', '"Ans1"', NULL, false, 'BCq6ysaO65eNMYe_Vq7a3-_bAm6Rij', '2020-07-07 07:53:32.245+00', '2020-07-07 07:53:32.245+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('yeSK5da8L33JyR6-wSnfdX-8TMxFoX', '"Ans2"', NULL, true, 'BCq6ysaO65eNMYe_Vq7a3-_bAm6Rij', '2020-07-07 07:53:32.245+00', '2020-07-07 07:53:32.245+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('gX_6n-qc0wD_wsiK-mSH0wk_wcTpJ7eo', '"Ans3"', NULL, false, 'BCq6ysaO65eNMYe_Vq7a3-_bAm6Rij', '2020-07-07 07:53:32.245+00', '2020-07-07 07:53:32.245+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('fOY3D8IrD3VzOZ6q1tYEXFFmoqapo0xIX', '"Ans4"', NULL, true, 'BCq6ysaO65eNMYe_Vq7a3-_bAm6Rij', '2020-07-07 07:53:32.245+00', '2020-07-07 07:53:32.245+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('WIS4qNC-MVkVQrwTqZZc449_eN5MmDlfx', '"true"', NULL, true, 'yCON65tG0MwyIp3ADqDh2DmXfa3XuO', '2020-07-07 07:53:32.252+00', '2020-07-07 07:53:32.252+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('c59ZRTblBQuyJC-OcZuIUle5KhBWjwSe5', '"False"', NULL, false, 'yCON65tG0MwyIp3ADqDh2DmXfa3XuO', '2020-07-07 07:53:32.252+00', '2020-07-07 07:53:32.252+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('X2whsf796y07Wu5Dfc5rjNbzrRikRh', '"ans2"', NULL, false, 'rTZr1LRASmSL6VBOD6KV7kYIoYgOFj', '2020-07-21 11:31:47.188+00', '2020-07-21 11:31:47.188+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('jOKzvJi6zxA7chJHpp0JDbdwCQCwwA', '"gfgf"', NULL, true, 'rTZr1LRASmSL6VBOD6KV7kYIoYgOFj', '2020-07-21 11:31:47.188+00', '2020-07-21 11:31:47.188+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('SpHl8viZbwVnGXWocp2SjiLkaQgVKvJY', '"swsw"', NULL, false, 'rTZr1LRASmSL6VBOD6KV7kYIoYgOFj', '2020-07-21 11:31:47.188+00', '2020-07-21 11:31:47.188+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('fx2R7D4Tt8QoyNvXolrHLUnYi7SucdSx6', '"jghnbg"', NULL, false, 'rTZr1LRASmSL6VBOD6KV7kYIoYgOFj', '2020-07-21 11:31:47.189+00', '2020-07-21 11:31:47.189+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('ae-VfU6xkmMbC8dicTKG3bx9vmrN72Z6Z', '"ghgjhjhj"', NULL, false, 'iRRzyzerEAD09ENJUj4WfArF9hioes', '2020-07-21 11:31:47.196+00', '2020-07-21 11:31:47.196+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('QoAWibMp5PL6W1ZlSHXipUTcYKJZd3IeT', '"dswd"', NULL, false, 'iRRzyzerEAD09ENJUj4WfArF9hioes', '2020-07-21 11:31:47.196+00', '2020-07-21 11:31:47.196+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('xSTPGLQ8dRwP7GZFCyX9ouestlvWnomJZ', '"bgt"', NULL, false, 'iRRzyzerEAD09ENJUj4WfArF9hioes', '2020-07-21 11:31:47.196+00', '2020-07-21 11:31:47.196+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('sD5eCVse8f_e_zXW9aX7HiHq2QpgPf6Rk', '"ki"', NULL, true, 'iRRzyzerEAD09ENJUj4WfArF9hioes', '2020-07-21 11:31:47.196+00', '2020-07-21 11:31:47.196+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('DsIZC4RbsT', '"first"', NULL, false, '_Y4hTDb5yK', '2020-08-03 10:52:02.471+00', '2020-08-03 10:52:02.471+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('qIPpHtMCvB', '"second"', NULL, true, '_Y4hTDb5yK', '2020-08-03 10:52:02.471+00', '2020-08-03 10:52:02.471+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('ja1WMdy6XY', '"third"', NULL, false, '_Y4hTDb5yK', '2020-08-03 10:52:02.471+00', '2020-08-03 10:52:02.471+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('eDssvT4QL3', '"true"', NULL, false, 'xqWGV2c9Bl', '2020-08-03 10:52:02.498+00', '2020-08-03 10:52:02.498+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('65jK93A4yo', '"four"', NULL, true, '_Y4hTDb5yK', '2020-08-03 10:52:02.472+00', '2020-08-03 10:52:02.472+00', NULL);
INSERT INTO public."Answers" (id, answer, description, correct, "questionId", "createdAt", "updatedAt", "deletedAt") VALUES ('dw16ysI8v_', '"false"', NULL, false, 'xqWGV2c9Bl', '2020-08-03 10:52:02.499+00', '2020-08-03 10:52:02.499+00', NULL);


--
-- Data for Name: AssignmentSubmissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."AssignmentSubmissions" (id, "studentId", "assignmentId", "reviewerId", "submissionType", submission, "reviewedOn", points, resubmission, "createdAt", "updatedAt", "deletedAt") VALUES ('-3nMrMZ-PUjCQGY0436-DhFXhxUez', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'I6C_gnzeTE163Z3b0UCCSlmyfFAXF', NULL, 'Text Entry', 'vdfsdf', NULL, NULL, false, '2020-06-27 09:58:17.779+00', '2020-06-27 09:58:17.779+00', NULL);
INSERT INTO public."AssignmentSubmissions" (id, "studentId", "assignmentId", "reviewerId", "submissionType", submission, "reviewedOn", points, resubmission, "createdAt", "updatedAt", "deletedAt") VALUES ('EactKdvFNY1II4JPVbGfVhBh7Zgwd', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'T8u3QZh4aSI4TKmZRWflSd05Ws4xZ', NULL, 'Text Entry', 'efdafsag', NULL, NULL, false, '2020-07-07 07:55:58.137+00', '2020-07-07 07:55:58.137+00', NULL);
INSERT INTO public."AssignmentSubmissions" (id, "studentId", "assignmentId", "reviewerId", "submissionType", submission, "reviewedOn", points, resubmission, "createdAt", "updatedAt", "deletedAt") VALUES ('b4VhZZrnbf54MUnJh7dJPgGLyS8pv', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'Blp0I1BknjVD1UlpwmLMoOBGiQNYg', NULL, 'File Upload', 'JqJnhUqhHBzGNHpU_DqxIgyq8slDi', NULL, NULL, false, '2020-07-21 11:28:00.111+00', '2020-07-21 11:28:00.111+00', NULL);
INSERT INTO public."AssignmentSubmissions" (id, "studentId", "assignmentId", "reviewerId", "submissionType", submission, "reviewedOn", points, resubmission, "createdAt", "updatedAt", "deletedAt") VALUES ('Vib3f-Ysn', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'HpFZ6CY_M', NULL, 'File Upload', 'sDKmMbA9p', NULL, NULL, false, '2020-07-23 11:27:12.256+00', '2020-07-23 11:27:12.256+00', NULL);
INSERT INTO public."AssignmentSubmissions" (id, "studentId", "assignmentId", "reviewerId", "submissionType", submission, "reviewedOn", points, resubmission, "createdAt", "updatedAt", "deletedAt") VALUES ('mzyHKRvm0', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'A-mg6tBU8', NULL, 'Text Entry', '', NULL, NULL, false, '2020-08-03 10:49:39.988+00', '2020-08-03 10:49:39.988+00', NULL);


--
-- Data for Name: Classrooms; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: CourseManagers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."CourseManagers" (id, "managerId", "courseId", "enrolledById", "createdAt", "updatedAt", "deletedAt") VALUES ('Cynm5hCW6vtNHnUdEjViZUqU_1Y37', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'bBWTPTlFG3AkvUoTAa15reoLqrq6T', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 19:08:16.747+00', '2020-06-18 19:08:16.747+00', NULL);
INSERT INTO public."CourseManagers" (id, "managerId", "courseId", "enrolledById", "createdAt", "updatedAt", "deletedAt") VALUES ('MX2thtUQFmaXZbyUyzhO_mxfkYbVq', 'yYbZhjT0oguJYsbUWv4xnL74NL5lp', 'bBWTPTlFG3AkvUoTAa15reoLqrq6T', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 19:08:32.429+00', '2020-06-18 19:08:32.429+00', NULL);
INSERT INTO public."CourseManagers" (id, "managerId", "courseId", "enrolledById", "createdAt", "updatedAt", "deletedAt") VALUES ('03qHwvvjNHjHOIr8TCQgNcncQSLE_', '1JLVW-khdz9J842Inrri0IbDLxORh', 'bBWTPTlFG3AkvUoTAa15reoLqrq6T', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 19:08:38.804+00', '2020-06-18 19:08:38.804+00', NULL);
INSERT INTO public."CourseManagers" (id, "managerId", "courseId", "enrolledById", "createdAt", "updatedAt", "deletedAt") VALUES ('vY_9OI3q6pNfks3g94Tzc8lNyMbo1', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 19:09:03.631+00', '2020-06-18 19:09:03.631+00', NULL);
INSERT INTO public."CourseManagers" (id, "managerId", "courseId", "enrolledById", "createdAt", "updatedAt", "deletedAt") VALUES ('BLD8sZkqKo2ibQFP0X2rz0wFHxVKz', 'yYbZhjT0oguJYsbUWv4xnL74NL5lp', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 19:09:09.125+00', '2020-06-18 19:09:09.125+00', NULL);
INSERT INTO public."CourseManagers" (id, "managerId", "courseId", "enrolledById", "createdAt", "updatedAt", "deletedAt") VALUES ('W4-AVakrN871h5jzWhBQh31-Dz8zZ', '1JLVW-khdz9J842Inrri0IbDLxORh', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 19:09:14.88+00', '2020-06-18 19:09:14.88+00', NULL);
INSERT INTO public."CourseManagers" (id, "managerId", "courseId", "enrolledById", "createdAt", "updatedAt", "deletedAt") VALUES ('aNFC7BW9G4Tg5DnXfpntqgklLyXvu', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'Pkj3LNIbXAcz0oo2OMKGtqTXas7av', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-27 09:50:28.727+00', '2020-06-27 09:50:28.727+00', NULL);
INSERT INTO public."CourseManagers" (id, "managerId", "courseId", "enrolledById", "createdAt", "updatedAt", "deletedAt") VALUES ('pC4pRC0d2t2CTUwNrCOnMffkxw01j', 'yYbZhjT0oguJYsbUWv4xnL74NL5lp', 'Pkj3LNIbXAcz0oo2OMKGtqTXas7av', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-27 10:01:41.084+00', '2020-06-27 10:01:41.084+00', NULL);
INSERT INTO public."CourseManagers" (id, "managerId", "courseId", "enrolledById", "createdAt", "updatedAt", "deletedAt") VALUES ('RlgoQD_qCxkEO0HzPwxZJo8zN0OnF', 'tSXqFNK8SCmCqt6l6NkTtIxOq0fU6', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-07-07 08:30:02.056+00', '2020-07-07 08:30:02.056+00', NULL);
INSERT INTO public."CourseManagers" (id, "managerId", "courseId", "enrolledById", "createdAt", "updatedAt", "deletedAt") VALUES ('zmsIW0zqV', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'bxISQK3fR', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-07-23 11:24:07.966+00', '2020-07-23 11:24:07.966+00', NULL);


--
-- Data for Name: Courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Courses" (id, title, description, objectives, requirements, status, "createdBy", "createdAt", "updatedAt", "deletedAt", "meetingRoomId", "organizationId") VALUES ('vMd69laes5ulJFmgTsi1TIfKNFiAO', 'Class9-Social Science', '', NULL, NULL, 'REVIEW', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-16 15:29:38.686+00', '2020-06-16 15:29:38.686+00', NULL, NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj');
INSERT INTO public."Courses" (id, title, description, objectives, requirements, status, "createdBy", "createdAt", "updatedAt", "deletedAt", "meetingRoomId", "organizationId") VALUES ('TH3henM3ZTShjjO2FkTCt0POjjXoe', 'Class10-Physics', '', NULL, NULL, 'REVIEW', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-16 15:34:03.474+00', '2020-06-16 15:34:03.474+00', NULL, NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj');
INSERT INTO public."Courses" (id, title, description, objectives, requirements, status, "createdBy", "createdAt", "updatedAt", "deletedAt", "meetingRoomId", "organizationId") VALUES ('KEclH4anaq5g5UoX3Wd6dVTSFBdEr', 'Class10-Chemistry', '', NULL, NULL, 'REVIEW', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-16 15:38:36.055+00', '2020-06-16 15:38:36.055+00', NULL, NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj');
INSERT INTO public."Courses" (id, title, description, objectives, requirements, status, "createdBy", "createdAt", "updatedAt", "deletedAt", "meetingRoomId", "organizationId") VALUES ('BKFk2FwRM4yTKkRTIN_3fPPWOsQHD', 'Class12-Mathematics', '', NULL, NULL, 'REVIEW', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-16 15:24:44.735+00', '2020-06-16 15:39:02.017+00', NULL, NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj');
INSERT INTO public."Courses" (id, title, description, objectives, requirements, status, "createdBy", "createdAt", "updatedAt", "deletedAt", "meetingRoomId", "organizationId") VALUES ('-bJHrkiRGciXaVlLb4b9G-6Wk3sUB', 'Class7-English', '', NULL, NULL, 'REVIEW', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-16 15:42:15.922+00', '2020-06-16 15:42:15.922+00', NULL, NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj');
INSERT INTO public."Courses" (id, title, description, objectives, requirements, status, "createdBy", "createdAt", "updatedAt", "deletedAt", "meetingRoomId", "organizationId") VALUES ('bBWTPTlFG3AkvUoTAa15reoLqrq6T', 'Class1-Stories', '', NULL, NULL, 'REVIEW', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-16 15:56:59.618+00', '2020-06-23 12:21:34.267+00', NULL, 'gvUSxXS4uTExlBMHnywxv8YFy87DO', '2eVFJKef4-dYEK4V_8opP4msRCUQtj');
INSERT INTO public."Courses" (id, title, description, objectives, requirements, status, "createdBy", "createdAt", "updatedAt", "deletedAt", "meetingRoomId", "organizationId") VALUES ('Pkj3LNIbXAcz0oo2OMKGtqTXas7av', '12th-Chemistry', '', NULL, NULL, 'REVIEW', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-27 09:48:23.62+00', '2020-06-27 10:14:08.823+00', NULL, 'SoZcckPulH1_dXr1ElQcrNsEUQ7PR', '2eVFJKef4-dYEK4V_8opP4msRCUQtj');
INSERT INTO public."Courses" (id, title, description, objectives, requirements, status, "createdBy", "createdAt", "updatedAt", "deletedAt", "meetingRoomId", "organizationId") VALUES ('TL0dZhg48FzaupA70ydo0pEtrKS3L', 'Class8-Mathematics', '', NULL, NULL, 'REVIEW', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-16 15:32:27.169+00', '2020-07-21 11:12:43.616+00', NULL, '63wV9cgIGVC3zrSyGQY7D6zfEA6OO', '2eVFJKef4-dYEK4V_8opP4msRCUQtj');
INSERT INTO public."Courses" (id, title, description, objectives, requirements, status, "createdBy", "createdAt", "updatedAt", "deletedAt", "meetingRoomId", "organizationId") VALUES ('bxISQK3fR', '4th-Mathematics', '', NULL, NULL, 'REVIEW', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-07-23 11:07:12.435+00', '2020-07-23 11:27:55.654+00', NULL, 'M5zSDIVjQ', '2eVFJKef4-dYEK4V_8opP4msRCUQtj');
INSERT INTO public."Courses" (id, title, description, objectives, requirements, status, "createdBy", "createdAt", "updatedAt", "deletedAt", "meetingRoomId", "organizationId") VALUES ('6q-1AQUKQ', 'Test', '', NULL, NULL, 'REVIEW', 'x8Ib7mziN3', '2020-07-31 11:09:45+00', '2020-07-31 11:09:49.258+00', NULL, '52B4s3tBD', 'rlpmZ1JDEu');


--
-- Data for Name: Files; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Files" (id, name, "ownerId", "organizationId", "publicFile", "publicUrl", "createdAt", "updatedAt", "deletedAt") VALUES ('JqJnhUqhHBzGNHpU_DqxIgyq8slDi', 'thumbnail_large-1.jpg', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', false, '/storage/files/JqJnhUqhHBzGNHpU_DqxIgyq8slDi', '2020-07-21 11:27:54.519+00', '2020-07-21 11:27:56.618+00', NULL);
INSERT INTO public."Files" (id, name, "ownerId", "organizationId", "publicFile", "publicUrl", "createdAt", "updatedAt", "deletedAt") VALUES ('sDKmMbA9p', '0 (1).jpeg', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', false, '/storage/files/sDKmMbA9p', '2020-07-23 11:27:08.043+00', '2020-07-23 11:27:09.369+00', NULL);


--
-- Data for Name: GroupMembers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('21dy-5qaJXBTe6hS1CIRnAGnzVmeaS', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'uHk166iGpc59NQAEc0s0BR23Bjrxe', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:17:52.968+00', '2020-06-16 15:17:52.968+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('q3aei3-tIMD3Muyc8yGcXEuLiR3wen', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'uHk166iGpc59NQAEc0s0BR23Bjrxe', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:17:52.969+00', '2020-06-16 15:17:52.969+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('XHGnvZY0CGmUpH7wPZ36KzYIj6DH1y', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'uHk166iGpc59NQAEc0s0BR23Bjrxe', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:17:52.969+00', '2020-06-16 15:17:52.969+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('cqAL5dPBEGB60Za0ZyCP6n4R31sA3e', 'a8mevYf3HBMlKmXoTAesZMFQ-wyCd', 'uHk166iGpc59NQAEc0s0BR23Bjrxe', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:17:52.969+00', '2020-06-16 15:17:52.969+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('3yDNN5Zjps2u5uIze-_LyK5sJvcuq', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'K9Kp5M8_WUL2fTYlIYV5JxpIEbBy1', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:19:36.25+00', '2020-06-16 15:19:36.25+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('LGISplxYaBIUwDzrXGFbazD1bqDrBf', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'K9Kp5M8_WUL2fTYlIYV5JxpIEbBy1', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:19:36.251+00', '2020-06-16 15:19:36.251+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('dN3fHvs7diHt-_vDqEPvgYebWY8rRH', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'K9Kp5M8_WUL2fTYlIYV5JxpIEbBy1', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:19:36.251+00', '2020-06-16 15:19:36.251+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('CZ3BrHfBGJmLE5pggTkqnSCRY_aJII', 'a8mevYf3HBMlKmXoTAesZMFQ-wyCd', 'K9Kp5M8_WUL2fTYlIYV5JxpIEbBy1', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:19:36.252+00', '2020-06-16 15:19:36.252+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('aWpUAq42DAEs2dzM6_V0POMiuLdOLX', 'Vkg7oFyyr3n5EIHTElnyUN8gUM4Dw', 'K9Kp5M8_WUL2fTYlIYV5JxpIEbBy1', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:19:36.252+00', '2020-06-16 15:19:36.252+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('UP2s6eSiO9Y3aXT48tkGSETqC53Ny0', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'qUAgjbIXXixIN9UCjNWTlOUWft2Lg', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:20:01.624+00', '2020-06-16 15:20:01.624+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('lNF0WFUWvIDj_efz8ssdALTlMSFeii', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'qUAgjbIXXixIN9UCjNWTlOUWft2Lg', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:20:01.624+00', '2020-06-16 15:20:01.624+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('Xx6g-C1ULWdy-KIOgOhTiWhMfFGn50', 'a8mevYf3HBMlKmXoTAesZMFQ-wyCd', 'qUAgjbIXXixIN9UCjNWTlOUWft2Lg', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:20:01.624+00', '2020-06-16 15:20:01.624+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('s43CRubnX_0QxItzfhzxc9KaPAzUGm', 'Vkg7oFyyr3n5EIHTElnyUN8gUM4Dw', 'qUAgjbIXXixIN9UCjNWTlOUWft2Lg', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:20:01.625+00', '2020-06-16 15:20:01.625+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('vbf9qKPBLTVTYpF8JMZ9mN2HZIVmx7', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'wIuTDrUKXvSQXJIRw5qrojIPY2bOn', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:20:16.49+00', '2020-06-16 15:20:16.49+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('SMdB6b3l8Lckx7XpKT7CaPkG42DYnd', 'Qd7ERkgo9JvttcTQJIgBgBxKO4F5n', 'wIuTDrUKXvSQXJIRw5qrojIPY2bOn', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:20:16.49+00', '2020-06-16 15:20:16.49+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('e_lNdv3M9evvbj7ZOZFxDYNdHmWDCk', 'Vkg7oFyyr3n5EIHTElnyUN8gUM4Dw', 'wIuTDrUKXvSQXJIRw5qrojIPY2bOn', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:20:16.491+00', '2020-06-16 15:20:16.491+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('onLdQANjQ_BsWAT9iESplVaOMsymXe', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'CxkBlRpxpw59M9cVAa0h9rzRWxdyY', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:21:04.994+00', '2020-06-16 15:21:04.994+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('rTEdm_71U3bL6Ztn55DZbwQhz_qSby', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'CxkBlRpxpw59M9cVAa0h9rzRWxdyY', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:21:04.994+00', '2020-06-16 15:21:04.994+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('oxsFAmx4RVoNDz-P-gzFExvraI4r7u', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'CxkBlRpxpw59M9cVAa0h9rzRWxdyY', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:21:04.994+00', '2020-06-16 15:21:04.994+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('TRHIfYQw7yLrOrGG5azkL1DGj_VYel', 'a8mevYf3HBMlKmXoTAesZMFQ-wyCd', 'CxkBlRpxpw59M9cVAa0h9rzRWxdyY', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:21:04.994+00', '2020-06-16 15:21:04.994+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('qUJr2aOd0Ym75byuqjALGH8wDbCUdQ6C', 'lt-cTU-3lFR0Pf1HyZT2nF9mfOXr4', 'CxkBlRpxpw59M9cVAa0h9rzRWxdyY', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:21:04.995+00', '2020-06-16 15:21:04.995+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('lyMNCsA7nl7q0hUicvykVGrwfBaioa', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', '5ZOhA2-UKkRof9uI9x1ZzSodGsleb', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:22:04.993+00', '2020-06-16 15:22:04.993+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('AiRSyj7EpQkhDY4-yq3oI04QYj2ivS', '1JLVW-khdz9J842Inrri0IbDLxORh', '5ZOhA2-UKkRof9uI9x1ZzSodGsleb', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:22:04.993+00', '2020-06-16 15:22:04.993+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('RqH8N42JkG6bwsFz3LQ5VELHcg1Wa5', 'yYbZhjT0oguJYsbUWv4xnL74NL5lp', '6cU_On_O-Bxy7Bo-5mt73C_vvXJff', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:22:15.184+00', '2020-06-16 15:22:15.184+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('4FHgHdd9-ncz9XRiZHO7SV9PTO0A9T', '1JLVW-khdz9J842Inrri0IbDLxORh', '6cU_On_O-Bxy7Bo-5mt73C_vvXJff', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:22:15.184+00', '2020-06-16 15:22:15.184+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('ne1zceLGspUXX_Yd18SCfTBYLm_Bwf', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'AldclFGSgclLzJSifGbECLgnkZYni', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:22:45.531+00', '2020-06-16 15:22:45.531+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('-AOjHPGKfD-KCcwpGZf8VV2xJuoZ6C', '1JLVW-khdz9J842Inrri0IbDLxORh', 'AldclFGSgclLzJSifGbECLgnkZYni', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:22:45.531+00', '2020-06-16 15:22:45.531+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('6zfH9od_c6_loclaKswXOXWkseN1Qk', 'yYbZhjT0oguJYsbUWv4xnL74NL5lp', 'QcHTLSmN8nEvAIYC-4Mw9OH8bi-mD', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:23:10.945+00', '2020-06-16 15:23:10.945+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('BJGK2ZaTtkBtu3vNJfs7v1t3vi18wW', '1JLVW-khdz9J842Inrri0IbDLxORh', 'QcHTLSmN8nEvAIYC-4Mw9OH8bi-mD', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-16 15:23:10.946+00', '2020-06-16 15:23:10.946+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('nHsL6ANlaavxQ9zh8rrJ_RgQvFd-5T', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'Ao1x6Ajts4yuhaBsLfCvoES06b6fS', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-18 19:07:48.095+00', '2020-06-18 19:07:48.095+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('k2qD9yhjkhVMnLO_jeFrGLgbuOukjZ', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'Ao1x6Ajts4yuhaBsLfCvoES06b6fS', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-18 19:07:48.095+00', '2020-06-18 19:07:48.095+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('KG37AOyhh4IrspgRbSigXMQVkWs5sN', 'Qd7ERkgo9JvttcTQJIgBgBxKO4F5n', 'Ao1x6Ajts4yuhaBsLfCvoES06b6fS', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-18 19:07:48.095+00', '2020-06-18 19:07:48.095+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('DjO5hPBtoqHYF_0kbJc-6L0PaQKuE5', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'Ao1x6Ajts4yuhaBsLfCvoES06b6fS', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-18 19:07:48.095+00', '2020-06-18 19:07:48.095+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('mqE6ZW4RDELRZQEaeyub6BkhTjJK6c', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'Rh8HtPsvIssB73yX8_9G1toDFAoDw', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-27 10:04:29.957+00', '2020-06-27 10:04:29.957+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('xC6st_a1I4iTrB0OBbymW9ojvayf5p', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'Rh8HtPsvIssB73yX8_9G1toDFAoDw', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-27 10:04:29.957+00', '2020-06-27 10:04:29.957+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('2jbRKx07obTZpv5yVSSW5EppX3-UcU', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'Rh8HtPsvIssB73yX8_9G1toDFAoDw', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-27 10:04:29.957+00', '2020-06-27 10:04:29.957+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('hFamHFPuDIRMYM1BWGpRulLmlOYgoz', 'lt-cTU-3lFR0Pf1HyZT2nF9mfOXr4', 'Rh8HtPsvIssB73yX8_9G1toDFAoDw', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-06-27 10:04:29.957+00', '2020-06-27 10:04:29.957+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('dYXyRw2M4tiz6kTgv5DLnrv7LN9Joa', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'ss9wQlLXAa9H5cLAWIFi1NNKERFno', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-07-07 08:24:38.986+00', '2020-07-07 08:24:38.986+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('tXqnqjtB0bI11cm7zDEN1ndFMAo0N3', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'ss9wQlLXAa9H5cLAWIFi1NNKERFno', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-07-07 08:24:38.986+00', '2020-07-07 08:24:38.986+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('Y_JzEJTItBNRBOJflH8c6523wGv18N', 'lt-cTU-3lFR0Pf1HyZT2nF9mfOXr4', 'ss9wQlLXAa9H5cLAWIFi1NNKERFno', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-07-07 08:24:38.986+00', '2020-07-07 08:24:38.986+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('0ZUvGWkJknpD0p3Kea_Vj6QBPJfPwV', '2OlY7Txw7N-Npy4Wl-SgOokHV5we2', 'ss9wQlLXAa9H5cLAWIFi1NNKERFno', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-07-07 08:24:38.987+00', '2020-07-07 08:24:38.987+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('07wiMAC-qZ', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'g6CVQpmuK', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-08-03 10:55:16.33+00', '2020-08-03 10:55:16.33+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('W4Qgi00AFm', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'g6CVQpmuK', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-08-03 10:55:16.347+00', '2020-08-03 10:55:16.347+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('3hU64QOmLS', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'g6CVQpmuK', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-08-03 10:55:16.35+00', '2020-08-03 10:55:16.35+00', NULL);
INSERT INTO public."GroupMembers" (id, "userId", "groupId", "addedBy", role, "createdAt", "updatedAt", "deletedAt") VALUES ('ytK6aFXE-3', 'lt-cTU-3lFR0Pf1HyZT2nF9mfOXr4', 'g6CVQpmuK', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'PARTICIPANT', '2020-08-03 10:55:16.355+00', '2020-08-03 10:55:16.355+00', NULL);


--
-- Data for Name: Groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Groups" (id, name, "createdAt", "createdBy", "organizationId", type, "updatedAt", "deletedAt") VALUES ('uHk166iGpc59NQAEc0s0BR23Bjrxe', '2019-PLUS-TWO-SCIENCE', '2020-06-16 15:17:52.96+00', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'Student', '2020-06-16 15:17:52.96+00', NULL);
INSERT INTO public."Groups" (id, name, "createdAt", "createdBy", "organizationId", type, "updatedAt", "deletedAt") VALUES ('K9Kp5M8_WUL2fTYlIYV5JxpIEbBy1', 'High-School-2020-Batch', '2020-06-16 15:19:35.992+00', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'Student', '2020-06-16 15:19:35.992+00', NULL);
INSERT INTO public."Groups" (id, name, "createdAt", "createdBy", "organizationId", type, "updatedAt", "deletedAt") VALUES ('qUAgjbIXXixIN9UCjNWTlOUWft2Lg', 'Classroom-10-C', '2020-06-16 15:20:01.616+00', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'Student', '2020-06-16 15:20:01.616+00', NULL);
INSERT INTO public."Groups" (id, name, "createdAt", "createdBy", "organizationId", type, "updatedAt", "deletedAt") VALUES ('wIuTDrUKXvSQXJIRw5qrojIPY2bOn', 'Classroom-9-A', '2020-06-16 15:20:16.483+00', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'Student', '2020-06-16 15:20:16.483+00', NULL);
INSERT INTO public."Groups" (id, name, "createdAt", "createdBy", "organizationId", type, "updatedAt", "deletedAt") VALUES ('CxkBlRpxpw59M9cVAa0h9rzRWxdyY', 'Classroom-8-D', '2020-06-16 15:21:04.986+00', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'Student', '2020-06-16 15:21:04.986+00', NULL);
INSERT INTO public."Groups" (id, name, "createdAt", "createdBy", "organizationId", type, "updatedAt", "deletedAt") VALUES ('5ZOhA2-UKkRof9uI9x1ZzSodGsleb', 'Chemistry-Teachers', '2020-06-16 15:22:04.986+00', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'Teacher', '2020-06-16 15:22:04.986+00', NULL);
INSERT INTO public."Groups" (id, name, "createdAt", "createdBy", "organizationId", type, "updatedAt", "deletedAt") VALUES ('6cU_On_O-Bxy7Bo-5mt73C_vvXJff', 'Mathematics-Teachers', '2020-06-16 15:22:15.177+00', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'Teacher', '2020-06-16 15:22:15.177+00', NULL);
INSERT INTO public."Groups" (id, name, "createdAt", "createdBy", "organizationId", type, "updatedAt", "deletedAt") VALUES ('AldclFGSgclLzJSifGbECLgnkZYni', 'High-School-PT-Teachers', '2020-06-16 15:22:45.524+00', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'Teacher', '2020-06-16 15:22:45.524+00', NULL);
INSERT INTO public."Groups" (id, name, "createdAt", "createdBy", "organizationId", type, "updatedAt", "deletedAt") VALUES ('QcHTLSmN8nEvAIYC-4Mw9OH8bi-mD', 'Physics-Teachers-PlusTwo', '2020-06-16 15:23:10.938+00', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'Teacher', '2020-06-16 15:23:10.938+00', NULL);
INSERT INTO public."Groups" (id, name, "createdAt", "createdBy", "organizationId", type, "updatedAt", "deletedAt") VALUES ('Ao1x6Ajts4yuhaBsLfCvoES06b6fS', 'Classroom-1-A', '2020-06-18 19:07:48.084+00', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'Student', '2020-06-18 19:07:48.084+00', NULL);
INSERT INTO public."Groups" (id, name, "createdAt", "createdBy", "organizationId", type, "updatedAt", "deletedAt") VALUES ('Rh8HtPsvIssB73yX8_9G1toDFAoDw', '12C-Classroom-Science', '2020-06-27 10:04:29.943+00', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'Student', '2020-06-27 10:04:29.943+00', NULL);
INSERT INTO public."Groups" (id, name, "createdAt", "createdBy", "organizationId", type, "updatedAt", "deletedAt") VALUES ('ss9wQlLXAa9H5cLAWIFi1NNKERFno', 'classroom-1C', '2020-07-07 08:24:38.978+00', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'Student', '2020-07-07 08:24:38.978+00', NULL);
INSERT INTO public."Groups" (id, name, "createdAt", "createdBy", "organizationId", type, "updatedAt", "deletedAt") VALUES ('g6CVQpmuK', 'classroom10D', '2020-08-03 10:55:16.293+00', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'Student', '2020-08-03 10:55:16.293+00', NULL);


--
-- Data for Name: MeetingRoomMembers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('tqqjD5zVz-TtJ0sPDpfzUvHmPWCwmX0y', NULL, 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'PUBLISHER', NULL, '2020-06-18 19:07:01.633+00', '2020-06-18 19:07:01.633+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('QcQV8pj39iD1pFncNPVwllTNRjKLnGL4b', NULL, 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'PUBLISHER', NULL, '2020-06-18 19:07:01.64+00', '2020-06-18 19:07:01.64+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('qKBofETRjjCNDrOhh4hDhGo99u59MNEJQ', NULL, 'a8mevYf3HBMlKmXoTAesZMFQ-wyCd', 'PUBLISHER', NULL, '2020-06-18 19:07:01.649+00', '2020-06-18 19:07:01.649+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('WEHx_p-ffaN7JlxwieLAxFFiF6Ha0qRTB', NULL, 'lt-cTU-3lFR0Pf1HyZT2nF9mfOXr4', 'PUBLISHER', NULL, '2020-06-18 19:07:01.649+00', '2020-06-18 19:07:01.649+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('Rx9QuWP4LBQIh8mzcsnG0s6ria5RMumbz', NULL, 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'PUBLISHER', NULL, '2020-06-18 19:07:01.653+00', '2020-06-18 19:07:01.653+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('TuBbR4tJ2o6I0kKOiOLErJvy1U48g9', NULL, 'Qd7ERkgo9JvttcTQJIgBgBxKO4F5n', 'PUBLISHER', NULL, '2020-06-18 19:08:05.553+00', '2020-06-18 19:08:05.553+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('vsCw1oRuM8-9-qz27KXFffB2-_mp_k', 'gvUSxXS4uTExlBMHnywxv8YFy87DO', 'Qd7ERkgo9JvttcTQJIgBgBxKO4F5n', 'PUBLISHER', NULL, '2020-06-23 12:21:34.308+00', '2020-06-23 12:21:34.308+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('DTMSGINPp6ZQKnNtO5G-r9c1qJUJZH', 'gvUSxXS4uTExlBMHnywxv8YFy87DO', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'PUBLISHER', NULL, '2020-06-23 12:21:34.308+00', '2020-06-23 12:21:34.308+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('zDEg46FaIH5qf3s_lCz6eVchSqjXU', 'gvUSxXS4uTExlBMHnywxv8YFy87DO', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'PUBLISHER', NULL, '2020-06-23 12:21:34.297+00', '2020-06-23 12:21:34.297+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('sXAFQ34KIyDmv8u8E07zUs2SSttfvn', 'gvUSxXS4uTExlBMHnywxv8YFy87DO', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'PUBLISHER', NULL, '2020-06-23 12:21:34.306+00', '2020-06-23 12:21:34.306+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('bHY0sKrHXraJaHjJuYdHgiwR4NmXEJ', 'gvUSxXS4uTExlBMHnywxv8YFy87DO', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'MODERATOR', NULL, '2020-06-23 12:21:34.33+00', '2020-06-23 12:21:34.33+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('x-JZYIchAT9_KK21W1M7urHWgDwG4', 'gvUSxXS4uTExlBMHnywxv8YFy87DO', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'MODERATOR', NULL, '2020-06-27 09:45:15.222+00', '2020-06-27 09:45:15.222+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('Z5EMQipaWjqZvQsmktNH2HIZ24lqI8', 'SoZcckPulH1_dXr1ElQcrNsEUQ7PR', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'PUBLISHER', NULL, '2020-06-27 10:14:08.85+00', '2020-06-27 10:14:08.85+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('RYl4VDFL_CsHeJudWCEg90oO5Wd4rA', 'SoZcckPulH1_dXr1ElQcrNsEUQ7PR', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'PUBLISHER', NULL, '2020-06-27 10:14:08.86+00', '2020-06-27 10:14:08.86+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('XCGuA38A4vTz0rOcO-2QeDp0nCA231', 'SoZcckPulH1_dXr1ElQcrNsEUQ7PR', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'PUBLISHER', NULL, '2020-06-27 10:14:08.864+00', '2020-06-27 10:14:08.864+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('TOacybd7cMByvK5ZiuBajwLJzCEPUi', 'SoZcckPulH1_dXr1ElQcrNsEUQ7PR', 'a8mevYf3HBMlKmXoTAesZMFQ-wyCd', 'PUBLISHER', NULL, '2020-06-27 10:14:08.864+00', '2020-06-27 10:14:08.864+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('cN5W1EkNE3pR1oVsH489y_j2HJT386Yc', 'SoZcckPulH1_dXr1ElQcrNsEUQ7PR', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'MODERATOR', NULL, '2020-06-27 10:14:08.881+00', '2020-06-27 10:14:08.881+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('gO8LPt3btrEYbDcfILJcGh7DpTO_YE', 'gvUSxXS4uTExlBMHnywxv8YFy87DO', 'lt-cTU-3lFR0Pf1HyZT2nF9mfOXr4', 'PUBLISHER', NULL, '2020-07-07 08:25:47.787+00', '2020-07-07 08:25:47.787+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('mMrPzNf5_ISAycXOyebMA0kvLAhinQ', 'gvUSxXS4uTExlBMHnywxv8YFy87DO', '2OlY7Txw7N-Npy4Wl-SgOokHV5we2', 'PUBLISHER', NULL, '2020-07-07 08:25:47.795+00', '2020-07-07 08:25:47.795+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('Q_4uBAgP5y0k59fWd4-3scIuIUKZX', 'SoZcckPulH1_dXr1ElQcrNsEUQ7PR', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'MODERATOR', NULL, '2020-07-13 07:24:53.325+00', '2020-07-13 07:24:53.325+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('9XewnisyURSRbr1EkyvwH9n1gK0WIZ', '63wV9cgIGVC3zrSyGQY7D6zfEA6OO', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'PUBLISHER', NULL, '2020-07-21 11:12:43.643+00', '2020-07-21 11:12:43.643+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('cz4bAqiV2g4f-wwoFEAhingBtnt-rV', '63wV9cgIGVC3zrSyGQY7D6zfEA6OO', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'PUBLISHER', NULL, '2020-07-21 11:12:43.663+00', '2020-07-21 11:12:43.663+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('uB80L3Thsjfk1cujofWcENHEG4k1LK', '63wV9cgIGVC3zrSyGQY7D6zfEA6OO', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'PUBLISHER', NULL, '2020-07-21 11:12:43.666+00', '2020-07-21 11:12:43.666+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('WMwBKiP5qWZPBWpm_aW0DQLUJo5k1q', '63wV9cgIGVC3zrSyGQY7D6zfEA6OO', 'a8mevYf3HBMlKmXoTAesZMFQ-wyCd', 'PUBLISHER', NULL, '2020-07-21 11:12:43.673+00', '2020-07-21 11:12:43.673+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('ItZpSdG9Y-xTFTTjNDqLkPe37VEQLE3O', '63wV9cgIGVC3zrSyGQY7D6zfEA6OO', 'lt-cTU-3lFR0Pf1HyZT2nF9mfOXr4', 'PUBLISHER', NULL, '2020-07-21 11:12:43.678+00', '2020-07-21 11:12:43.678+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('ZavzKc3___2WfeHU9SjIFh-E5K6h5Mk70', '63wV9cgIGVC3zrSyGQY7D6zfEA6OO', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'MODERATOR', NULL, '2020-07-21 11:12:43.703+00', '2020-07-21 11:12:43.703+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('LvPkZ1EhOE', NULL, 'Vkg7oFyyr3n5EIHTElnyUN8gUM4Dw', 'PUBLISHER', NULL, '2020-07-23 11:25:00.412+00', '2020-07-23 11:25:00.412+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('OQRuXsFp8X', 'M5zSDIVjQ', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'PUBLISHER', NULL, '2020-07-23 11:27:55.675+00', '2020-07-23 11:27:55.675+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('hEIBTO2xad', 'M5zSDIVjQ', 'Vkg7oFyyr3n5EIHTElnyUN8gUM4Dw', 'PUBLISHER', NULL, '2020-07-23 11:27:55.688+00', '2020-07-23 11:27:55.688+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('utveo-DibT', 'M5zSDIVjQ', 'Qd7ERkgo9JvttcTQJIgBgBxKO4F5n', 'PUBLISHER', NULL, '2020-07-23 11:27:55.691+00', '2020-07-23 11:27:55.691+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('ZoSLn-jzqa', 'M5zSDIVjQ', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'MODERATOR', NULL, '2020-07-23 11:27:55.703+00', '2020-07-23 11:27:55.703+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('i6nkW3kExX', '52B4s3tBD', 'x8Ib7mziN3', 'MODERATOR', NULL, '2020-07-31 11:09:49.305+00', '2020-07-31 11:09:49.305+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('LvNdR8m5X', '63wV9cgIGVC3zrSyGQY7D6zfEA6OO', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'MODERATOR', NULL, '2020-08-03 10:39:16.73+00', '2020-08-03 10:39:16.73+00');
INSERT INTO public."MeetingRoomMembers" (id, "meetingRoomId", "participantId", role, "deletedAt", "createdAt", "updatedAt") VALUES ('k0gMfCC0q', 'M5zSDIVjQ', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'MODERATOR', NULL, '2020-08-03 10:57:29.267+00', '2020-08-03 10:57:29.267+00');


--
-- Data for Name: MeetingRooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."MeetingRooms" (id, title, "createdAt", "updatedAt", "organizationId", "deletedAt", type) VALUES ('gvUSxXS4uTExlBMHnywxv8YFy87DO', '[Room] Class1-Stories', '2020-06-23 12:21:34.006+00', '2020-06-23 12:21:34.006+00', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', NULL, 'PRIVATE');
INSERT INTO public."MeetingRooms" (id, title, "createdAt", "updatedAt", "organizationId", "deletedAt", type) VALUES ('SoZcckPulH1_dXr1ElQcrNsEUQ7PR', '[Room] 12th-Chemistry', '2020-06-27 10:14:08.816+00', '2020-06-27 10:14:08.816+00', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', NULL, 'PRIVATE');
INSERT INTO public."MeetingRooms" (id, title, "createdAt", "updatedAt", "organizationId", "deletedAt", type) VALUES ('63wV9cgIGVC3zrSyGQY7D6zfEA6OO', '[Room] Class8-Mathematics', '2020-07-21 11:12:43.397+00', '2020-07-21 11:12:43.397+00', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', NULL, 'PRIVATE');
INSERT INTO public."MeetingRooms" (id, title, "createdAt", "updatedAt", "organizationId", "deletedAt", type) VALUES ('M5zSDIVjQ', '[Room] 4th-Mathematics', '2020-07-23 11:27:55.647+00', '2020-07-23 11:27:55.647+00', '2eVFJKef4-dYEK4V_8opP4msRCUQtj', NULL, 'PRIVATE');
INSERT INTO public."MeetingRooms" (id, title, "createdAt", "updatedAt", "organizationId", "deletedAt", type) VALUES ('52B4s3tBD', '[Room] Test', '2020-07-31 11:09:49.238+00', '2020-07-31 11:09:49.238+00', 'rlpmZ1JDEu', NULL, 'PRIVATE');


--
-- Data for Name: Meetings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('Z-OgvCcZwyUqWUKrEq8YECRt1aK62', 'ses_TumlfmI0tW', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'gvUSxXS4uTExlBMHnywxv8YFy87DO', 0, 'ENDED', NULL, '2020-06-23 12:21:35.571+00', '2020-06-27 09:27:09.475+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('KB0vNg440aVOwdLoVxlB2Poq2pGAo', 'ses_VONJO6h6vq', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'gvUSxXS4uTExlBMHnywxv8YFy87DO', 0, 'ENDED', NULL, '2020-06-27 09:45:16.521+00', '2020-06-27 10:06:10.226+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('rV4T_JktjV4y9VK30xUoCzWz5X5jg', 'ses_F00F5EcPUw', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'SoZcckPulH1_dXr1ElQcrNsEUQ7PR', 0, 'ENDED', NULL, '2020-06-27 10:14:09.939+00', '2020-06-29 06:39:47.191+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('z_zHIpuAuQ9v1FnJTJE6w56MPbfUJ', 'ses_QQsVRvRfJK', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'gvUSxXS4uTExlBMHnywxv8YFy87DO', 0, 'ENDED', NULL, '2020-07-07 08:00:11.212+00', '2020-07-07 08:21:01.245+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('i4QeQwMitmNE8HC6HuYdqC5koICwM', 'ses_SQJBtScIt6', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'gvUSxXS4uTExlBMHnywxv8YFy87DO', 0, 'ENDED', NULL, '2020-07-07 08:39:00.323+00', '2020-07-07 08:42:28.68+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('wWTqu7T1SGep-rNr6IOlHciPNxAK_s', 'ses_G6KhbVNFKR', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'SoZcckPulH1_dXr1ElQcrNsEUQ7PR', 0, 'ENDED', NULL, '2020-07-13 07:24:53.68+00', '2020-07-13 07:36:29.597+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('kJeapRLcAPg7t3pWR5Wm4Ljlzzkpv', 'ses_ZJqJQJav8v', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'SoZcckPulH1_dXr1ElQcrNsEUQ7PR', 0, 'ENDED', NULL, '2020-07-13 07:53:19.78+00', '2020-07-13 07:56:40.873+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('LrKaGfu7tn8wNRXTc0213Gp-nAtvp', 'ses_RuFIbzbpuy', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'gvUSxXS4uTExlBMHnywxv8YFy87DO', 0, 'ENDED', NULL, '2020-07-20 11:30:58.291+00', '2020-07-20 11:31:20.981+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('fOdkFi5bAxTCNm3GKYfJ5iE2m-YUfHHyr', 'ses_Tkk3txUZvW', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '63wV9cgIGVC3zrSyGQY7D6zfEA6OO', 0, 'ENDED', NULL, '2020-07-21 11:12:43.963+00', '2020-07-21 11:24:37.955+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('NZrjUItIr', 'ses_VqsCrdDhBj', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'gvUSxXS4uTExlBMHnywxv8YFy87DO', 0, 'ENDED', NULL, '2020-07-22 12:23:22.811+00', '2020-07-22 15:02:52.544+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('TtQpFWDMV', 'ses_FnxyDkAwn8', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'SoZcckPulH1_dXr1ElQcrNsEUQ7PR', 0, 'ENDED', NULL, '2020-07-22 11:39:54.822+00', '2020-07-23 06:04:06.211+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('XOp1amj92Z', 'ses_QrTdH9dwt1', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'M5zSDIVjQ', 0, 'ENDED', NULL, '2020-07-23 11:27:56.009+00', '2020-07-23 11:37:02.913+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('RRFJ85Lfw', 'ses_NdmHi6avWS', 'x8Ib7mziN3', '52B4s3tBD', 0, 'ENDED', NULL, '2020-07-31 11:14:56.918+00', '2020-07-31 11:15:44.112+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('Tk3R8Zoov', 'ses_RGY9cuaqp8', 'x8Ib7mziN3', '52B4s3tBD', 0, 'ENDED', NULL, '2020-07-31 11:19:29.551+00', '2020-07-31 11:19:50.85+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('jWf_wEyDPt', 'ses_GFAKmb5za6', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', '63wV9cgIGVC3zrSyGQY7D6zfEA6OO', 0, 'ENDED', NULL, '2020-08-03 10:39:16.921+00', '2020-08-03 10:41:27.228+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('Ebj4ECFz3z', 'ses_O4rfaAeZFi', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'M5zSDIVjQ', 0, 'ENDED', NULL, '2020-08-03 10:57:29.435+00', '2020-08-03 10:58:09.969+00', NULL);
INSERT INTO public."Meetings" (id, "sessionId", "hostId", "meetingRoomId", "numParticipants", status, "endedAt", "createdAt", "updatedAt", "deletedAt") VALUES ('z4npRHhG9', 'ses_BtgK4L8BKw', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'M5zSDIVjQ', 0, 'ENDED', NULL, '2020-08-08 06:23:31.043+00', '2020-08-08 06:25:23.24+00', NULL);


--
-- Data for Name: ModuleItems; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('WYxCtZ0wlV8kuNxawf3aVZLKm7eAW', 'Building Blocks', '{"blocks": [{"key": "c0pko", "data": {}, "text": "Building Blocks", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}', 'Page', 'Ys8axB4VtGrjCE-uLUk5s7SCL8RSN', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 18:32:57.934+00', NULL, '2020-06-18 19:18:07.785+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('Efwf6I6ziZ2LRqanFtpe1W9ZoSJGO', 'Maths Book', '{"blocks": [{"key": "4s29o", "data": {}, "text": "Book here", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}', 'Page', 'g9eiKI_x-4G2VhDCB4rnOdD5Ip7FA', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 18:30:32.696+00', NULL, '2020-06-18 19:18:07.786+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('A-ZdRhC372G7LyB-UZF4yP1SFFyoh', '1,2,3 Numbers', '{"blocks": [{"key": "7losc", "data": {}, "text": "dss", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}', 'Page', 'g9eiKI_x-4G2VhDCB4rnOdD5Ip7FA', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 18:31:23.042+00', NULL, '2020-06-18 19:18:07.787+00', 1);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('Lrh5OzgdtH1F8mGd_iuiKqJIHphPL', 'Story Book', '{"blocks": [{"key": "51j55", "data": {}, "text": "Log10 10.      X2", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "SUBSCRIPT", "length": 2, "offset": 3}, {"style": "SUPERSCRIPT", "length": 1, "offset": 16}]}, {"key": "2nt48", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "280jq", "data": {}, "text": "ローマ字", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "color-rgb(34,34,34)", "length": 4, "offset": 0}, {"style": "bgcolor-rgb(255,255,255)", "length": 4, "offset": 0}, {"style": "fontsize-16", "length": 4, "offset": 0}, {"style": "fontfamily-arial, sans-serif", "length": 4, "offset": 0}]}, {"key": "ett8v", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "7uti1", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 0, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "edds0", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "faf2v", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "182n8", "data": {}, "text": "This is the story books", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {"0": {"data": {"src": "https://drive.google.com/file/d/1hu95oAkaYC3Ef6pL6eQyR5QjlGJdUqN1/preview", "width": "1000", "height": "1000"}, "type": "EMBEDDED_LINK", "mutability": "MUTABLE"}}}', 'Page', 'KcbXM_2d6cemHcadQmtqtbKpHKox15', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 18:03:12.042+00', NULL, '2020-07-07 09:00:40.79+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('X1jWni6a89lRpaXbdOxLShrLC0trW', 'What is your Favorite Game?', '{"points": 1, "dueDate": "2020-06-18T18:33:25.182Z", "assignment": {"blocks": [{"key": "ar995", "data": {}, "text": "What is your Favourite Game?", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}, "availability": {"to": null, "from": "2020-06-18T18:33:25.182Z"}, "submissionType": ["Text Entry"], "submissionMedia": "Offline"}', 'Assignment', 'Ys8axB4VtGrjCE-uLUk5s7SCL8RSN', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 18:33:47.073+00', NULL, '2020-06-18 19:18:07.786+00', 2);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('BUmcZweLyFyD9pjIj8C9p5j8gfSVg', '123 Video', '{"blocks": [{"key": "c2q6h", "data": {}, "text": "f", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}', 'Page', 'g9eiKI_x-4G2VhDCB4rnOdD5Ip7FA', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 18:31:40.022+00', NULL, '2020-06-18 19:18:07.787+00', 2);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('7TphpWCLN21Ty05RVRs3isqq7MJyk', 'Assignment 1+1 = ?', '{"points": 1, "dueDate": "2020-06-18T18:31:47.386Z", "assignment": {"blocks": [{"key": "btks8", "data": {}, "text": "Assignment 1+1 = ?", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}, "availability": {"to": null, "from": "2020-06-18T18:31:47.386Z"}, "submissionType": ["Text Entry"], "submissionMedia": "Offline"}', 'Assignment', 'g9eiKI_x-4G2VhDCB4rnOdD5Ip7FA', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 18:32:02.587+00', NULL, '2020-06-18 19:18:07.787+00', 3);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('0C71eqFiYvV2DMa78UphJQiggfBbO', 'Contents', '{"blocks": [{"key": "aopn9", "data": {"text-align": "left"}, "text": "Contents", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "2e64a", "data": {}, "text": "Equal Triangles ", "type": "ordered-list-item", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 16, "offset": 0}, {"style": "color-rgb(41,105,176)", "length": 16, "offset": 0}]}, {"key": "cv9ro", "data": {}, "text": "Equations", "type": "ordered-list-item", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 9, "offset": 0}, {"style": "color-rgb(41,105,176)", "length": 9, "offset": 0}]}, {"key": "7saqf", "data": {}, "text": "Polygons ", "type": "ordered-list-item", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 9, "offset": 0}, {"style": "color-rgb(41,105,176)", "length": 9, "offset": 0}]}, {"key": "8ujq8", "data": {}, "text": "Identities", "type": "ordered-list-item", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 10, "offset": 0}, {"style": "color-rgb(41,105,176)", "length": 10, "offset": 0}]}, {"key": "77gf3", "data": {}, "text": "Money Maths", "type": "ordered-list-item", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 11, "offset": 0}, {"style": "color-rgb(41,105,176)", "length": 11, "offset": 0}]}, {"key": "5lmni", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "56l6a", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}', 'Page', 'FDjIvQ2vARmGJ3_-N1HHqEGrJFmLP', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 18:43:29.673+00', NULL, '2020-06-18 19:06:34.76+00', 1);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('YG8SWxbL9COydTcXcGRTWGCFTz95-', 'Mathematics Book', '{"blocks": [{"key": "9rv7v", "data": {"text-align": "center"}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "brg99", "data": {"text-align": "center"}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 0, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "67jc7", "data": {"text-align": "center"}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {"0": {"data": {"src": "https://drive.google.com/file/d/1o_ECjViyk8YXwdYZUJiJ8t9nF-4mTmrT/preview", "width": "1000", "height": "1000"}, "type": "EMBEDDED_LINK", "mutability": "MUTABLE"}}}', 'Page', 'FDjIvQ2vARmGJ3_-N1HHqEGrJFmLP', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 18:40:51.879+00', NULL, '2020-06-18 19:06:34.759+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('brfTflfHOWAdwAK9CjecS_nZzqWOY', 'Trigonometry', '{"blocks": [{"key": "6up8g", "data": {"text-align": "center"}, "text": "Trigonometry ", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "4ne59", "data": {}, "text": "The sine (sin) of an angle in a right triangle is a ratio. It is the length of the opposite leg (opp) divided by the length of the hypotenuse (hyp). The opposite leg is the side across from the specified angle and the hypotenuse is the side across from the right angle.", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 269, "offset": 0}]}, {"key": "3a6bh", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "4rfdg", "data": {}, "text": "You are looking for an exact answer, so see if 1/2 is the sine (sin) of an angle from a 30°-60°-90° special triangle or a 45°-45°-90° special triangle.", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 151, "offset": 0}]}, {"key": "62qtp", "data": {}, "text": "You can use the definition of sine and the following reference triangles to calculate the sines of 30°, 45° and 60°.", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 116, "offset": 0}]}, {"key": "955l4", "data": {}, "text": "Find sin30°", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 11, "offset": 0}]}, {"key": "97tm7", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "ej8dn", "data": {}, "text": "Illustration: ", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "BOLD", "length": 12, "offset": 0}, {"style": "fontsize-24", "length": 12, "offset": 0}, {"style": "UNDERLINE", "length": 12, "offset": 0}, {"style": "fontsize-18", "length": 2, "offset": 12}]}, {"key": "5u4ql", "data": {}, "text": "Find general solution of cos 3θ = sin 2θ. ", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 42, "offset": 0}]}, {"key": "6b2mf", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "bktm4", "data": {}, "text": "Solution: ", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "BOLD", "length": 8, "offset": 0}, {"style": "fontsize-24", "length": 8, "offset": 0}, {"style": "UNDERLINE", "length": 8, "offset": 0}, {"style": "fontsize-18", "length": 2, "offset": 8}]}, {"key": "f183n", "data": {}, "text": "This can be solved by 2 different ways.", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 39, "offset": 0}]}, {"key": "bs62h", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "9nif7", "data": {}, "text": "Method 1: ", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 10, "offset": 0}, {"style": "UNDERLINE", "length": 9, "offset": 0}, {"style": "BOLD", "length": 8, "offset": 0}, {"style": "color-rgb(41,105,176)", "length": 9, "offset": 0}]}, {"key": "1nr19", "data": {}, "text": "We can write the given equation as ", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 35, "offset": 0}]}, {"key": "2iejo", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "74rd7", "data": {}, "text": "cos 3θ = cos (π/2 - 2θ)", "type": "blockquote", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 23, "offset": 0}]}, {"key": "1m1m6", "data": {}, "text": "⇒ 3θ = 2nπ + (π/2 - 2θ), where n = 0, ±1, ±2 …… ", "type": "blockquote", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 48, "offset": 0}]}, {"key": "dledh", "data": {}, "text": "or 5θ = 2nπ + π/2 and also θ = 2nπ – π/2", "type": "blockquote", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 40, "offset": 0}]}, {"key": "3a1ua", "data": {}, "text": "or θ = (4n + 1) π/10 and           ", "type": "blockquote", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 35, "offset": 0}]}, {"key": "2d9v2", "data": {}, "text": "θ = (4n–1) π/2, where n ∈ I …… (A) ", "type": "blockquote", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 35, "offset": 0}]}, {"key": "14fe2", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "47qd0", "data": {}, "text": "Method 2: ", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 10, "offset": 0}, {"style": "UNDERLINE", "length": 9, "offset": 0}, {"style": "BOLD", "length": 10, "offset": 0}, {"style": "color-rgb(41,105,176)", "length": 10, "offset": 0}]}, {"key": "1g0l9", "data": {}, "text": "sin 2θ = sin (π/2 - 3θ)", "type": "blockquote", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 23, "offset": 0}]}, {"key": "1dohb", "data": {}, "text": "2θ = nπ + (–1)n (π/2 - 3θ). ", "type": "blockquote", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 28, "offset": 0}]}, {"key": "81pk2", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "7ja48", "data": {}, "text": "Case I: When n is even, n = 2m, where m = 0, ±1, ±2 ……", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 54, "offset": 0}, {"style": "ITALIC", "length": 6, "offset": 0}, {"style": "BOLD", "length": 6, "offset": 0}, {"style": "color-rgb(41,105,176)", "length": 8, "offset": 0}]}, {"key": "f67vn", "data": {}, "text": "2θ = 2mπ + π/2 - 3θ", "type": "code", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 19, "offset": 0}]}, {"key": "1rejl", "data": {}, "text": "θ = (4m+1)π/10, where m ∈ I ……. (B) ", "type": "code", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 36, "offset": 0}]}, {"key": "9quvj", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "3do5d", "data": {}, "text": "Case II: When n is odd, n = (2m + 1)", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 36, "offset": 0}, {"style": "ITALIC", "length": 7, "offset": 0}, {"style": "BOLD", "length": 7, "offset": 0}, {"style": "color-rgb(41,105,176)", "length": 8, "offset": 0}]}, {"key": "9vvmp", "data": {}, "text": "2θ = (2m+1)π – (π/2 - 3θ)", "type": "code", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 25, "offset": 0}]}, {"key": "7ol1m", "data": {}, "text": "θ = – (4m + 1) π/2, where m = 0, ±1, ±2 …… (B) ", "type": "code", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 47, "offset": 0}]}, {"key": "2ubbl", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "2m09c", "data": {}, "text": "Note: No doubt solutions obtained by both methods for odd values of n are different but as shown in the chart below, you can see that all possible values of θ are obtainable by both the given solutions:", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 202, "offset": 0}, {"style": "BOLD", "length": 4, "offset": 0}]}, {"key": "a3aeh", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "3s4tv", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}', 'Page', 'FDjIvQ2vARmGJ3_-N1HHqEGrJFmLP', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 18:59:50.207+00', NULL, '2020-06-18 19:06:34.76+00', 2);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('HO7rtKx0ZICkVYmELg8B9RMnMtc7Y', 'Triangle Quiz', '{"options": {"dueDate": null, "attempts": {"max": null, "multiple": false, "keepScore": "Highest"}, "questions": {"oneAtATime": false, "lockAfterAnswering": false}, "responses": {"show": false, "frequency": {"range": {"to": null, "from": null, "allow": false}, "onlyOnce": false}}, "timeLimit": {"allow": false, "minutes": null}, "availability": {"to": null, "from": null}, "restrictions": {"accessCode": {"code": null, "require": false}}, "shuffleAnswers": false}, "instructions": {"blocks": [{"key": "ek2pd", "data": {}, "text": "Qui", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}}', 'Quiz', 'FDjIvQ2vARmGJ3_-N1HHqEGrJFmLP', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 19:06:24.199+00', NULL, '2020-06-18 19:06:34.761+00', 3);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('CXbxQOIko1GHw5llZENxE22fmkO2o', 'Triangles', '{"blocks": [{"key": "b6auc", "data": {}, "text": "Triangles", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}', 'Page', 'x287mHWvyp4u28ctEPQnfrl7kYv9ow', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 19:04:43.712+00', NULL, '2020-06-18 19:06:34.781+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('pWHJJcAbROuUp2VHkH6QWDXW7KBiJ', 'Triangles Assignment', '{"points": 1, "dueDate": "2020-06-18T19:04:50.439Z", "assignment": {"blocks": [{"key": "26ffn", "data": {}, "text": "Triangles Assignment", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}, "availability": {"to": null, "from": "2020-06-18T19:04:50.439Z"}, "submissionType": ["Text Entry"], "submissionMedia": "Offline"}', 'Assignment', 'x287mHWvyp4u28ctEPQnfrl7kYv9ow', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 19:04:59.943+00', NULL, '2020-06-18 19:06:34.781+00', 1);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('H2yV6Mi5-qglUtuQX-wf5K8JehEB5', 'A,B,C', '{"blocks": [{"key": "3tltl", "data": {"text-align": "center"}, "text": "Apples", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "b8flk", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 0, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "31qi0", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "ermnh", "data": {"text-align": "center"}, "text": "Ball", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "cen5h", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 1, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "b3bbe", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "2i8nc", "data": {"text-align": "center"}, "text": "Cat", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "6lijb", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 2, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "b3hp1", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "df33t", "data": {"text-align": "center"}, "text": "Rat", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "4l4v7", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 3, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "58hel", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {"0": {"data": {"src": "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "width": "auto", "height": "auto"}, "type": "IMAGE", "mutability": "MUTABLE"}, "1": {"data": {"src": "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", "width": "auto", "height": "auto"}, "type": "IMAGE", "mutability": "MUTABLE"}, "2": {"data": {"src": "https://images.unsplash.com/photo-1549221987-25a490f65d34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", "width": "auto", "height": "auto"}, "type": "IMAGE", "mutability": "MUTABLE"}, "3": {"data": {"src": "https://images.unsplash.com/photo-1589878529898-e9dda9435263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60", "width": "auto", "height": "auto"}, "type": "IMAGE", "mutability": "MUTABLE"}}}', 'Page', 'KcbXM_2d6cemHcadQmtqtbKpHKox15', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 18:16:07.217+00', NULL, '2020-06-18 19:18:07.77+00', 1);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('YfQjdCyCXw_4vf3qky_ETDJNX-bHj', 'Balls', '{"blocks": [{"key": "fvk86", "data": {}, "text": "Ball", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}', 'Page', 'Ys8axB4VtGrjCE-uLUk5s7SCL8RSN', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 18:33:15.144+00', NULL, '2020-06-18 19:18:07.785+00', 1);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('OSf3hp3Dg1MH6o-RBY_3JptH95VNs', 'Hindi Learning', '{"blocks": [{"key": "aubjd", "data": {"text-align": "left"}, "text": "Hindi", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "bldpu", "data": {}, "text": "Question 1:", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-inherit", "length": 11, "offset": 0}, {"style": "fontfamily-inherit", "length": 11, "offset": 0}, {"style": "color-rgb(0,153,105)", "length": 11, "offset": 0}, {"style": "fontsize-18", "length": 11, "offset": 0}]}, {"key": "4nupr", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "71tpb", "data": {}, "text": "टायर", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "color-rgb(0,0,0)", "length": 4, "offset": 0}, {"style": "bgcolor-rgb(255,255,255)", "length": 4, "offset": 0}, {"style": "fontfamily-Calibri, sans-serif", "length": 4, "offset": 0}, {"style": "fontsize-18", "length": 4, "offset": 0}]}, {"key": "764q3", "data": {"text-align": "left"}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 0, "length": 1, "offset": 0}], "inlineStyleRanges": [{"style": "fontsize-18", "length": 1, "offset": 0}]}, {"key": "cv0ki", "data": {"text-align": "left"}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "e20k5", "data": {}, "text": "फाटक", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "color-rgb(0,0,0)", "length": 4, "offset": 0}, {"style": "bgcolor-rgb(255,255,255)", "length": 4, "offset": 0}, {"style": "fontfamily-Calibri, sans-serif", "length": 4, "offset": 0}, {"style": "fontsize-18", "length": 4, "offset": 0}]}, {"key": "etd42", "data": {"text-align": "left"}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 1, "length": 1, "offset": 0}], "inlineStyleRanges": [{"style": "fontsize-18", "length": 1, "offset": 0}]}, {"key": "b450v", "data": {"text-align": "left"}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "6ppto", "data": {}, "text": "झाड़ू", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "color-rgb(0,0,0)", "length": 5, "offset": 0}, {"style": "bgcolor-rgb(255,255,255)", "length": 5, "offset": 0}, {"style": "fontfamily-Calibri, sans-serif", "length": 5, "offset": 0}, {"style": "fontsize-18", "length": 5, "offset": 0}]}, {"key": "aiqqt", "data": {"text-align": "left"}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 2, "length": 1, "offset": 0}], "inlineStyleRanges": [{"style": "fontsize-18", "length": 1, "offset": 0}]}, {"key": "bbq83", "data": {"text-align": "left"}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "631c6", "data": {}, "text": "दरी", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "color-rgb(0,0,0)", "length": 3, "offset": 0}, {"style": "bgcolor-rgb(255,255,255)", "length": 3, "offset": 0}, {"style": "fontfamily-Calibri, sans-serif", "length": 3, "offset": 0}, {"style": "fontsize-18", "length": 3, "offset": 0}]}, {"key": "2uflk", "data": {"text-align": "left"}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 3, "length": 1, "offset": 0}], "inlineStyleRanges": [{"style": "fontsize-18", "length": 1, "offset": 0}]}, {"key": "11uem", "data": {"text-align": "left"}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "950cl", "data": {}, "text": "मेज़", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "color-rgb(0,0,0)", "length": 4, "offset": 0}, {"style": "bgcolor-rgb(255,255,255)", "length": 4, "offset": 0}, {"style": "fontfamily-Calibri, sans-serif", "length": 4, "offset": 0}, {"style": "fontsize-18", "length": 4, "offset": 0}]}, {"key": "332p6", "data": {"text-align": "left"}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 4, "length": 1, "offset": 0}], "inlineStyleRanges": [{"style": "fontsize-18", "length": 1, "offset": 0}]}, {"key": "a5afb", "data": {"text-align": "left"}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "57g3", "data": {"text-align": "left"}, "text": "Answer:", "type": "header-four", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-inherit", "length": 7, "offset": 0}, {"style": "fontfamily-inherit", "length": 7, "offset": 0}, {"style": "color-rgb(0,153,105)", "length": 7, "offset": 0}, {"style": "fontsize-18", "length": 7, "offset": 0}]}, {"key": "1hcb4", "data": {"text-align": "left"}, "text": "(क) टायर- टायर को हम रस्सी के सहारे पेड़ पर लटका सकते हैं और इसमें बैठकर झूल सकते हैं।", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-inherit", "length": 3, "offset": 0}, {"style": "fontsize-inherit", "length": 5, "offset": 4}, {"style": "fontsize-inherit", "length": 76, "offset": 10}, {"style": "fontfamily-inherit", "length": 3, "offset": 0}, {"style": "fontfamily-inherit", "length": 5, "offset": 4}, {"style": "fontfamily-inherit", "length": 76, "offset": 10}, {"style": "fontfamily-Roboto, sans-serif", "length": 3, "offset": 0}, {"style": "fontfamily-Roboto, sans-serif", "length": 5, "offset": 4}, {"style": "fontfamily-Roboto, sans-serif", "length": 76, "offset": 10}, {"style": "fontsize-18", "length": 86, "offset": 0}, {"style": "BOLD", "length": 5, "offset": 4}]}, {"key": "2qgck", "data": {"text-align": "left"}, "text": "फाटक- फाटक पर खड़े हो सकते हैं और फिर इसमें झूल सकते हैं।", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-inherit", "length": 5, "offset": 0}, {"style": "fontsize-inherit", "length": 51, "offset": 6}, {"style": "fontfamily-inherit", "length": 5, "offset": 0}, {"style": "fontfamily-inherit", "length": 51, "offset": 6}, {"style": "fontfamily-Roboto, sans-serif", "length": 5, "offset": 0}, {"style": "fontfamily-Roboto, sans-serif", "length": 51, "offset": 6}, {"style": "BOLD", "length": 5, "offset": 0}, {"style": "fontsize-18", "length": 57, "offset": 0}]}, {"key": "btk1d", "data": {"text-align": "left"}, "text": "डाली- डाली पर हम लटक सकते हैं या फिर इस पर रस्सी डालकर झूल सकते हैं।", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-inherit", "length": 5, "offset": 0}, {"style": "fontsize-inherit", "length": 62, "offset": 6}, {"style": "fontfamily-inherit", "length": 5, "offset": 0}, {"style": "fontfamily-inherit", "length": 62, "offset": 6}, {"style": "fontfamily-Roboto, sans-serif", "length": 5, "offset": 0}, {"style": "fontfamily-Roboto, sans-serif", "length": 62, "offset": 6}, {"style": "BOLD", "length": 5, "offset": 0}, {"style": "fontsize-18", "length": 68, "offset": 0}]}, {"key": "dq9rj", "data": {}, "text": "पैरों- पैरों पर बैठ सकते हैं और दूसरे का हाथ पकड़कर झूल सकते हैं।", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-inherit", "length": 6, "offset": 0}, {"style": "fontsize-inherit", "length": 58, "offset": 7}, {"style": "fontfamily-inherit", "length": 6, "offset": 0}, {"style": "fontfamily-inherit", "length": 58, "offset": 7}, {"style": "fontfamily-Roboto, sans-serif", "length": 6, "offset": 0}, {"style": "fontfamily-Roboto, sans-serif", "length": 58, "offset": 7}, {"style": "BOLD", "length": 6, "offset": 0}, {"style": "fontsize-18", "length": 65, "offset": 0}]}, {"key": "67dvr", "data": {"text-align": "left"}, "text": " ", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 1, "offset": 0}]}, {"key": "edv4p", "data": {"text-align": "left"}, "text": "(ख) मुझे फाटक पर झूलने में मज़ा आता है।", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-inherit", "length": 8, "offset": 0}, {"style": "fontsize-inherit", "length": 4, "offset": 9}, {"style": "fontsize-inherit", "length": 25, "offset": 14}, {"style": "fontfamily-inherit", "length": 8, "offset": 0}, {"style": "fontfamily-inherit", "length": 4, "offset": 9}, {"style": "fontfamily-inherit", "length": 25, "offset": 14}, {"style": "fontfamily-Roboto, sans-serif", "length": 8, "offset": 0}, {"style": "fontfamily-Roboto, sans-serif", "length": 4, "offset": 9}, {"style": "fontfamily-Roboto, sans-serif", "length": 25, "offset": 14}, {"style": "fontsize-18", "length": 39, "offset": 0}, {"style": "UNDERLINE", "length": 4, "offset": 9}]}, {"key": "9bd72", "data": {"text-align": "left"}, "text": "मुझे डाली पर झूलने में डर लगता है।", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-inherit", "length": 4, "offset": 0}, {"style": "fontsize-inherit", "length": 4, "offset": 5}, {"style": "fontsize-inherit", "length": 24, "offset": 10}, {"style": "fontfamily-inherit", "length": 4, "offset": 0}, {"style": "fontfamily-inherit", "length": 4, "offset": 5}, {"style": "fontfamily-inherit", "length": 24, "offset": 10}, {"style": "fontfamily-Roboto, sans-serif", "length": 4, "offset": 0}, {"style": "fontfamily-Roboto, sans-serif", "length": 4, "offset": 5}, {"style": "fontfamily-Roboto, sans-serif", "length": 24, "offset": 10}, {"style": "fontsize-18", "length": 34, "offset": 0}, {"style": "UNDERLINE", "length": 4, "offset": 5}]}, {"key": "6o6ae", "data": {"text-align": "left"}, "text": "मुझे फाटक पर झूलने पर डाँट पड़ती है।", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-inherit", "length": 4, "offset": 0}, {"style": "fontsize-inherit", "length": 4, "offset": 5}, {"style": "fontsize-inherit", "length": 26, "offset": 10}, {"style": "fontfamily-inherit", "length": 4, "offset": 0}, {"style": "fontfamily-inherit", "length": 4, "offset": 5}, {"style": "fontfamily-inherit", "length": 26, "offset": 10}, {"style": "fontfamily-Roboto, sans-serif", "length": 4, "offset": 0}, {"style": "fontfamily-Roboto, sans-serif", "length": 4, "offset": 5}, {"style": "fontfamily-Roboto, sans-serif", "length": 26, "offset": 10}, {"style": "fontsize-18", "length": 36, "offset": 0}, {"style": "UNDERLINE", "length": 4, "offset": 5}]}, {"key": "2l8u3", "data": {"text-align": "left"}, "text": " ", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-18", "length": 1, "offset": 0}]}], "entityMap": {"0": {"data": {"alt": "", "src": "https://img-nm.mnimgs.com/img/study_content/editlive_ncert/75/2013_04_12_15_50_41/tyre.png", "_map": {"data": {"alt": "", "src": "https://img-nm.mnimgs.com/img/study_content/editlive_ncert/75/2013_04_12_15_50_41/tyre.png", "width": "", "height": "auto"}, "type": "IMAGE", "mutability": "MUTABLE"}, "width": "", "height": "auto", "alignment": "left"}, "type": "IMAGE", "mutability": "MUTABLE"}, "1": {"data": {"alt": "", "src": "https://img-nm.mnimgs.com/img/study_content/editlive_ncert/75/2013_04_12_15_50_41/gate.png", "_map": {"data": {"alt": "", "src": "https://img-nm.mnimgs.com/img/study_content/editlive_ncert/75/2013_04_12_15_50_41/gate.png", "width": "", "height": "auto"}, "type": "IMAGE", "mutability": "MUTABLE"}, "width": "", "height": "auto", "alignment": "left"}, "type": "IMAGE", "mutability": "MUTABLE"}, "2": {"data": {"alt": "", "src": "https://img-nm.mnimgs.com/img/study_content/editlive_ncert/75/2013_04_12_15_50_41/broom.png", "_map": {"data": {"alt": "", "src": "https://img-nm.mnimgs.com/img/study_content/editlive_ncert/75/2013_04_12_15_50_41/broom.png", "width": "", "height": "auto"}, "type": "IMAGE", "mutability": "MUTABLE"}, "width": "", "height": "auto", "alignment": "left"}, "type": "IMAGE", "mutability": "MUTABLE"}, "3": {"data": {"alt": "", "src": "https://img-nm.mnimgs.com/img/study_content/editlive_ncert/75/2013_04_12_15_50_41/carpet.png", "_map": {"data": {"alt": "", "src": "https://img-nm.mnimgs.com/img/study_content/editlive_ncert/75/2013_04_12_15_50_41/carpet.png", "width": "", "height": "auto"}, "type": "IMAGE", "mutability": "MUTABLE"}, "width": "", "height": "auto", "alignment": "left"}, "type": "IMAGE", "mutability": "MUTABLE"}, "4": {"data": {"alt": "", "src": "https://img-nm.mnimgs.com/img/study_content/editlive_ncert/75/2013_04_12_15_50_41/table.png", "_map": {"data": {"alt": "", "src": "https://img-nm.mnimgs.com/img/study_content/editlive_ncert/75/2013_04_12_15_50_41/table.png", "width": "", "height": "auto"}, "type": "IMAGE", "mutability": "MUTABLE"}, "width": "", "height": "auto", "alignment": "left"}, "type": "IMAGE", "mutability": "MUTABLE"}}}', 'Page', 'KcbXM_2d6cemHcadQmtqtbKpHKox15', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 19:17:58.805+00', NULL, '2020-06-18 19:19:26.19+00', 3);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('MdDcFNzixOBQzus4qf69dz7zP_5N3', 'ABC Song', '{"blocks": [{"key": "e26da", "data": {"text-align": "center"}, "text": "ABC Song", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "6mlqu", "data": {"text-align": "center"}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 0, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "e96hh", "data": {"text-align": "center"}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "8b1nq", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {"0": {"data": {"src": "https://www.youtube.com/embed/Nkmarl4ynRM", "width": "952", "height": "535.5"}, "type": "EMBEDDED_LINK", "mutability": "MUTABLE"}}}', 'Page', 'KcbXM_2d6cemHcadQmtqtbKpHKox15', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 18:27:20.923+00', NULL, '2020-06-18 19:18:07.77+00', 2);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('T8u3QZh4aSI4TKmZRWflSd05Ws4xZ', 'Assignment - Tell a Story', '{"points": 1, "dueDate": "2020-06-18T18:34:05.939Z", "assignment": {"blocks": [{"key": "4a2lq", "data": {}, "text": "Hi Everyone,", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "4cfl1", "data": {}, "text": "Please tell me a story in 5 minutes. 😀", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}, "availability": {"to": null, "from": "2020-06-18T18:34:05.939Z"}, "submissionType": ["Text Entry"], "submissionMedia": "Offline"}', 'Assignment', 'KcbXM_2d6cemHcadQmtqtbKpHKox15', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-18 18:35:02.471+00', NULL, '2020-06-18 19:18:07.771+00', 4);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('I6C_gnzeTE163Z3b0UCCSlmyfFAXF', 'Chemistry Assignment', '{"points": 10, "dueDate": "2020-06-29T09:55:55.000Z", "assignment": {"blocks": [{"key": "c20fo", "data": {}, "text": "fgdsfg", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}, "availability": {"to": "2020-07-03T18:30:00.000Z", "from": "2020-06-27T09:55:55.769Z"}, "submissionType": ["Text Entry", "File Upload", "Website URL"], "submissionMedia": "online"}', 'Assignment', 'gs7pjLeZC1MGPF5R5gzqvWfhTKEkhn', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-27 09:57:06.388+00', NULL, '2020-06-27 10:01:31.19+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('TP8lWhsezMxfzRsymNCu9ax5X-5G2', 'Untitled Page', '{"blocks": [{"key": "d2tfi", "data": {"text-align": "center"}, "text": "Heading", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "65phd", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "dlll0", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 0, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "8fgcd", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "90ect", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 1, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "e7or4", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "850j", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "4d55r", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 2, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "958im", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "a5gnf", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "b875f", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {"0": {"data": {"src": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png", "width": "auto", "height": "auto", "alignment": "none"}, "type": "IMAGE", "mutability": "MUTABLE"}, "1": {"data": {"src": "https://www.youtube.com/embed/hj-Mojs8XDM", "width": "840", "height": "472.5"}, "type": "EMBEDDED_LINK", "mutability": "MUTABLE"}, "2": {"data": {"src": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", "width": "1000", "height": "1000"}, "type": "EMBEDDED_LINK", "mutability": "MUTABLE"}}}', 'Page', 'gs7pjLeZC1MGPF5R5gzqvWfhTKEkhn', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-27 09:55:44.917+00', NULL, '2020-06-27 10:01:31.191+00', 1);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('SfN2QREvcci5E3RpVc9N8-Q260ma4', 'Final Quiz', '{"options": {"dueDate": null, "attempts": {"max": null, "multiple": false, "keepScore": "Highest"}, "questions": {"oneAtATime": false, "lockAfterAnswering": false}, "responses": {"show": false, "frequency": {"range": {"to": null, "from": null, "allow": false}, "onlyOnce": false}}, "timeLimit": {"allow": false, "minutes": null}, "availability": {"to": null, "from": null}, "restrictions": {"accessCode": {"code": null, "require": false}}, "shuffleAnswers": false}, "instructions": {"blocks": [{"key": "2v5mu", "data": {}, "text": "fhgsadjhfj", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}}', 'Quiz', 'gs7pjLeZC1MGPF5R5gzqvWfhTKEkhn', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-06-27 10:00:20.068+00', NULL, '2020-06-27 10:01:31.191+00', 2);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('6o1dAN6hk8iyLgdkZUJrAS4lVQQqt', 'Mathematics Quiz', '{"options": {"dueDate": null, "attempts": {"max": null, "multiple": false, "keepScore": "Highest"}, "questions": {"oneAtATime": false, "lockAfterAnswering": false}, "responses": {"show": false, "frequency": {"range": {"to": null, "from": null, "allow": false}, "onlyOnce": false}}, "timeLimit": {"allow": false, "minutes": null}, "availability": {"to": null, "from": null}, "restrictions": {"accessCode": {"code": null, "require": false}}, "shuffleAnswers": false}, "instructions": {"blocks": [{"key": "3hasb", "data": {}, "text": "This is Quiz 1", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}}', 'Quiz', 'CLS1dayIohYSfBNIEZso_mOW2MUsn', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', '2020-07-07 07:53:32.226+00', NULL, '2020-07-07 07:53:32.226+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('9v_RuPfioOIv5Q1OzowsqpPPOAqjg', 'Traingle Quiz', '{"options": {"dueDate": "2020-07-23T18:30:00.000Z", "attempts": {"max": null, "multiple": false, "keepScore": "Highest"}, "questions": {"oneAtATime": false, "lockAfterAnswering": false}, "responses": {"show": false, "frequency": {"range": {"to": null, "from": null, "allow": false}, "onlyOnce": false}}, "timeLimit": {"allow": true, "minutes": 1}, "availability": {"to": "2020-07-30T18:30:00.000Z", "from": null}, "restrictions": {"accessCode": {"code": null, "require": false}}, "shuffleAnswers": false}, "instructions": {"blocks": [{"key": "5cfsh", "data": {}, "text": "Triaggle", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}}', 'Quiz', 'x287mHWvyp4u28ctEPQnfrl7kYv9ow', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-07-21 11:31:47.17+00', NULL, '2020-07-21 11:31:47.17+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('DcUdO6RxHJWzJIjtwn8zWcxK9xH-b', 'Untitled Page1', '{"blocks": [{"key": "6ruq", "data": {}, "text": "ಬ್ರಾಹ್ಮಿ ಲಿಪಿಯಿಂದ ಬೆಳೆದು ಬಂದಿದೆ. ಇದನ್ನು ಸ್ವರಗಳು, ಅನುಸ್ವಾರ, ವಿಸರ್ಗ, ವ್ಯಂಜನಗಳು, ಅವರ್ಗೀಯ ವ್ಯಂಜನಗಳೆಂದು ವಿಭಾಗಿಸಲಾಗಿದೆ. ಕನ್ನಡ ಅಕ್ಷರಮಾಲೆಯನ್ನು ಕನ್ನಡ ವರ್ಣಮಾಲೆಯೆಂದು ಕರೆಯಲಾಗುತ್ತದೆ. ನಾವು ಮಾತನಾಡುವ ಮಾತುಗಳೆಲ್ಲ ವಾಕ್ಯ ವಾಕ್ಯಗಳಾಗಿರುತ್ತವೆ. ವಾಕ್ಯಗಳು ಪದಗಳಿಂದ ಕೂಡಿರುತ್ತವೆ. ಪದಗಳು ಅಕ್ಷರಗಳಿಂದ ಕೂಡಿರುತ್ತವೆ. ಉದಾಹರಣೆಗೆ, ನಾನು ಶಾಲೆಗೆ ಹೋಗಿ ಬರುವೆನು. ಈ ವಾಕ್ಯದಲ್ಲಿ ನಾನು, ಶಾಲೆಗೆ, ಹೋಗಿ, ಬರುವೆನು, ಹೀಗೆ ನಾಲ್ಕು ಪದಗಳಿವೆ. ಒಂದೊಂದು ಪದದಲ್ಲೂ ಹಲವು ಅಕ್ಷರಗಳಿವೆ. ನಾನು ಎಂಬ ಪದದಲ್ಲಿ ನ್+ಆ+ನ್+ಉ ಎಂಬ ಧ್ವನಿಮಾ ವ್ಯವಸ್ಥೆಯ ಬೇರೆ ಬೇರೆ ಅಕ್ಷರಗಳಿವೆ. ಹೀಗೆ ಕನ್ನಡ ಭಾಷೆಯನ್ನು ಮಾತನಾಡುವಾಗ ಬಳಸುವ ಅಕ್ಷರಗಳ ಮಾಲೆಗೆ ವರ್ಣಮಾಲೆ ಅಥವಾ ಅಕ್ಷರಮಾಲೆ ಎಂದು ಕರೆಯುತ್ತೇವೆ.", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-24", "length": 578, "offset": 0}]}], "entityMap": {}}', 'Page', 'gs7pjLeZC1MGPF5R5gzqvWfhTKEkhn', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-07-07 08:34:06.537+00', NULL, '2020-07-07 08:34:06.537+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('HCZD7mr_nSO6Mj0zUtUyo-Sw03hIM', 'Untitled Page', '{"blocks": [{"key": "fu811", "data": {}, "text": "", "type": "code", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "lt7v", "data": {}, "text": "", "type": "code", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "b5ih2", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "e3gnq", "data": {}, "text": "hdfvgdfsgsd", "type": "unordered-list-item", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "5rkqa", "data": {}, "text": "sdfhgsfdgfsd", "type": "unordered-list-item", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "32qdb", "data": {}, "text": "gfsddsgfdsgfds", "type": "unordered-list-item", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "blfu9", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "6higp", "data": {}, "text": "fgsahdjkashk", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "9et88", "data": {}, "text": "asdhjkashdkjask", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "5p1vd", "data": {}, "text": "sdfbdsk", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "59ko7", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}', 'Page', 'KcbXM_2d6cemHcadQmtqtbKpHKox15', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', '2020-07-07 08:47:27.835+00', NULL, '2020-07-07 08:47:27.835+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('_qlREJlqtvjRZGEhxkz_jzxXfmOql', 'mathematics book', '{"blocks": [{"key": "68pig", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "5uu83", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 0, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "k90n", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {"0": {"data": {"src": "http://www.thebookcollector.co.uk/sites/default/files/the-book-collector-example-2018-04.pdf", "width": "1000", "height": "1000"}, "type": "EMBEDDED_LINK", "mutability": "MUTABLE"}}}', 'Page', 'gs7pjLeZC1MGPF5R5gzqvWfhTKEkhn', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-07-07 08:58:24.071+00', NULL, '2020-07-07 08:58:24.071+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('PF4UIQ_f5pMyCS1PaebJtoFYdisFV', 'Organic Chemitry', '{"blocks": [{"key": "5buhu", "data": {"text-align": "center"}, "text": "", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "7bek4", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "2osg4", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 0, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "aer91", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {"0": {"data": {"src": "http://conorlastowka.com/book/CitationNeededBook-Sample.pdf", "width": "1000", "height": "1000"}, "type": "EMBEDDED_LINK", "mutability": "MUTABLE"}}}', 'Page', 'gs7pjLeZC1MGPF5R5gzqvWfhTKEkhn', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', '2020-07-13 07:44:00.753+00', NULL, '2020-07-13 07:44:00.753+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('Blp0I1BknjVD1UlpwmLMoOBGiQNYg', 'Triangles Assignment - 2', '{"points": 10, "dueDate": "2020-07-23T11:25:44.000Z", "assignment": {"blocks": [{"key": "8i1a0", "data": {}, "text": "hfshjdjksajkfjkbdahfj", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "ekeov", "data": {}, "text": "gzfdgag", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "fabe7", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "8qs0t", "data": {}, "text": "zgdf", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "8uta7", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}, "availability": {"to": "2020-07-30T18:30:00.000Z", "from": "2020-07-21T11:25:44.668Z"}, "submissionType": ["Text Entry", "File Upload"], "submissionMedia": "online"}', 'Assignment', 'x287mHWvyp4u28ctEPQnfrl7kYv9ow', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-07-21 11:26:51.774+00', NULL, '2020-07-21 11:26:51.774+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('WTEfV8xOD', 'youtube', '{"blocks": [{"key": "eomna", "data": {}, "text": "https://youtu.be/W-VInHvlrZo ", "type": "unstyled", "depth": 0, "entityRanges": [{"key": 0, "length": 28, "offset": 0}], "inlineStyleRanges": []}], "entityMap": {"0": {"data": {"url": "https://youtu.be/W-VInHvlrZo", "targetOption": "_self"}, "type": "LINK", "mutability": "MUTABLE"}}}', 'Page', 'KcbXM_2d6cemHcadQmtqtbKpHKox15', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', '2020-07-22 12:20:47.455+00', NULL, '2020-07-22 12:20:47.455+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('6LTa2xR1t', 'Introduction Page', '{"blocks": [{"key": "bqv62", "data": {"text-align": "center"}, "text": "vhd", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "BOLD", "length": 3, "offset": 0}]}, {"key": "fjpg0", "data": {}, "text": "😛", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "BOLD", "length": 1, "offset": 0}]}, {"key": "31uva", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 0, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "dgde4", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "4kil5", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "1q7b1", "data": {}, "text": "gfgzd", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "ITALIC", "length": 5, "offset": 0}, {"style": "UNDERLINE", "length": 5, "offset": 0}, {"style": "STRIKETHROUGH", "length": 5, "offset": 0}, {"style": "CODE", "length": 5, "offset": 0}]}, {"key": "61pmi", "data": {}, "text": "gzfz", "type": "unordered-list-item", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-24", "length": 4, "offset": 0}, {"style": "color-rgb(226,80,65)", "length": 4, "offset": 0}, {"style": "bgcolor-rgb(247,218,100)", "length": 4, "offset": 0}]}, {"key": "1mdm0", "data": {}, "text": "gzfg", "type": "unordered-list-item", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-24", "length": 4, "offset": 0}, {"style": "color-rgb(226,80,65)", "length": 4, "offset": 0}, {"style": "bgcolor-rgb(247,218,100)", "length": 4, "offset": 0}]}, {"key": "7stbu", "data": {}, "text": "1010", "type": "unordered-list-item", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "fontsize-24", "length": 4, "offset": 0}, {"style": "color-rgb(226,80,65)", "length": 4, "offset": 0}, {"style": "bgcolor-rgb(247,218,100)", "length": 4, "offset": 0}, {"style": "SUPERSCRIPT", "length": 2, "offset": 2}]}, {"key": "74l9a", "data": {}, "text": "log1010", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": [{"style": "SUBSCRIPT", "length": 2, "offset": 3}]}, {"key": "4sgl6", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "eedhf", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 1, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "gkm5", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "r8e1", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "6hbk8", "data": {}, "text": " ", "type": "atomic", "depth": 0, "entityRanges": [{"key": 2, "length": 1, "offset": 0}], "inlineStyleRanges": []}, {"key": "f3vv4", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {"0": {"data": {"src": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png", "width": "auto", "height": "auto"}, "type": "IMAGE", "mutability": "MUTABLE"}, "1": {"data": {"src": "https://www.youtube.com/embed/jA-mMO8Xeb0", "width": "560", "height": "315"}, "type": "EMBEDDED_LINK", "mutability": "MUTABLE"}, "2": {"data": {"src": "https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf", "width": "1000", "height": "1000"}, "type": "EMBEDDED_LINK", "mutability": "MUTABLE"}}}', 'Page', 'aUtl8Uvt4x', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-07-23 11:16:54.698+00', NULL, '2020-07-23 11:16:54.698+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('HpFZ6CY_M', 'Explain Algebra in 10 sentences ', '{"points": 10, "dueDate": "2020-07-24T11:18:26.000Z", "assignment": {"blocks": [{"key": "9289j", "data": {}, "text": "Explain Algebra in 10 sentences ", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "5vkop", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}, "availability": {"to": "2020-07-31T18:30:00.000Z", "from": "2020-07-23T11:18:26.131Z"}, "submissionType": ["Text Entry", "File Upload"], "submissionMedia": "online"}', 'Assignment', 'aUtl8Uvt4x', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', '2020-07-23 11:19:38.706+00', NULL, '2020-07-23 11:19:38.706+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('A-mg6tBU8', 'Algebra Assignment 10', '{"points": 10, "dueDate": "2020-08-04T10:48:16.000Z", "assignment": {"blocks": [{"key": "17e3u", "data": {}, "text": "ghfasjhkjfjkcs", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}, "availability": {"to": "2020-08-14T18:30:00.000Z", "from": "2020-08-03T10:48:16.757Z"}, "submissionType": ["Text Entry", "File Upload"], "submissionMedia": "online"}', 'Assignment', 'x287mHWvyp4u28ctEPQnfrl7kYv9ow', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', '2020-08-03 10:49:10.016+00', NULL, '2020-08-03 10:49:10.016+00', 0);
INSERT INTO public."ModuleItems" (id, title, content, type, "moduleId", "createdBy", "createdAt", "deletedAt", "updatedAt", "order") VALUES ('Qmm4wSZJK', 'Unnamed Quiz', '{"options": {"dueDate": "2020-08-04T18:30:00.000Z", "attempts": {"max": null, "multiple": false, "keepScore": "Highest"}, "questions": {"oneAtATime": false, "lockAfterAnswering": false}, "responses": {"show": false, "frequency": {"range": {"to": null, "from": null, "allow": false}, "onlyOnce": false}}, "timeLimit": {"allow": false, "minutes": null}, "availability": {"to": "2020-08-14T18:30:00.000Z", "from": null}, "restrictions": {"accessCode": {"code": null, "require": false}}, "shuffleAnswers": false}, "instructions": {"blocks": [{"key": "51vpe", "data": {}, "text": "fdnkjhk", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}}', 'Quiz', 'x287mHWvyp4u28ctEPQnfrl7kYv9ow', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', '2020-08-03 10:52:02.426+00', NULL, '2020-08-03 10:52:02.426+00', 0);


--
-- Data for Name: Modules; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('iuFeL9eeCD9mZA2oiYEZ2nDe3FsWi5', NULL, 'Introduction', 'BKFk2FwRM4yTKkRTIN_3fPPWOsQHD', NULL, '2020-06-16 15:24:44.745+00', '2020-06-16 15:24:44.745+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('RiupnYE_CIZ2nYKgIzhiTLMdsUiLIV', NULL, 'Algebra', 'BKFk2FwRM4yTKkRTIN_3fPPWOsQHD', NULL, '2020-06-16 15:24:44.746+00', '2020-06-16 15:24:44.746+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('wQYxW1aSR26Y8Rs9MbJuBcQSBNzyOe', NULL, 'Integration', 'BKFk2FwRM4yTKkRTIN_3fPPWOsQHD', NULL, '2020-06-16 15:24:44.746+00', '2020-06-16 15:24:44.746+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('xhNFbkHsFp1fzd_Gmn8vEH8cHBtF6U', NULL, 'Differentiation', 'BKFk2FwRM4yTKkRTIN_3fPPWOsQHD', NULL, '2020-06-16 15:24:44.746+00', '2020-06-16 15:24:44.746+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('qxIoWFoqVWOkOIWoTS-ay26roal1rvto', NULL, 'Summary', 'BKFk2FwRM4yTKkRTIN_3fPPWOsQHD', NULL, '2020-06-16 15:24:44.746+00', '2020-06-16 15:24:44.746+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('YfjnK5WcPwYkNY9jYTsJixHlR4AS8t', NULL, 'Centres of Power', 'vMd69laes5ulJFmgTsi1TIfKNFiAO', NULL, '2020-06-16 15:29:38.947+00', '2020-06-16 15:29:38.947+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('OpW0AwZIZ6cHxsAh0-Bf8zOU0zos3p', NULL, 'Era of Exchanges', 'vMd69laes5ulJFmgTsi1TIfKNFiAO', NULL, '2020-06-16 15:29:38.947+00', '2020-06-16 15:29:38.947+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('OMsd8UtzVLA5sF3igJwoXCjBjMI5VV', NULL, 'Medieval India', 'vMd69laes5ulJFmgTsi1TIfKNFiAO', NULL, '2020-06-16 15:29:38.948+00', '2020-06-16 15:29:38.948+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('O1Apd9YdBh08DGX8Bvh8QQjhEDBrlU', NULL, 'Indian Constitution ', 'vMd69laes5ulJFmgTsi1TIfKNFiAO', NULL, '2020-06-16 15:29:38.948+00', '2020-06-16 15:29:38.948+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('frmfpbECQBhNmvBUNETQvno3e9fpdn3J', NULL, 'Society and Economy', 'vMd69laes5ulJFmgTsi1TIfKNFiAO', NULL, '2020-06-16 15:29:38.948+00', '2020-06-16 15:29:38.948+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('ZQBG3DdLXxyzUrLVKhfoWhxJtIo_bz', NULL, 'Effects of Electric Current', 'TH3henM3ZTShjjO2FkTCt0POjjXoe', NULL, '2020-06-16 15:34:03.484+00', '2020-06-16 15:34:03.484+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('05ubMiQWGVMO4CwYv_7DtwV3KOKYXp', NULL, 'Magnetic Effect of Electric Current', 'TH3henM3ZTShjjO2FkTCt0POjjXoe', NULL, '2020-06-16 15:34:03.49+00', '2020-06-16 15:34:03.49+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('Hu7uA8B-1idnpuuMuGjMOZXF2OrBDX', NULL, 'Electromagnetic Induction', 'TH3henM3ZTShjjO2FkTCt0POjjXoe', NULL, '2020-06-16 15:34:03.491+00', '2020-06-16 15:34:03.491+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('DJTpc_HFdV1ABaCQp3GoGe4pynAZWi', NULL, 'Reflection of Light', 'TH3henM3ZTShjjO2FkTCt0POjjXoe', NULL, '2020-06-16 15:34:03.491+00', '2020-06-16 15:34:03.491+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('8aV6AnYR2s2CWdmiBEEe6nf4KL3bMmjb', NULL, 'Electronics', 'TH3henM3ZTShjjO2FkTCt0POjjXoe', NULL, '2020-06-16 15:34:03.491+00', '2020-06-16 15:34:03.491+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('ni2E0Y3kIiLpTtXLPWsnxSS7SRswT', NULL, 'Introduction', 'TH3henM3ZTShjjO2FkTCt0POjjXoe', '2020-06-16 15:34:51.821+00', '2020-06-16 15:34:35.659+00', '2020-06-16 15:34:35.659+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('KbDKkLyqgPGHNCVDkzQ3afd2yz0NP', NULL, 'Summary', 'TH3henM3ZTShjjO2FkTCt0POjjXoe', NULL, '2020-06-16 15:35:21.409+00', '2020-06-16 15:35:21.409+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('I6tN1xwq2k9emp0L_Yudzh9FSXaVP', NULL, 'PERIODIC TABLE AND ELECTRONIC CONFIGURATION', 'KEclH4anaq5g5UoX3Wd6dVTSFBdEr', NULL, '2020-06-16 15:38:36.066+00', '2020-06-16 15:38:36.066+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('ISVKrn6KAUDf1Jk2nue0FCH6KVzPjM', NULL, 'GAS LAWS AND MOLE CONCEPT', 'KEclH4anaq5g5UoX3Wd6dVTSFBdEr', NULL, '2020-06-16 15:38:36.066+00', '2020-06-16 15:38:36.066+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('15Ox8ZFl2Ci70bAL5-2eeFW3sGi_Ze', NULL, 'REACTIVITY SERIES AND ELECTROCHEMISTRY', 'KEclH4anaq5g5UoX3Wd6dVTSFBdEr', NULL, '2020-06-16 15:38:36.066+00', '2020-06-16 15:38:36.066+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('1p_Q2n93cgWNz9_bAFfLK9wOcEgWsO', NULL, 'PRODUCTION OF METALS', 'KEclH4anaq5g5UoX3Wd6dVTSFBdEr', NULL, '2020-06-16 15:38:36.066+00', '2020-06-16 15:38:36.066+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('v2BFzuyf0zyWIZiMV3fmMPaYAL__WM', NULL, 'ORGANIC CHEMISTRY', 'KEclH4anaq5g5UoX3Wd6dVTSFBdEr', NULL, '2020-06-16 15:38:36.066+00', '2020-06-16 15:38:36.066+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('D7ybk0NgvEhIHOBXbQeIyWqnUX89C', NULL, 'Nature''s Plenty', '-bJHrkiRGciXaVlLb4b9G-6Wk3sUB', NULL, '2020-06-16 15:42:16.177+00', '2020-06-16 15:42:16.177+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('-00J8uosEeh5Cna2eLjpvkw1blGWWs', NULL, 'Tales and Tunes', '-bJHrkiRGciXaVlLb4b9G-6Wk3sUB', NULL, '2020-06-16 15:42:16.177+00', '2020-06-16 15:42:16.177+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('3SA20U29Ck9oPY_5oo_8TqJ-uz1KsE', NULL, 'Man and Media', '-bJHrkiRGciXaVlLb4b9G-6Wk3sUB', NULL, '2020-06-16 15:42:16.177+00', '2020-06-16 15:42:16.177+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('dX8J0vr_Q91szU_hIOcZN_F7ReScpY', NULL, 'Summary', '-bJHrkiRGciXaVlLb4b9G-6Wk3sUB', NULL, '2020-06-16 15:42:16.177+00', '2020-06-16 15:42:16.177+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('RLLTpN9A2oqNCsn5dPcgBk791f0pbZx2', NULL, 'Summary', 'Pkj3LNIbXAcz0oo2OMKGtqTXas7av', NULL, '2020-06-27 09:48:23.63+00', '2020-06-27 10:01:31.172+00', 2);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('QLXIh95gy91aBWGHf1lcAW3IhcRs6W', NULL, 'Plastics', 'Pkj3LNIbXAcz0oo2OMKGtqTXas7av', NULL, '2020-06-27 09:48:23.63+00', '2020-06-27 10:01:31.172+00', 3);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('6a9hJaNAraEOxY-tFbHm9b3pJxVazm', NULL, 'Polimers', 'Pkj3LNIbXAcz0oo2OMKGtqTXas7av', NULL, '2020-06-27 09:48:23.63+00', '2020-06-27 10:01:31.172+00', 4);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('FDjIvQ2vARmGJ3_-N1HHqEGrJFmLP', NULL, 'Introduction', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', NULL, '2020-06-18 18:37:32.231+00', '2020-06-18 19:06:34.742+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('x287mHWvyp4u28ctEPQnfrl7kYv9ow', NULL, 'Equal Triangles ', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', NULL, '2020-06-16 15:32:27.19+00', '2020-06-18 19:06:34.743+00', 1);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('XvXw9jsCnA7USCZSzCzCXoGA1z_ERz', NULL, 'Polygons', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', NULL, '2020-06-16 15:32:27.19+00', '2020-06-18 19:06:34.744+00', 3);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('THmdI6RcHLv_ewD8XJ0CYU5G5FYIPp', NULL, 'Identities', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', NULL, '2020-06-16 15:32:27.191+00', '2020-06-18 19:06:34.744+00', 4);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('1775I15RB8CUIQKpE7WesJIQLdjpKa', NULL, 'Equations', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', NULL, '2020-06-16 15:32:27.19+00', '2020-06-18 19:06:34.743+00', 2);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('3lDNYcsAPUL1POujeo6DfAJ1h922mfBh', NULL, 'Money Maths', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', NULL, '2020-06-16 15:32:27.191+00', '2020-06-18 19:06:34.744+00', 5);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('KcbXM_2d6cemHcadQmtqtbKpHKox15', NULL, 'Stories', 'bBWTPTlFG3AkvUoTAa15reoLqrq6T', NULL, '2020-06-16 15:56:59.874+00', '2020-06-18 19:18:07.756+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('g9eiKI_x-4G2VhDCB4rnOdD5Ip7FA', NULL, 'Mathematics', 'bBWTPTlFG3AkvUoTAa15reoLqrq6T', NULL, '2020-06-18 18:22:20.12+00', '2020-06-18 19:18:07.756+00', 1);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('Ys8axB4VtGrjCE-uLUk5s7SCL8RSN', NULL, 'Games', 'bBWTPTlFG3AkvUoTAa15reoLqrq6T', NULL, '2020-06-18 18:32:39.946+00', '2020-06-18 19:18:07.757+00', 2);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('eEx5dxScy0uex9fXOpg2IOSQTAKkx', NULL, 'chandamama stories', 'bBWTPTlFG3AkvUoTAa15reoLqrq6T', NULL, '2020-06-23 12:10:36.198+00', '2020-06-23 12:10:36.198+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('l97vQDzN9WcLPFFWu0zo9HtsQdqOc', NULL, 'Final Assignment', 'Pkj3LNIbXAcz0oo2OMKGtqTXas7av', NULL, '2020-06-27 10:01:11.733+00', '2020-06-27 10:01:31.173+00', 5);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('CLS1dayIohYSfBNIEZso_mOW2MUsn', NULL, 'Home Works', 'bBWTPTlFG3AkvUoTAa15reoLqrq6T', NULL, '2020-07-07 07:46:38.684+00', '2020-07-07 07:46:38.684+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('hXAk-XlB_4t05bRoywwUqxQQ15pvO', NULL, 'Organic Chemistry-Part 2', 'Pkj3LNIbXAcz0oo2OMKGtqTXas7av', NULL, '2020-07-07 09:08:21.994+00', '2020-07-07 09:08:21.994+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('-z6Ac8s3Nx', NULL, 'Algebra', 'bxISQK3fR', NULL, '2020-07-23 11:07:12.454+00', '2020-07-23 11:07:12.454+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('Cw_SNxMnnJ', NULL, 'Integrations', 'bxISQK3fR', NULL, '2020-07-23 11:07:12.454+00', '2020-07-23 11:07:12.454+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('ueZ2j-7FE', NULL, 'Differentiation', 'bxISQK3fR', NULL, '2020-07-23 11:10:48.131+00', '2020-07-23 11:10:48.131+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('aUtl8Uvt4x', NULL, 'Introduction1', 'bxISQK3fR', NULL, '2020-07-23 11:07:12.453+00', '2020-07-23 11:11:03.114+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('gs7pjLeZC1MGPF5R5gzqvWfhTKEkhn', NULL, 'Introduction', 'Pkj3LNIbXAcz0oo2OMKGtqTXas7av', NULL, '2020-06-27 09:48:23.63+00', '2020-06-27 10:01:31.171+00', 0);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('Fnl9P5XzlVyPpiaoYakHvfpW1HlDbR', NULL, 'Organic Chemistry', 'Pkj3LNIbXAcz0oo2OMKGtqTXas7av', NULL, '2020-06-27 09:48:23.63+00', '2020-06-27 10:01:31.171+00', 1);
INSERT INTO public."Modules" (id, description, title, "courseId", "deletedAt", "createdAt", "updatedAt", "order") VALUES ('WTp8JgP-xU', NULL, 'intro', '6q-1AQUKQ', NULL, '2020-07-31 11:09:45.021+00', '2020-07-31 11:09:45.021+00', 0);


--
-- Data for Name: Organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Organizations" (id, name, description, "createdAt", "updatedAt", "deletedAt", icon, link, "darkThemeIcon") VALUES ('0000000000000000000000', '__ROOT__', 'The default organization for the application. A user from this organization can access all other organizations', '2020-06-16 14:47:29.595+00', '2020-06-16 14:47:29.595+00', NULL, '', '', '');
INSERT INTO public."Organizations" (id, name, description, "createdAt", "updatedAt", "deletedAt", icon, link, "darkThemeIcon") VALUES ('2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'Demo School', '', '2020-06-16 14:47:50.959+00', '2020-06-16 14:47:50.959+00', NULL, 'https://edudoor-logos.s3.ap-south-1.amazonaws.com/demo-school/logo.png', 'https://demo-school.edudoor.org', 'https://res.cloudinary.com/dldhztrbs/image/upload/v1573674362/Edudoor/edudoor_white.png');
INSERT INTO public."Organizations" (id, name, description, "createdAt", "updatedAt", "deletedAt", icon, link, "darkThemeIcon") VALUES ('rlpmZ1JDEu', 'Doorward E-Learning', '', '2020-07-31 11:03:53.758+00', '2020-07-31 11:03:53.758+00', NULL, 'https://doorward.s3.amazonaws.com/logos/download1.png', 'https://demo-school.doorward.tech', 'https://res.cloudinary.com/dldhztrbs/image/upload/v1573674362/Doorward/doorward_white.png');


--
-- Data for Name: PasswordResets; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."PasswordResets" (id, token, "userId", "createdAt", "deletedAt", "updatedAt") VALUES ('Nerx5-aMEKIlr1c3_EuPYftEV-4zzE', '7eTQvkZ0YLZi3FQ2ROTxDFu6AMVHxLK3KdHzYVWncxOjDnGyPK', 'yYbZhjT0oguJYsbUWv4xnL74NL5lp', '2020-06-16 15:00:07.735+00', '2020-06-16 15:01:10.8+00', '2020-06-16 15:01:10.8+00');
INSERT INTO public."PasswordResets" (id, token, "userId", "createdAt", "deletedAt", "updatedAt") VALUES ('4iV31bfQnOnQoYgZYVw4yi7JuK8Wi6', 'JynlnwBIKHeRLevYcLbpoGQUA1XZamuVU8JK72Pdg2u3m6tsXj', '1JLVW-khdz9J842Inrri0IbDLxORh', '2020-06-16 15:00:40.885+00', '2020-06-16 15:01:24.099+00', '2020-06-16 15:01:24.099+00');
INSERT INTO public."PasswordResets" (id, token, "userId", "createdAt", "deletedAt", "updatedAt") VALUES ('YTXZ4IEbcXIZetOJfg_bEUo-X3GIKh', '3z6cu9dpp1IpaYBqMSs9KzeSh9ZDkcN5926gz3oP7flxFoSuV5', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', '2020-06-16 14:59:47.983+00', '2020-06-16 15:01:58.864+00', '2020-06-16 15:01:58.864+00');


--
-- Data for Name: Questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Questions" (id, question, "createdAt", points, "quizId", "updatedAt", "deletedAt") VALUES ('1AxCZtsKAPNyFPBDDXm6g7B8F1BPwx', '{"blocks":[{"key":"7rqe6","text":"Q1","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', '2020-06-18 19:06:24.21+00', 1, 'HO7rtKx0ZICkVYmELg8B9RMnMtc7Y', '2020-06-18 19:06:24.21+00', NULL);
INSERT INTO public."Questions" (id, question, "createdAt", points, "quizId", "updatedAt", "deletedAt") VALUES ('0iOQKDvrMqUXxHdjbq4cAoL9Db6lGD', '{"blocks":[{"key":"cte3l","text":"Q2","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', '2020-06-18 19:06:24.21+00', 1, 'HO7rtKx0ZICkVYmELg8B9RMnMtc7Y', '2020-06-18 19:06:24.21+00', NULL);
INSERT INTO public."Questions" (id, question, "createdAt", points, "quizId", "updatedAt", "deletedAt") VALUES ('vWZhGt_7jgwPW8JjuLKhY2te-GfsQF', '{"blocks":[{"key":"5e0hc","text":"Q1","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', '2020-06-27 10:00:20.075+00', 1, 'SfN2QREvcci5E3RpVc9N8-Q260ma4', '2020-06-27 10:00:20.075+00', NULL);
INSERT INTO public."Questions" (id, question, "createdAt", points, "quizId", "updatedAt", "deletedAt") VALUES ('BCq6ysaO65eNMYe_Vq7a3-_bAm6Rij', '{"blocks":[{"key":"lnk","text":"What is algebra?  ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"BOLD"},{"offset":0,"length":18,"style":"ITALIC"},{"offset":0,"length":18,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"dg8ij","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b2si5","text":"Click here ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":10,"style":"BOLD"},{"offset":0,"length":10,"style":"ITALIC"},{"offset":0,"length":10,"style":"UNDERLINE"}],"entityRanges":[{"offset":0,"length":10,"key":0}],"data":{}},{"key":"7icvl","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f566v","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ct78h","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":1}],"data":{}},{"key":"b6bi5","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://www.google.com/","targetOption":"_self"}},"1":{"type":"EMBEDDED_LINK","mutability":"MUTABLE","data":{"src":"https://www.youtube.com/embed/8Xti7JCQi9o","height":"315","width":"560"}}}}', '2020-07-07 07:53:32.234+00', 1, '6o1dAN6hk8iyLgdkZUJrAS4lVQQqt', '2020-07-07 07:53:32.234+00', NULL);
INSERT INTO public."Questions" (id, question, "createdAt", points, "quizId", "updatedAt", "deletedAt") VALUES ('yCON65tG0MwyIp3ADqDh2DmXfa3XuO', '{"blocks":[{"key":"7dh7o","text":"Second questions?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', '2020-07-07 07:53:32.234+00', 1, '6o1dAN6hk8iyLgdkZUJrAS4lVQQqt', '2020-07-07 07:53:32.234+00', NULL);
INSERT INTO public."Questions" (id, question, "createdAt", points, "quizId", "updatedAt", "deletedAt") VALUES ('rTZr1LRASmSL6VBOD6KV7kYIoYgOFj', '{"blocks":[{"key":"f5ljf","text":"First Question","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', '2020-07-21 11:31:47.178+00', 1, '9v_RuPfioOIv5Q1OzowsqpPPOAqjg', '2020-07-21 11:31:47.178+00', NULL);
INSERT INTO public."Questions" (id, question, "createdAt", points, "quizId", "updatedAt", "deletedAt") VALUES ('iRRzyzerEAD09ENJUj4WfArF9hioes', '{"blocks":[{"key":"6e6ti","text":"Ques2","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', '2020-07-21 11:31:47.178+00', 1, '9v_RuPfioOIv5Q1OzowsqpPPOAqjg', '2020-07-21 11:31:47.178+00', NULL);
INSERT INTO public."Questions" (id, question, "createdAt", points, "quizId", "updatedAt", "deletedAt") VALUES ('_Y4hTDb5yK', '{"blocks":[{"key":"dp0tb","text":"First Q","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', '2020-08-03 10:52:02.448+00', 1, 'Qmm4wSZJK', '2020-08-03 10:52:02.448+00', NULL);
INSERT INTO public."Questions" (id, question, "createdAt", points, "quizId", "updatedAt", "deletedAt") VALUES ('xqWGV2c9Bl', '{"blocks":[{"key":"cap9q","text":"Q 2","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}', '2020-08-03 10:52:02.449+00', 1, 'Qmm4wSZJK', '2020-08-03 10:52:02.449+00', NULL);


--
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Roles" (id, name, description, "organizationId", "createdAt", "updatedAt", "deletedAt") VALUES ('fBGV-63Vq28wqq6jRKU8YIJITGh5l', 'Super Administrator', 'The system administrator who is responsible for all functions in the application', '0000000000000000000000', '2020-06-16 14:47:29.916+00', '2020-06-16 14:47:29.916+00', NULL);
INSERT INTO public."Roles" (id, name, description, "organizationId", "createdAt", "updatedAt", "deletedAt") VALUES ('hNlfS81SMUyaEaICwSaex9ugPo3xVO', 'Teacher', 'A user who can manage courses, modules and other resources', '0000000000000000000000', '2020-06-16 14:47:29.916+00', '2020-06-16 14:47:29.916+00', NULL);
INSERT INTO public."Roles" (id, name, description, "organizationId", "createdAt", "updatedAt", "deletedAt") VALUES ('VSAcO2HEdBU1YYZGTfeek3LVCcR0kO', 'Student', 'A learner in the system', '0000000000000000000000', '2020-06-16 14:47:29.916+00', '2020-06-16 14:47:29.916+00', NULL);


--
-- Data for Name: Schools; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: SequelizeData; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."SequelizeData" (name) VALUES ('20191029143016-create-default-organization.js');
INSERT INTO public."SequelizeData" (name) VALUES ('20191029143535-create-default-users.js');
INSERT INTO public."SequelizeData" (name) VALUES ('20191029143652-create-default-roles.js');
INSERT INTO public."SequelizeData" (name) VALUES ('20191029144131-create-default-user-roles.js');


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."SequelizeMeta" (name) VALUES ('20191027142256-create-organization.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191028184408-create-user.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191029140822-create-role.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191029141008-create-user-roles.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191029205902-create-course.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191029210935-create-module.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191102145629-create-student-courses.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191110102935-create-module-item.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191113183753-create-password-resets.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191201045240-create-question.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191201045755-create-answer.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191204065726-add-order-to-modules.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191212191750-create-meeting-rooms.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191212281739-update-meeting-rooms.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191222061417-create-meeting-room-members.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191222065642-create-meeting.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20191222083708-add-meeting-room-id-to-course.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20200113184924-create-group.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20200113185146-create-group-member.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20200114074451-add-organization-id.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20200207192352-add-organization-fields.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20200223070832-create-file.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20200223165209-create-assignment-submission.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20200418181255-create-school.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20200418181434-create-classroom.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20200428193824-add-organization-fields.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20200429145354-remove-uniqueness-from-table-contraints.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20200507184215-update-meeting-room-type.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20200521051952-end-all-meetings.js');
INSERT INTO public."SequelizeMeta" (name) VALUES ('20200613035347-add-course-managers.js');


--
-- Data for Name: StudentCourses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('lSmtF1sA_IlmtJOIiyeLK0MXas4W4', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', 'PENDING', '2020-06-18 19:07:01.6+00', NULL, '2020-06-18 19:07:01.6+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('OmXwN40uFDONoNcn9gPCvfgZXDbo1I', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', 'PENDING', '2020-06-18 19:07:01.619+00', NULL, '2020-06-18 19:07:01.619+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('IHSOLJlkfh0EV5RHQZTMIFrSU8c0Lm', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', 'PENDING', '2020-06-18 19:07:01.622+00', NULL, '2020-06-18 19:07:01.622+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('cireKugweXkjZQQ6Fni_CbxZtxElcd', 'lt-cTU-3lFR0Pf1HyZT2nF9mfOXr4', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', 'PENDING', '2020-06-18 19:07:01.625+00', NULL, '2020-06-18 19:07:01.625+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('w7QLyv00I-74cL5axnWqZ6A_SdzHNI', 'a8mevYf3HBMlKmXoTAesZMFQ-wyCd', 'TL0dZhg48FzaupA70ydo0pEtrKS3L', 'PENDING', '2020-06-18 19:07:01.624+00', NULL, '2020-06-18 19:07:01.624+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('4H64L1PkpfI2qhHfI90d_TMlF5l0H', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'bBWTPTlFG3AkvUoTAa15reoLqrq6T', 'PENDING', '2020-06-18 19:08:05.504+00', NULL, '2020-06-18 19:08:05.504+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('bzWSblDz0rxjNQVjKrKcFs5GL6tEtf', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'bBWTPTlFG3AkvUoTAa15reoLqrq6T', 'PENDING', '2020-06-18 19:08:05.521+00', NULL, '2020-06-18 19:08:05.521+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('nfN0EnzPSWSRpJjyl6mpgm3egcMQ-2', 'Qd7ERkgo9JvttcTQJIgBgBxKO4F5n', 'bBWTPTlFG3AkvUoTAa15reoLqrq6T', 'PENDING', '2020-06-18 19:08:05.522+00', NULL, '2020-06-18 19:08:05.522+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('aslfo1ARAHmZLk-k9yW8S79E_mTWbs', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'bBWTPTlFG3AkvUoTAa15reoLqrq6T', 'PENDING', '2020-06-18 19:08:05.527+00', NULL, '2020-06-18 19:08:05.527+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('PnejWvfKbOXvqFe4GPQmjBtRHR4gX', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'Pkj3LNIbXAcz0oo2OMKGtqTXas7av', 'PENDING', '2020-06-27 09:51:23.096+00', NULL, '2020-06-27 09:51:23.096+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('e0OeMbPB7HUKb98txq8lZSB1yz6Df8', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'Pkj3LNIbXAcz0oo2OMKGtqTXas7av', 'PENDING', '2020-06-27 09:51:23.111+00', NULL, '2020-06-27 09:51:23.111+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('M1nl_XjZZYayxR-ANsyRAPX21Lepm-', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'Pkj3LNIbXAcz0oo2OMKGtqTXas7av', 'PENDING', '2020-06-27 09:51:23.125+00', NULL, '2020-06-27 09:51:23.125+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('GcoxTrqhUaDComEtJxbpmJgAEZa1RI', 'a8mevYf3HBMlKmXoTAesZMFQ-wyCd', 'Pkj3LNIbXAcz0oo2OMKGtqTXas7av', 'PENDING', '2020-06-27 09:51:23.131+00', NULL, '2020-06-27 09:51:23.131+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('jk3XSgLu5HMgqTdVxUq1PciLIT76U', 'lt-cTU-3lFR0Pf1HyZT2nF9mfOXr4', 'bBWTPTlFG3AkvUoTAa15reoLqrq6T', 'PENDING', '2020-07-07 08:25:47.763+00', NULL, '2020-07-07 08:25:47.763+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('m1ihQ7gZRKpk-4czADO4u5TyHezlHi', '2OlY7Txw7N-Npy4Wl-SgOokHV5we2', 'bBWTPTlFG3AkvUoTAa15reoLqrq6T', 'PENDING', '2020-07-07 08:25:47.768+00', NULL, '2020-07-07 08:25:47.768+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('s1U7e0gWS', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'bxISQK3fR', 'PENDING', '2020-07-23 11:25:00.306+00', NULL, '2020-07-23 11:25:00.306+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('hrdM8T_a7o', 'Vkg7oFyyr3n5EIHTElnyUN8gUM4Dw', 'bxISQK3fR', 'PENDING', '2020-07-23 11:25:00.32+00', NULL, '2020-07-23 11:25:00.32+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('i70yqSTnn1', 'Qd7ERkgo9JvttcTQJIgBgBxKO4F5n', 'bxISQK3fR', 'PENDING', '2020-07-23 11:25:00.318+00', NULL, '2020-07-23 11:25:00.318+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('d3onyXH8U', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'KEclH4anaq5g5UoX3Wd6dVTSFBdEr', 'PENDING', '2020-08-03 10:55:49.429+00', NULL, '2020-08-03 10:55:49.429+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('pIcFIlO8l9', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'KEclH4anaq5g5UoX3Wd6dVTSFBdEr', 'PENDING', '2020-08-03 10:55:49.445+00', NULL, '2020-08-03 10:55:49.445+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('ZQSSP5_lTu', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'KEclH4anaq5g5UoX3Wd6dVTSFBdEr', 'PENDING', '2020-08-03 10:55:49.445+00', NULL, '2020-08-03 10:55:49.445+00');
INSERT INTO public."StudentCourses" (id, "studentId", "courseId", status, "createdAt", "deletedAt", "updatedAt") VALUES ('XQMINnq5z8', 'lt-cTU-3lFR0Pf1HyZT2nF9mfOXr4', 'KEclH4anaq5g5UoX3Wd6dVTSFBdEr', 'PENDING', '2020-08-03 10:55:49.449+00', NULL, '2020-08-03 10:55:49.449+00');


--
-- Data for Name: UserRoles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('juNacoS6kkLwVD4ebdoFN440g_14LX', '00000000000000000000', 'fBGV-63Vq28wqq6jRKU8YIJITGh5l', '2020-06-16 14:47:29.941+00', '2020-06-16 14:47:29.941+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('cB0ugZgqroEQOBswQplXEaJ6WUqXtS', 'HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'fBGV-63Vq28wqq6jRKU8YIJITGh5l', '2020-06-16 14:47:51.103+00', '2020-06-16 14:47:51.103+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('26KwD74_wGQEe-OiVNvJgUat3ouuwU', 'QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'hNlfS81SMUyaEaICwSaex9ugPo3xVO', '2020-06-16 14:59:47.976+00', '2020-06-16 14:59:47.976+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('2MHZcorZ9sHjH_VyUpBRqFmee0_rG8', 'yYbZhjT0oguJYsbUWv4xnL74NL5lp', 'hNlfS81SMUyaEaICwSaex9ugPo3xVO', '2020-06-16 15:00:07.728+00', '2020-06-16 15:00:07.728+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('_9zNfeUTDMhJFJaz1MEIgsG_l0sWAD', '1JLVW-khdz9J842Inrri0IbDLxORh', 'hNlfS81SMUyaEaICwSaex9ugPo3xVO', '2020-06-16 15:00:40.879+00', '2020-06-16 15:00:40.879+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('naW5sTb0ApK2Ex6DTHU0O0hE6NZUT7', 'MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'VSAcO2HEdBU1YYZGTfeek3LVCcR0kO', '2020-06-16 15:05:03.986+00', '2020-06-16 15:05:03.986+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('NpWcopwHMIzTufbbwd3vkfFCmN9f1E', 'BY4jkewWDm_ynvn1ZB2E_yQkJ-xYQ', 'VSAcO2HEdBU1YYZGTfeek3LVCcR0kO', '2020-06-16 15:05:24.958+00', '2020-06-16 15:05:24.958+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('2WtCNPfKqLFr0_KC4yaGGuLpm4GF_P', 'W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'VSAcO2HEdBU1YYZGTfeek3LVCcR0kO', '2020-06-16 15:05:46.082+00', '2020-06-16 15:05:46.082+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('k5dNA5_a7LGXo6aIpmiPpaJAt_5SPw', 'Qd7ERkgo9JvttcTQJIgBgBxKO4F5n', 'VSAcO2HEdBU1YYZGTfeek3LVCcR0kO', '2020-06-16 15:06:02.858+00', '2020-06-16 15:06:02.858+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('feECoZmHqH6qAnGtVqV71qKhwuRqW', 'lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'VSAcO2HEdBU1YYZGTfeek3LVCcR0kO', '2020-06-16 15:06:22.071+00', '2020-06-16 15:06:22.071+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('RqviN0G2idvZhAz6_puSrPwF-9guGl', 'a8mevYf3HBMlKmXoTAesZMFQ-wyCd', 'VSAcO2HEdBU1YYZGTfeek3LVCcR0kO', '2020-06-16 15:07:01.476+00', '2020-06-16 15:07:01.476+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('eIA0JYbIbNChU9VBq9IPOWCcKwHHXb', 'lt-cTU-3lFR0Pf1HyZT2nF9mfOXr4', 'VSAcO2HEdBU1YYZGTfeek3LVCcR0kO', '2020-06-16 15:08:29.845+00', '2020-06-16 15:08:29.845+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('MZ9pmA3lEhGnJL_P9iWg_f5VLgGsrA', 'Vkg7oFyyr3n5EIHTElnyUN8gUM4Dw', 'VSAcO2HEdBU1YYZGTfeek3LVCcR0kO', '2020-06-16 15:10:46.294+00', '2020-06-16 15:10:46.294+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('m5qEE6S4OsuWXINftrqX81eL1boaqf', '2OlY7Txw7N-Npy4Wl-SgOokHV5we2', 'VSAcO2HEdBU1YYZGTfeek3LVCcR0kO', '2020-07-07 08:22:46.572+00', '2020-07-07 08:22:46.572+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('Hre-wscZyQxfXE5Fd4ySxSugIeoHwV', 'tSXqFNK8SCmCqt6l6NkTtIxOq0fU6', 'hNlfS81SMUyaEaICwSaex9ugPo3xVO', '2020-07-07 08:29:01.838+00', '2020-07-07 08:29:01.838+00', NULL);
INSERT INTO public."UserRoles" (id, "userId", "roleId", "createdAt", "updatedAt", "deletedAt") VALUES ('MpiYnBK7Nw', 'x8Ib7mziN3', 'fBGV-63Vq28wqq6jRKU8YIJITGh5l', '2020-07-31 11:03:53.918+00', '2020-07-31 11:03:53.918+00', NULL);


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('00000000000000000000', 'administrator', '$2b$10$5zR5uCk9cE9uPxhmYhZdxezpM8aeE8ebCa76qww6Zczmuft7EQIMW', NULL, NULL, 'gitaumoses4@gmail.com', NULL, NULL, NULL, NULL, '0000000000000000000000', 'ACTIVE_NOT_DELETABLE', '2020-06-16 14:47:29.84+00', '2020-06-16 14:47:29.84+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('HbA0IiWqZ3FpYo7YJHrUtWHW1uTca', 'administrator', '$2b$10$//1j1f6wpOYqrz3XITe.LeY9qPC6nyawYDhCRuoI5C0hAmYLeCCoG', 'Moses', 'Gitau', 'gitaumoses4@gmail.com', NULL, NULL, NULL, NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'ACTIVE_NOT_DELETABLE', '2020-06-16 14:47:51.09+00', '2020-06-16 14:47:51.09+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('yYbZhjT0oguJYsbUWv4xnL74NL5lp', 'teacher2', '$2b$10$kLtQ96erxjZj0CPSi6AW4.dMWEMdD9v1VM.MAXfX67G/VMqLCm9we', 'Teacher2', 'T', 'info@edudoor.org', NULL, '', '', NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'PENDING', '2020-06-16 15:00:07.718+00', '2020-06-16 15:01:10.788+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('1JLVW-khdz9J842Inrri0IbDLxORh', 'teacher3', '$2b$10$pOuXdGC27C.4WQn.q8CmHOIb7s4WZ42GtPX.f/itKiydsZGIEO5p6', 'Teacher3', 'T', 'basil@edudoor.org', NULL, '', '', NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'PENDING', '2020-06-16 15:00:40.866+00', '2020-06-16 15:01:24.091+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('QLJ-SXCDYQh7JrW2AM6JqYhzOZU-v', 'teacher1', '$2b$10$h6d6foJm7CqzQ3GAW6WCS.egDR0z7HULqjx42z4tdVNMghYh1iD4a', 'Teacher1', 'T', 'basil@doorward.tech', NULL, '', '', NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'PENDING', '2020-06-16 14:59:47.712+00', '2020-06-16 15:01:58.848+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('MXoiL6WX4opBVCPGPybx8uw7dZj2v', 'student1', '$2b$10$cjGUzDm7Vby5vd13whJFnex/NAqRckGbxUkmwaECRSpVvqThhVO3C', 'Student1', 'S', 'student1@gmail.com', NULL, '', '', NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'PENDING', '2020-06-16 15:05:03.974+00', '2020-06-16 15:05:03.974+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('BY4jkewWDm_ynvn1ZB2E_yQkJ-xYQ', 'student2', '$2b$10$6PeQyluoa6J/PTi66fPFKuTTWFCvQac/0vptgRA1kSPl95olkCeo2', 'Student2', 'S', 'student2@gmail.com', NULL, '', '', NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'PENDING', '2020-06-16 15:05:24.947+00', '2020-06-16 15:05:24.947+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('W4m6cLoGlT_tF33ZjPVhFe5L0-3Sb', 'student3', '$2b$10$c7RP.lAFjRsoxuQKzDILqeLzVMwZELSQgg0H0D44mJd61tpZkahOq', 'Student3', 'S', 'student3@gmail.com', NULL, '', '', NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'PENDING', '2020-06-16 15:05:46.068+00', '2020-06-16 15:05:46.068+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('Qd7ERkgo9JvttcTQJIgBgBxKO4F5n', 'student4', '$2b$10$DePyhPaVprTJacv4BLYfaelkEE2xoWw5gk05kcDkY8oQu79NfdWS6', 'Student4', 'S', 'student4@gmail.com', NULL, '', '', NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'PENDING', '2020-06-16 15:06:02.848+00', '2020-06-16 15:06:02.848+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('lgnEDLkhHt01wWwzVMg5f1LkL52-C', 'student5', '$2b$10$ZTITNqcgM/mODiXqp4JLsOIBBgwx8G9k/zkkcG8uR8Nf07Zwf0ha.', 'Student5', 'S', 'student5@gmail.com', NULL, '', '', NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'PENDING', '2020-06-16 15:06:22.06+00', '2020-06-16 15:06:22.06+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('a8mevYf3HBMlKmXoTAesZMFQ-wyCd', 'student6', '$2b$10$UB3WRpLADuYGk5nXzitn3.TCxirpZFncebc7KxxAsaR/yCzfUR6/m', 'Student6', 'S', 'student6@gmail.com', NULL, '', '', NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'PENDING', '2020-06-16 15:07:01.466+00', '2020-06-16 15:07:01.466+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('lt-cTU-3lFR0Pf1HyZT2nF9mfOXr4', 'student7', '$2b$10$sHXY5lghLQQaq8JH0aTp1OWrbbSfAzqozAe63RVpKvD..W8PtFulG', 'Student7', 'S', 'student7@gmail.com', NULL, '', '', NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'PENDING', '2020-06-16 15:08:29.582+00', '2020-06-16 15:08:29.582+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('Vkg7oFyyr3n5EIHTElnyUN8gUM4Dw', 'student8', '$2b$10$3IRbApZmK2UUkcp6TB/awOuCncLyXbniceI7fjHFYv.h9crCN6RNS', 'Student8', 'S', 'student8@gmail.com', NULL, '', '', NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'PENDING', '2020-06-16 15:10:46.285+00', '2020-06-16 15:10:46.285+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('2OlY7Txw7N-Npy4Wl-SgOokHV5we2', 'rajesh', '$2b$10$ZCRIVFJRWDz74bWNFVhruumOeH27WnPo6sMRz2S9X.q4M4si/N9BO', 'Rajesh', 'R', 'trajesh@gmail.com', NULL, '', '', NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'PENDING', '2020-07-07 08:22:46.562+00', '2020-07-07 08:22:46.562+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('tSXqFNK8SCmCqt6l6NkTtIxOq0fU6', 'teacher10', '$2b$10$/ua3.W5/DDCJzIg0ZMR.PO524diMbiNswXUlUIXIZ8t6b5Km3BJdi', 'teacher10', 'T', 'teacher10@gmail.com', NULL, '', '', NULL, '2eVFJKef4-dYEK4V_8opP4msRCUQtj', 'PENDING', '2020-07-07 08:29:01.823+00', '2020-07-07 08:29:01.823+00', NULL);
INSERT INTO public."Users" (id, username, password, "firstName", "lastName", email, "zipCode", country, city, gender, "organizationId", status, "createdAt", "updatedAt", "deletedAt") VALUES ('x8Ib7mziN3', 'administrator', '$2b$10$jI/f8r9codH7Vxk/L/QKR.jL9K7OktK2.EggJbzkR5hQj5qF5pasS', 'admin', 'user', 'gitaumoses4@gmail.com', NULL, NULL, NULL, NULL, 'rlpmZ1JDEu', 'ACTIVE_NOT_DELETABLE', '2020-07-31 11:03:53.898+00', '2020-07-31 11:03:53.898+00', NULL);


--
-- Name: Answers Answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answers"
    ADD CONSTRAINT "Answers_pkey" PRIMARY KEY (id);


--
-- Name: AssignmentSubmissions AssignmentSubmissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AssignmentSubmissions"
    ADD CONSTRAINT "AssignmentSubmissions_pkey" PRIMARY KEY (id);


--
-- Name: Classrooms Classrooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Classrooms"
    ADD CONSTRAINT "Classrooms_pkey" PRIMARY KEY (id);


--
-- Name: CourseManagers CourseManagers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseManagers"
    ADD CONSTRAINT "CourseManagers_pkey" PRIMARY KEY (id);


--
-- Name: Courses Courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_pkey" PRIMARY KEY (id);


--
-- Name: Files Files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Files"
    ADD CONSTRAINT "Files_pkey" PRIMARY KEY (id);


--
-- Name: GroupMembers GroupMembers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupMembers"
    ADD CONSTRAINT "GroupMembers_pkey" PRIMARY KEY (id);


--
-- Name: Groups Groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Groups"
    ADD CONSTRAINT "Groups_pkey" PRIMARY KEY (id);


--
-- Name: MeetingRoomMembers MeetingRoomMembers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MeetingRoomMembers"
    ADD CONSTRAINT "MeetingRoomMembers_pkey" PRIMARY KEY (id);


--
-- Name: MeetingRooms MeetingRooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MeetingRooms"
    ADD CONSTRAINT "MeetingRooms_pkey" PRIMARY KEY (id);


--
-- Name: Meetings Meetings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Meetings"
    ADD CONSTRAINT "Meetings_pkey" PRIMARY KEY (id);


--
-- Name: ModuleItems ModuleItems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ModuleItems"
    ADD CONSTRAINT "ModuleItems_pkey" PRIMARY KEY (id);


--
-- Name: Modules Modules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modules"
    ADD CONSTRAINT "Modules_pkey" PRIMARY KEY (id);


--
-- Name: Organizations Organizations_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Organizations"
    ADD CONSTRAINT "Organizations_name_key" UNIQUE (name);


--
-- Name: Organizations Organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Organizations"
    ADD CONSTRAINT "Organizations_pkey" PRIMARY KEY (id);


--
-- Name: PasswordResets PasswordResets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordResets"
    ADD CONSTRAINT "PasswordResets_pkey" PRIMARY KEY (id);


--
-- Name: Questions Questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Questions"
    ADD CONSTRAINT "Questions_pkey" PRIMARY KEY (id);


--
-- Name: Roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- Name: Schools Schools_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Schools"
    ADD CONSTRAINT "Schools_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeData SequelizeData_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeData"
    ADD CONSTRAINT "SequelizeData_pkey" PRIMARY KEY (name);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: StudentCourses StudentCourses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentCourses"
    ADD CONSTRAINT "StudentCourses_pkey" PRIMARY KEY (id);


--
-- Name: UserRoles UserRoles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserRoles"
    ADD CONSTRAINT "UserRoles_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Answers Answers_questionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answers"
    ADD CONSTRAINT "Answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public."Questions"(id) ON DELETE CASCADE;


--
-- Name: AssignmentSubmissions AssignmentSubmissions_assignmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AssignmentSubmissions"
    ADD CONSTRAINT "AssignmentSubmissions_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES public."ModuleItems"(id) ON DELETE CASCADE;


--
-- Name: AssignmentSubmissions AssignmentSubmissions_reviewerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AssignmentSubmissions"
    ADD CONSTRAINT "AssignmentSubmissions_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: AssignmentSubmissions AssignmentSubmissions_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AssignmentSubmissions"
    ADD CONSTRAINT "AssignmentSubmissions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Classrooms Classrooms_meetingRoomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Classrooms"
    ADD CONSTRAINT "Classrooms_meetingRoomId_fkey" FOREIGN KEY ("meetingRoomId") REFERENCES public."MeetingRooms"(id) ON DELETE CASCADE;


--
-- Name: Classrooms Classrooms_schoolId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Classrooms"
    ADD CONSTRAINT "Classrooms_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES public."Schools"(id) ON DELETE CASCADE;


--
-- Name: CourseManagers CourseManagers_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseManagers"
    ADD CONSTRAINT "CourseManagers_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Courses"(id) ON DELETE CASCADE;


--
-- Name: CourseManagers CourseManagers_enrolledById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseManagers"
    ADD CONSTRAINT "CourseManagers_enrolledById_fkey" FOREIGN KEY ("enrolledById") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: CourseManagers CourseManagers_managerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseManagers"
    ADD CONSTRAINT "CourseManagers_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Courses Courses_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Courses Courses_meetingRoomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_meetingRoomId_fkey" FOREIGN KEY ("meetingRoomId") REFERENCES public."MeetingRooms"(id) ON DELETE CASCADE;


--
-- Name: Courses Courses_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organizations"(id) ON DELETE CASCADE;


--
-- Name: Files Files_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Files"
    ADD CONSTRAINT "Files_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organizations"(id) ON DELETE CASCADE;


--
-- Name: Files Files_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Files"
    ADD CONSTRAINT "Files_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: GroupMembers GroupMembers_addedBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupMembers"
    ADD CONSTRAINT "GroupMembers_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: GroupMembers GroupMembers_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupMembers"
    ADD CONSTRAINT "GroupMembers_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."Groups"(id) ON DELETE CASCADE;


--
-- Name: GroupMembers GroupMembers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupMembers"
    ADD CONSTRAINT "GroupMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Groups Groups_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Groups"
    ADD CONSTRAINT "Groups_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Groups Groups_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Groups"
    ADD CONSTRAINT "Groups_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organizations"(id) ON DELETE CASCADE;


--
-- Name: MeetingRoomMembers MeetingRoomMembers_meetingRoomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MeetingRoomMembers"
    ADD CONSTRAINT "MeetingRoomMembers_meetingRoomId_fkey" FOREIGN KEY ("meetingRoomId") REFERENCES public."MeetingRooms"(id) ON DELETE CASCADE;


--
-- Name: MeetingRoomMembers MeetingRoomMembers_participantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MeetingRoomMembers"
    ADD CONSTRAINT "MeetingRoomMembers_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: MeetingRooms MeetingRooms_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MeetingRooms"
    ADD CONSTRAINT "MeetingRooms_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organizations"(id) ON DELETE CASCADE;


--
-- Name: Meetings Meetings_hostId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Meetings"
    ADD CONSTRAINT "Meetings_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Meetings Meetings_meetingRoomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Meetings"
    ADD CONSTRAINT "Meetings_meetingRoomId_fkey" FOREIGN KEY ("meetingRoomId") REFERENCES public."MeetingRooms"(id) ON DELETE CASCADE;


--
-- Name: ModuleItems ModuleItems_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ModuleItems"
    ADD CONSTRAINT "ModuleItems_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."Users"(id);


--
-- Name: ModuleItems ModuleItems_moduleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ModuleItems"
    ADD CONSTRAINT "ModuleItems_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES public."Modules"(id) ON DELETE CASCADE;


--
-- Name: Modules Modules_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Modules"
    ADD CONSTRAINT "Modules_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Courses"(id) ON DELETE CASCADE;


--
-- Name: PasswordResets PasswordResets_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordResets"
    ADD CONSTRAINT "PasswordResets_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Questions Questions_quizId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Questions"
    ADD CONSTRAINT "Questions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES public."ModuleItems"(id) ON DELETE CASCADE;


--
-- Name: Roles Roles_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organizations"(id);


--
-- Name: StudentCourses StudentCourses_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentCourses"
    ADD CONSTRAINT "StudentCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Courses"(id) ON DELETE CASCADE;


--
-- Name: StudentCourses StudentCourses_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentCourses"
    ADD CONSTRAINT "StudentCourses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: UserRoles UserRoles_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserRoles"
    ADD CONSTRAINT "UserRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Roles"(id);


--
-- Name: UserRoles UserRoles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserRoles"
    ADD CONSTRAINT "UserRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Users Users_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organizations"(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

