-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.carreras (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  nombre text NOT NULL,
  slug text NOT NULL,
  emojie text NOT NULL,
  CONSTRAINT carreras_pkey PRIMARY KEY (id)
);
CREATE TABLE public.correlativas (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  materia smallint NOT NULL,
  tipo_requisito text CHECK (tipo_requisito = ANY (ARRAY['cursar'::text, 'rendir'::text])),
  requisito bigint,
  condicion text CHECK (condicion = ANY (ARRAY['regular'::text, 'aprobado'::text])),
  porcentaje integer CHECK (porcentaje < 100),
  notas text,
  CONSTRAINT correlativas_pkey PRIMARY KEY (id),
  CONSTRAINT correlativas_requisito_fkey FOREIGN KEY (requisito) REFERENCES public.materias(id),
  CONSTRAINT correlativas_materia_fkey FOREIGN KEY (materia) REFERENCES public.materia_plan(id)
);
CREATE TABLE public.materia_plan (
  id smallint GENERATED ALWAYS AS IDENTITY NOT NULL,
  plan_id bigint NOT NULL,
  orientacion_id bigint,
  materia_id bigint NOT NULL,
  anio smallint,
  nro_periodo smallint,
  nro_optativa smallint,
  periodo_id bigint,
  CONSTRAINT materia_plan_pkey PRIMARY KEY (id),
  CONSTRAINT materia_plan_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plan_estudio(id),
  CONSTRAINT materia_plan_orientacion_id_fkey FOREIGN KEY (orientacion_id) REFERENCES public.orientaciones(id),
  CONSTRAINT materia_plan_materia_id_fkey FOREIGN KEY (materia_id) REFERENCES public.materias(id),
  CONSTRAINT materia_plan_periodo_id_fkey FOREIGN KEY (periodo_id) REFERENCES public.periodo(id)
);
CREATE TABLE public.materias (
  id bigint NOT NULL,
  nombre text,
  slug text,
  CONSTRAINT materias_pkey PRIMARY KEY (id)
);
CREATE TABLE public.orientaciones (
  id bigint NOT NULL,
  nombre text,
  slug text,
  CONSTRAINT orientaciones_pkey PRIMARY KEY (id)
);
CREATE TABLE public.periodo (
  id bigint NOT NULL,
  periodo text,
  CONSTRAINT periodo_pkey PRIMARY KEY (id)
);
CREATE TABLE public.plan_estudio (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  carrera_id bigint,
  anio_inicio bigint,
  anio_fin bigint,
  CONSTRAINT plan_estudio_pkey PRIMARY KEY (id),
  CONSTRAINT plan_estudio_carrera_id_fkey FOREIGN KEY (carrera_id) REFERENCES public.carreras(id)
);