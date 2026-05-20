const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envContent = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim();
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function inspect() {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select(`
        id,
        nombre,
        precio,
        imagen,
        categorias (
          nombre
        )
      `)
      .limit(15);

    if (error) {
      console.error('Error fetching:', error);
      return;
    }

    console.log('Total products retrieved:', data.length);
    console.log('Details of products structure:');
    data.forEach((p, idx) => {
      console.log(`\nProduct [${idx}]:`, {
        id: p.id,
        nombre: p.nombre,
        precio: p.precio,
        imagen_type: typeof p.imagen,
        imagen_val: p.imagen ? p.imagen.substring(0, 60) + '...' : null,
        categorias_type: typeof p.categorias,
        categorias_val: p.categorias
      });
    });
  } catch (err) {
    console.error('Crash:', err);
  }
}

inspect();
