# CV Online

Web estatica de CV y portafolio para Manuel Jhonnathan Abanto Flores.

## Que incluye

- Pagina publica responsive en `/`.
- CV imprimible en `/cv`.
- Contenido editable manualmente en `src/lib/portfolio-data.ts`.
- Export estatico en `out/` con `npm run build`.
- Deploy listo para GitHub Pages.

No incluye admin, login, base de datos externa, CRUD ni variables privadas.

## Instalar

```bash
npm install
npm run dev
```

Luego abre `http://localhost:3000`.

## Editar el CV

Edita `src/lib/portfolio-data.ts` y vuelve a ejecutar:

```bash
npm run lint
npm run typecheck
npm run build
```

Los placeholders de contacto estan en ese mismo archivo:

- `correo@ejemplo.com`
- `linkedin.com/in/tu-perfil`
- `github.com/tu-usuario`

## Publicar en GitHub Pages

1. Sube la rama `feature/simplificar-cv` a GitHub.
2. En GitHub, entra a `Settings` > `Pages`.
3. En `Build and deployment`, selecciona `GitHub Actions`.
4. Ejecuta el workflow `Deploy GitHub Pages` o haz push a la rama.
5. Publica el contenido generado desde `out/`.

## Comandos

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run e2e
```
