# Portfolio CV

Web profesional para CV y portafolio de Data Analyst / Data Engineer / Business Intelligence.

## Que incluye

- Pagina publica `/` con perfil, experiencia, proyectos, skills, certificaciones, educacion y contacto.
- Panel privado `/admin` con login y CRUD para editar el contenido.
- Supabase PostgreSQL/Auth preparado con RLS.
- Modo demo local cuando Supabase no esta configurado.
- Boton para imprimir/exportar el CV como PDF.
- Validaciones con Zod, formularios con React Hook Form y pruebas con Vitest/Playwright.

## Instalar y ejecutar

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`.

Si no configuras Supabase, el admin funciona solo en desarrollo con:

```txt
demo@portfolio.local
portfolio-demo
```

## Variables de entorno

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DEMO_ADMIN_EMAIL=demo@portfolio.local
DEMO_ADMIN_PASSWORD=portfolio-demo
```

No guardes `.env.local` en Git.

## Conectar Supabase

1. Crea un proyecto en Supabase.
2. Ve a SQL Editor y ejecuta `supabase/schema.sql`.
3. En Authentication, crea tu usuario admin con correo y contrasena.
4. Copia el `user id` del usuario creado.
5. Ejecuta este SQL, cambiando el UUID:

```sql
insert into public.admin_users (user_id, role)
values ('TU_USER_ID', 'admin');
```

6. Copia en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

## Editar el CV

1. Entra a `/admin/login`.
2. Inicia sesion.
3. Elige una seccion: Perfil, Experiencia, Proyectos, Skills, Certificaciones, Educacion o Contacto.
4. Crea, edita, elimina u ordena registros cambiando el campo `Orden`.
5. Guarda. La pagina publica se actualiza al recargar.

## Publicar en Vercel

1. Sube este subproyecto a GitHub.
2. Crea un proyecto en Vercel apuntando a esta carpeta.
3. Agrega las variables `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. En Supabase Auth, agrega la URL de Vercel en los redirect URLs permitidos.
5. Haz deploy y prueba `/`, `/admin/login` y `/admin`.

## Comandos utiles

```bash
npm run dev
npm run lint
npm test
npm run test:coverage
npm run build
npm run e2e
```

## Mejoras futuras

- Editor Markdown para descripciones largas.
- Version en ingles.
- Upload de imagenes/logos con Supabase Storage.
- Generacion PDF server-side.
- Blog tecnico o casos de estudio.
