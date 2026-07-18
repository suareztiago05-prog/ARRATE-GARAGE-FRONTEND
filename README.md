# Arrate Garage Web

Frontend React + Vite para el catálogo de motos Arrate Garage, integrado completamente con su API Express.

## Funcionalidades

- Catálogo adaptable con búsqueda, filtros y ordenamiento.
- Detalle individual de cada moto.
- Formulario de financiación con validaciones y contacto por WhatsApp.
- Registro de usuarios y pantalla de verificación de email.
- Login de administrador y ruta protegida con JWT.
- CRUD de motos, marcas y categorías.
- Subida múltiple de imágenes mediante Cloudinary.

## Instalación

1. Ejecutar `npm install`.
2. Copiar `.env.example` como `.env`.
3. Configurar `VITE_API_URL=http://localhost:3000/api`.
4. Ejecutar `npm run dev`.

## Scripts

- `npm run dev`: desarrollo.
- `npm run lint`: revisión de código.
- `npm run build`: compilación de producción.
- `npm run preview`: vista previa del build.

## Rutas

| Ruta | Pantalla |
| --- | --- |
| `/` | Inicio y catálogo |
| `/motos/:id` | Detalle de moto |
| `/registro` | Registro público |
| `/login` | Login de usuario |
| `/verificar-email` | Activación mediante token |
| `/admin/login` | Login administrativo |
| `/admin` | Panel CRUD protegido |

## Despliegue

En producción, `VITE_API_URL` debe contener la URL pública del backend terminada en `/api`. El hosting debe redirigir rutas desconocidas hacia `index.html` para que funcione React Router.
