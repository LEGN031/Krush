-- =================================================================================
-- KRUSH Gaming Store - Supabase Secure Registration Setup
-- =================================================================================

-- 1. Create tables if they don't exist
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    direccion TEXT NOT NULL,
    tipo_usuario TEXT NOT NULL DEFAULT 'cliente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.clientes (
    id_usuario UUID PRIMARY KEY REFERENCES public.usuarios(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Enable RLS (Row Level Security) on tables
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Usuarios pueden leer su propio perfil
CREATE POLICY "Users can view their own profile" 
ON public.usuarios FOR SELECT 
USING (auth.uid() = id);

-- Usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update their own profile" 
ON public.usuarios FOR UPDATE 
USING (auth.uid() = id);

-- Clientes pueden leer su propio registro
CREATE POLICY "Clients can view their own record" 
ON public.clientes FOR SELECT 
USING (auth.uid() = id_usuario);

-- NOTA IMPORTANTE: No damos permisos de INSERT públicos. 
-- El insert lo hará automáticamente nuestro Trigger como un proceso interno de la base de datos (con privilegios elevados).

-- 4. Create the function that will handle new users
-- Use SECURITY DEFINER to allow this function to bypass RLS and insert into public tables.
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
    -- Variables para extraer la metadata
    _nombre TEXT;
    _direccion TEXT;
BEGIN
    -- Extraer datos del raw_user_meta_data que enviamos desde el frontend
    _nombre := NEW.raw_user_meta_data->>'nombre';
    _direccion := NEW.raw_user_meta_data->>'direccion';

    -- Insertar en la tabla usuarios
    INSERT INTO public.usuarios (id, nombre, email, direccion, tipo_usuario)
    VALUES (
        NEW.id,
        COALESCE(_nombre, 'Usuario de KRUSH'), -- Fallback en caso de que no venga metadata
        NEW.email,
        COALESCE(_direccion, 'Sin dirección'),
        'cliente'
    );

    -- Insertar en la tabla clientes
    INSERT INTO public.clientes (id_usuario)
    VALUES (NEW.id);

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error (visible in Supabase Postgres logs)
        RAISE LOG 'Error en handle_new_user trigger para el UUID %: %', NEW.id, SQLERRM;
        RETURN NEW; -- Retornar NEW para no bloquear la creación en auth.users aunque falle lo público
END;
$$;

-- 5. Create the Trigger
-- Se ejecuta DESPUÉS de que se inserta un registro en la tabla auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
