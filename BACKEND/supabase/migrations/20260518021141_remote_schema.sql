drop extension if exists "pg_net";


  create table "public"."admins" (
    "id" uuid not null default gen_random_uuid(),
    "usuario_id" uuid
      );


alter table "public"."admins" enable row level security;


  create table "public"."categorias" (
    "id" uuid not null default gen_random_uuid(),
    "nombre" text not null
      );


alter table "public"."categorias" enable row level security;


  create table "public"."clientes" (
    "id" uuid not null default gen_random_uuid(),
    "usuario_id" uuid
      );


alter table "public"."clientes" enable row level security;


  create table "public"."detalles_ordenes" (
    "id" uuid not null default gen_random_uuid(),
    "orden_id" uuid,
    "producto_id" uuid,
    "cantidad" integer not null,
    "precio" numeric(10,2) not null
      );


alter table "public"."detalles_ordenes" enable row level security;


  create table "public"."ordenes" (
    "id" uuid not null default gen_random_uuid(),
    "cliente_id" uuid,
    "fecha" timestamp with time zone default now(),
    "total" numeric(10,2) not null
      );


alter table "public"."ordenes" enable row level security;


  create table "public"."productos" (
    "id" uuid not null default gen_random_uuid(),
    "nombre" text not null,
    "descripcion" text,
    "precio" numeric(10,2) not null,
    "categoria_id" uuid
      );


alter table "public"."productos" enable row level security;


  create table "public"."usuarios" (
    "id" uuid not null,
    "nombre" text not null,
    "email" text not null,
    "direccion" text,
    "tipo_usuario" text not null
      );


alter table "public"."usuarios" enable row level security;


  create table "public"."vendedores" (
    "id" uuid not null default gen_random_uuid(),
    "usuario_id" uuid
      );


alter table "public"."vendedores" enable row level security;

CREATE UNIQUE INDEX admins_pkey ON public.admins USING btree (id);

CREATE UNIQUE INDEX categorias_pkey ON public.categorias USING btree (id);

CREATE UNIQUE INDEX clientes_pkey ON public.clientes USING btree (id);

CREATE UNIQUE INDEX detalles_ordenes_pkey ON public.detalles_ordenes USING btree (id);

CREATE UNIQUE INDEX ordenes_pkey ON public.ordenes USING btree (id);

CREATE UNIQUE INDEX productos_pkey ON public.productos USING btree (id);

CREATE UNIQUE INDEX usuarios_email_key ON public.usuarios USING btree (email);

CREATE UNIQUE INDEX usuarios_pkey ON public.usuarios USING btree (id);

CREATE UNIQUE INDEX vendedores_pkey ON public.vendedores USING btree (id);

alter table "public"."admins" add constraint "admins_pkey" PRIMARY KEY using index "admins_pkey";

alter table "public"."categorias" add constraint "categorias_pkey" PRIMARY KEY using index "categorias_pkey";

alter table "public"."clientes" add constraint "clientes_pkey" PRIMARY KEY using index "clientes_pkey";

alter table "public"."detalles_ordenes" add constraint "detalles_ordenes_pkey" PRIMARY KEY using index "detalles_ordenes_pkey";

alter table "public"."ordenes" add constraint "ordenes_pkey" PRIMARY KEY using index "ordenes_pkey";

alter table "public"."productos" add constraint "productos_pkey" PRIMARY KEY using index "productos_pkey";

alter table "public"."usuarios" add constraint "usuarios_pkey" PRIMARY KEY using index "usuarios_pkey";

alter table "public"."vendedores" add constraint "vendedores_pkey" PRIMARY KEY using index "vendedores_pkey";

alter table "public"."admins" add constraint "admins_usuario_id_fkey" FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE not valid;

alter table "public"."admins" validate constraint "admins_usuario_id_fkey";

alter table "public"."clientes" add constraint "clientes_usuario_id_fkey" FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE not valid;

alter table "public"."clientes" validate constraint "clientes_usuario_id_fkey";

alter table "public"."detalles_ordenes" add constraint "detalles_ordenes_orden_id_fkey" FOREIGN KEY (orden_id) REFERENCES public.ordenes(id) ON DELETE CASCADE not valid;

alter table "public"."detalles_ordenes" validate constraint "detalles_ordenes_orden_id_fkey";

alter table "public"."detalles_ordenes" add constraint "detalles_ordenes_producto_id_fkey" FOREIGN KEY (producto_id) REFERENCES public.productos(id) not valid;

alter table "public"."detalles_ordenes" validate constraint "detalles_ordenes_producto_id_fkey";

alter table "public"."ordenes" add constraint "ordenes_cliente_id_fkey" FOREIGN KEY (cliente_id) REFERENCES public.clientes(id) not valid;

alter table "public"."ordenes" validate constraint "ordenes_cliente_id_fkey";

alter table "public"."productos" add constraint "productos_categoria_id_fkey" FOREIGN KEY (categoria_id) REFERENCES public.categorias(id) not valid;

alter table "public"."productos" validate constraint "productos_categoria_id_fkey";

alter table "public"."usuarios" add constraint "usuarios_email_key" UNIQUE using index "usuarios_email_key";

alter table "public"."usuarios" add constraint "usuarios_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."usuarios" validate constraint "usuarios_id_fkey";

alter table "public"."usuarios" add constraint "usuarios_tipo_usuario_check" CHECK ((tipo_usuario = ANY (ARRAY['cliente'::text, 'vendedor'::text, 'admin'::text]))) not valid;

alter table "public"."usuarios" validate constraint "usuarios_tipo_usuario_check";

alter table "public"."vendedores" add constraint "vendedores_usuario_id_fkey" FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE not valid;

alter table "public"."vendedores" validate constraint "vendedores_usuario_id_fkey";

grant delete on table "public"."admins" to "anon";

grant insert on table "public"."admins" to "anon";

grant references on table "public"."admins" to "anon";

grant select on table "public"."admins" to "anon";

grant trigger on table "public"."admins" to "anon";

grant truncate on table "public"."admins" to "anon";

grant update on table "public"."admins" to "anon";

grant delete on table "public"."admins" to "authenticated";

grant insert on table "public"."admins" to "authenticated";

grant references on table "public"."admins" to "authenticated";

grant select on table "public"."admins" to "authenticated";

grant trigger on table "public"."admins" to "authenticated";

grant truncate on table "public"."admins" to "authenticated";

grant update on table "public"."admins" to "authenticated";

grant delete on table "public"."admins" to "service_role";

grant insert on table "public"."admins" to "service_role";

grant references on table "public"."admins" to "service_role";

grant select on table "public"."admins" to "service_role";

grant trigger on table "public"."admins" to "service_role";

grant truncate on table "public"."admins" to "service_role";

grant update on table "public"."admins" to "service_role";

grant delete on table "public"."categorias" to "anon";

grant insert on table "public"."categorias" to "anon";

grant references on table "public"."categorias" to "anon";

grant select on table "public"."categorias" to "anon";

grant trigger on table "public"."categorias" to "anon";

grant truncate on table "public"."categorias" to "anon";

grant update on table "public"."categorias" to "anon";

grant delete on table "public"."categorias" to "authenticated";

grant insert on table "public"."categorias" to "authenticated";

grant references on table "public"."categorias" to "authenticated";

grant select on table "public"."categorias" to "authenticated";

grant trigger on table "public"."categorias" to "authenticated";

grant truncate on table "public"."categorias" to "authenticated";

grant update on table "public"."categorias" to "authenticated";

grant delete on table "public"."categorias" to "service_role";

grant insert on table "public"."categorias" to "service_role";

grant references on table "public"."categorias" to "service_role";

grant select on table "public"."categorias" to "service_role";

grant trigger on table "public"."categorias" to "service_role";

grant truncate on table "public"."categorias" to "service_role";

grant update on table "public"."categorias" to "service_role";

grant delete on table "public"."clientes" to "anon";

grant insert on table "public"."clientes" to "anon";

grant references on table "public"."clientes" to "anon";

grant select on table "public"."clientes" to "anon";

grant trigger on table "public"."clientes" to "anon";

grant truncate on table "public"."clientes" to "anon";

grant update on table "public"."clientes" to "anon";

grant delete on table "public"."clientes" to "authenticated";

grant insert on table "public"."clientes" to "authenticated";

grant references on table "public"."clientes" to "authenticated";

grant select on table "public"."clientes" to "authenticated";

grant trigger on table "public"."clientes" to "authenticated";

grant truncate on table "public"."clientes" to "authenticated";

grant update on table "public"."clientes" to "authenticated";

grant delete on table "public"."clientes" to "service_role";

grant insert on table "public"."clientes" to "service_role";

grant references on table "public"."clientes" to "service_role";

grant select on table "public"."clientes" to "service_role";

grant trigger on table "public"."clientes" to "service_role";

grant truncate on table "public"."clientes" to "service_role";

grant update on table "public"."clientes" to "service_role";

grant delete on table "public"."detalles_ordenes" to "anon";

grant insert on table "public"."detalles_ordenes" to "anon";

grant references on table "public"."detalles_ordenes" to "anon";

grant select on table "public"."detalles_ordenes" to "anon";

grant trigger on table "public"."detalles_ordenes" to "anon";

grant truncate on table "public"."detalles_ordenes" to "anon";

grant update on table "public"."detalles_ordenes" to "anon";

grant delete on table "public"."detalles_ordenes" to "authenticated";

grant insert on table "public"."detalles_ordenes" to "authenticated";

grant references on table "public"."detalles_ordenes" to "authenticated";

grant select on table "public"."detalles_ordenes" to "authenticated";

grant trigger on table "public"."detalles_ordenes" to "authenticated";

grant truncate on table "public"."detalles_ordenes" to "authenticated";

grant update on table "public"."detalles_ordenes" to "authenticated";

grant delete on table "public"."detalles_ordenes" to "service_role";

grant insert on table "public"."detalles_ordenes" to "service_role";

grant references on table "public"."detalles_ordenes" to "service_role";

grant select on table "public"."detalles_ordenes" to "service_role";

grant trigger on table "public"."detalles_ordenes" to "service_role";

grant truncate on table "public"."detalles_ordenes" to "service_role";

grant update on table "public"."detalles_ordenes" to "service_role";

grant delete on table "public"."ordenes" to "anon";

grant insert on table "public"."ordenes" to "anon";

grant references on table "public"."ordenes" to "anon";

grant select on table "public"."ordenes" to "anon";

grant trigger on table "public"."ordenes" to "anon";

grant truncate on table "public"."ordenes" to "anon";

grant update on table "public"."ordenes" to "anon";

grant delete on table "public"."ordenes" to "authenticated";

grant insert on table "public"."ordenes" to "authenticated";

grant references on table "public"."ordenes" to "authenticated";

grant select on table "public"."ordenes" to "authenticated";

grant trigger on table "public"."ordenes" to "authenticated";

grant truncate on table "public"."ordenes" to "authenticated";

grant update on table "public"."ordenes" to "authenticated";

grant delete on table "public"."ordenes" to "service_role";

grant insert on table "public"."ordenes" to "service_role";

grant references on table "public"."ordenes" to "service_role";

grant select on table "public"."ordenes" to "service_role";

grant trigger on table "public"."ordenes" to "service_role";

grant truncate on table "public"."ordenes" to "service_role";

grant update on table "public"."ordenes" to "service_role";

grant delete on table "public"."productos" to "anon";

grant insert on table "public"."productos" to "anon";

grant references on table "public"."productos" to "anon";

grant select on table "public"."productos" to "anon";

grant trigger on table "public"."productos" to "anon";

grant truncate on table "public"."productos" to "anon";

grant update on table "public"."productos" to "anon";

grant delete on table "public"."productos" to "authenticated";

grant insert on table "public"."productos" to "authenticated";

grant references on table "public"."productos" to "authenticated";

grant select on table "public"."productos" to "authenticated";

grant trigger on table "public"."productos" to "authenticated";

grant truncate on table "public"."productos" to "authenticated";

grant update on table "public"."productos" to "authenticated";

grant delete on table "public"."productos" to "service_role";

grant insert on table "public"."productos" to "service_role";

grant references on table "public"."productos" to "service_role";

grant select on table "public"."productos" to "service_role";

grant trigger on table "public"."productos" to "service_role";

grant truncate on table "public"."productos" to "service_role";

grant update on table "public"."productos" to "service_role";

grant delete on table "public"."usuarios" to "anon";

grant insert on table "public"."usuarios" to "anon";

grant references on table "public"."usuarios" to "anon";

grant select on table "public"."usuarios" to "anon";

grant trigger on table "public"."usuarios" to "anon";

grant truncate on table "public"."usuarios" to "anon";

grant update on table "public"."usuarios" to "anon";

grant delete on table "public"."usuarios" to "authenticated";

grant insert on table "public"."usuarios" to "authenticated";

grant references on table "public"."usuarios" to "authenticated";

grant select on table "public"."usuarios" to "authenticated";

grant trigger on table "public"."usuarios" to "authenticated";

grant truncate on table "public"."usuarios" to "authenticated";

grant update on table "public"."usuarios" to "authenticated";

grant delete on table "public"."usuarios" to "service_role";

grant insert on table "public"."usuarios" to "service_role";

grant references on table "public"."usuarios" to "service_role";

grant select on table "public"."usuarios" to "service_role";

grant trigger on table "public"."usuarios" to "service_role";

grant truncate on table "public"."usuarios" to "service_role";

grant update on table "public"."usuarios" to "service_role";

grant delete on table "public"."vendedores" to "anon";

grant insert on table "public"."vendedores" to "anon";

grant references on table "public"."vendedores" to "anon";

grant select on table "public"."vendedores" to "anon";

grant trigger on table "public"."vendedores" to "anon";

grant truncate on table "public"."vendedores" to "anon";

grant update on table "public"."vendedores" to "anon";

grant delete on table "public"."vendedores" to "authenticated";

grant insert on table "public"."vendedores" to "authenticated";

grant references on table "public"."vendedores" to "authenticated";

grant select on table "public"."vendedores" to "authenticated";

grant trigger on table "public"."vendedores" to "authenticated";

grant truncate on table "public"."vendedores" to "authenticated";

grant update on table "public"."vendedores" to "authenticated";

grant delete on table "public"."vendedores" to "service_role";

grant insert on table "public"."vendedores" to "service_role";

grant references on table "public"."vendedores" to "service_role";

grant select on table "public"."vendedores" to "service_role";

grant trigger on table "public"."vendedores" to "service_role";

grant truncate on table "public"."vendedores" to "service_role";

grant update on table "public"."vendedores" to "service_role";


  create policy "Solo admins pueden insertar categorias"
  on "public"."categorias"
  as permissive
  for insert
  to authenticated
with check ((EXISTS ( SELECT 1
   FROM public.usuarios
  WHERE ((usuarios.id = auth.uid()) AND (usuarios.tipo_usuario = 'admin'::text)))));



  create policy "Todos pueden leer categorias"
  on "public"."categorias"
  as permissive
  for select
  to public
using (true);



  create policy "Usuarios pueden leer su informacion"
  on "public"."usuarios"
  as permissive
  for select
  to authenticated
using ((id = auth.uid()));



