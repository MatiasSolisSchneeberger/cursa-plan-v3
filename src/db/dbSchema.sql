-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.calendario_clases (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  nro_periodo bigint NOT NULL,
  periodo bigint NOT NULL,
  fecha_inicio date NOT NULL,
  fecha_fin date NOT NULL,
  nota text NOT NULL,
  CONSTRAINT calendario_clases_pkey PRIMARY KEY (id),
  CONSTRAINT calendario_clases-v1_periodo_fkey FOREIGN KEY (periodo) REFERENCES public.tipos_periodo(id)
);
CREATE TABLE public.carreras (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  nombre text NOT NULL,
  slug text NOT NULL,
  emojie text NOT NULL,
  CONSTRAINT carreras_pkey PRIMARY KEY (id)
);
CREATE TABLE public.carreras_fav (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  plan_id bigint NOT NULL,
  user_id uuid NOT NULL,
  CONSTRAINT carreras_fav_pkey PRIMARY KEY (id),
  CONSTRAINT carreras_fav_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT carreras_fav_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plan_estudio(id)
);
CREATE TABLE public.correlativas (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  materia smallint,
  tipo_requisito text CHECK (tipo_requisito = ANY (ARRAY['cursar'::text, 'rendir'::text])),
  requisito bigint,
  condicion text CHECK (condicion = ANY (ARRAY['regular'::text, 'aprobado'::text])),
  porcentaje integer CHECK (porcentaje < 100),
  notas text,
  CONSTRAINT correlativas_pkey PRIMARY KEY (id),
  CONSTRAINT correlativas_materia_fkey FOREIGN KEY (materia) REFERENCES public.materia_plan(id),
  CONSTRAINT correlativas_requisito_fkey FOREIGN KEY (requisito) REFERENCES public.materias(id)
);
CREATE TABLE public.fechas_examenes (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  materia_id bigint NOT NULL UNIQUE,
  fecha date NOT NULL,
  CONSTRAINT fechas_examenes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.feriados (
  id bigint NOT NULL,
  fecha date NOT NULL,
  tipo bigint NOT NULL,
  nombre text NOT NULL,
  slug text NOT NULL,
  nota text,
  CONSTRAINT feriados_pkey PRIMARY KEY (id),
  CONSTRAINT feriados_tipo_fkey FOREIGN KEY (tipo) REFERENCES public.tipos_feriado(id)
);
CREATE TABLE public.inscripciones (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  nro_periodo bigint NOT NULL,
  periodo bigint NOT NULL,
  fecha_inicio date NOT NULL,
  fecha_fin date NOT NULL,
  CONSTRAINT inscripciones_pkey PRIMARY KEY (id),
  CONSTRAINT inscripciones_periodo_fkey FOREIGN KEY (periodo) REFERENCES public.tipos_periodo(id)
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
  CONSTRAINT materia_plan_orientacion_id_fkey FOREIGN KEY (orientacion_id) REFERENCES public.tipos_orientaciones(id),
  CONSTRAINT materia_plan_periodo_id_fkey FOREIGN KEY (periodo_id) REFERENCES public.tipos_periodo(id),
  CONSTRAINT materia_plan_materia_id_fkey FOREIGN KEY (materia_id) REFERENCES public.materias(id),
  CONSTRAINT materia_plan_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plan_estudio(id)
);
CREATE TABLE public.materias (
  id bigint NOT NULL,
  nombre text,
  slug text,
  CONSTRAINT materias_pkey PRIMARY KEY (id)
);
CREATE TABLE public.plan_estudio (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  carrera_id bigint,
  anio_inicio bigint,
  anio_fin bigint,
  CONSTRAINT plan_estudio_pkey PRIMARY KEY (id),
  CONSTRAINT plan_estudio_carrera_id_fkey FOREIGN KEY (carrera_id) REFERENCES public.carreras(id)
);
CREATE TABLE public.tipos_feriado (
  id bigint NOT NULL UNIQUE,
  nombre text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  CONSTRAINT tipos_feriado_pkey PRIMARY KEY (id)
);
CREATE TABLE public.tipos_mesa (
  id bigint NOT NULL,
  nombre text NOT NULL,
  slug text NOT NULL,
  CONSTRAINT tipos_mesa_pkey PRIMARY KEY (id)
);
CREATE TABLE public.tipos_orientaciones (
  id bigint NOT NULL,
  nombre text,
  slug text,
  CONSTRAINT tipos_orientaciones_pkey PRIMARY KEY (id)
);
CREATE TABLE public.tipos_periodo (
  id bigint NOT NULL,
  periodo text,
  CONSTRAINT tipos_periodo_pkey PRIMARY KEY (id)
);
CREATE TABLE public.turnos_examenes (
  id bigint NOT NULL,
  fecha_inicio date NOT NULL,
  fecha_fin date NOT NULL,
  tipo_mesa_id bigint NOT NULL,
  is_suspencion boolean NOT NULL DEFAULT false,
  nota text,
  CONSTRAINT turnos_examenes_pkey PRIMARY KEY (id),
  CONSTRAINT turnos_examenes_tipo_mesa_id_fkey FOREIGN KEY (tipo_mesa_id) REFERENCES public.tipos_mesa(id)
);
CREATE TABLE public.usuarios (
  id uuid NOT NULL DEFAULT auth.uid(),
  username text NOT NULL UNIQUE,
  avatar_url text,
  full_name text NOT NULL,
  CONSTRAINT usuarios_pkey PRIMARY KEY (id),
  CONSTRAINT usuarios_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);