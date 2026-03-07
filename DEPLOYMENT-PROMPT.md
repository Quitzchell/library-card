# Claude Code Prompt: Deployment Setup

Gebruik deze prompt in Claude Code om je deployment pipeline op te zetten.

---

## Prompt

```
Ik wil mijn project deployen met de volgende gratis stack:
- Frontend (Next.js 15): Vercel (gratis tier)
- Backend (Django 5 + DRF): Render free tier (web service)
- Database (PostgreSQL): Supabase (gratis tier, zelfde project als Storage)

## Projectstructuur en architectuur

Mijn project heeft deze structuur:
- /frontend — Next.js 15 app (React 19, Tailwind v4, App Router)
- /backend — Django 5 met DRF, django-summernote CMS, django-cors-headers
- Docker Compose setup voor lokale development (geen Postgres container, backend draait standalone)
- Database config in backend/config/settings.py gebruikt python-decouple met env vars: DB_ENGINE, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT
- Frontend env vars staan in frontend/.env.local
- Backend env vars staan in backend/.env
- Er is een PUBLIC_URL setting in Django voor absolute URLs
- CORS_ALLOWED_ORIGINS wordt uit env gelezen
- Media files (uploads via CMS) staan in backend/media/

### Belangrijk: data fetching architectuur

De frontend gebruikt UITSLUITEND server-side data fetching via async server components (Next.js App Router patroon). Er is GEEN client-side fetching:
- Alle pagina's (music, tour, video, about, home) zijn async server components
- Data wordt opgehaald via een services-laag: services.music.getReleases(), services.tour.getUpcomingDates(), services.video.getVideoItems(), services.biography.getBiography(), services.image.getCarouselImages()
- De API client zit in /lib/api/django/client.ts en gebruikt server-side fetch()
- Er is geen "use client" op data-fetching componenten, geen useEffect voor API calls, geen SWR of React Query
- Presentatie-componenten ontvangen data via props

Dit betekent dat we Incremental Static Regeneration (ISR) kunnen gebruiken als deployment-strategie:
- Vercel bouwt statische pagina's die periodiek gerevalideerd worden
- De Django backend hoeft NIET continu beschikbaar te zijn voor bezoekers
- De backend wordt alleen aangesproken tijdens builds/revalidation en wanneer ik het CMS gebruik
- Dit elimineert het koude-start-probleem voor bezoekers volledig

## Wat ik nodig heb

### 1. Frontend ombouwen naar ISR op Vercel
- Voeg revalidation toe aan de server components of per fetch-call (bijv. `{ next: { revalidate: 3600 } }` voor elk uur, of een passend interval)
- Alternatief: implementeer on-demand revalidation via een webhook. Maak een API route in Next.js (bijv. /api/revalidate) die Vercel's revalidateTag() of revalidatePath() aanroept. Django kan na het opslaan van content een POST naar deze URL sturen om de relevante pagina's te hergenereren.
- Pas next.config.ts aan zodat remotePatterns dynamisch de backend URL uit NEXT_PUBLIC_API_URL leest (of gebruik env var BACKEND_URL voor server-side, zonder NEXT_PUBLIC_ prefix)
- Maak een vercel.json als dat nodig is voor rewrites of environment config
- Zorg ervoor dat de build NIET faalt als de backend tijdelijk niet bereikbaar is (graceful fallback / try-catch rond fetches met een lege fallback)

### 2. Backend productie-klaar maken voor Render
- Voeg `gunicorn`, `dj-database-url`, en `whitenoise` toe aan requirements.txt
- Maak een `build.sh` script voor Render (pip install, collectstatic, migrate)
- Pas settings.py aan zodat:
  - DATABASE_URL env var ondersteund wordt (via dj-database-url) met fallback naar huidige losse env vars
  - WhiteNoise middleware toegevoegd wordt voor static files
  - STATIC_ROOT geconfigureerd wordt
  - CONN_MAX_AGE=0 gezet wordt (voor Supabase's connection pooling)
  - SECURE_SSL_REDIRECT, SESSION_COOKIE_SECURE, CSRF_COOKIE_SECURE conditioneel aan staan in productie
- Maak een `render.yaml` (Blueprint) voor de backend service
- Optioneel: voeg een Django signal of admin hook toe die na het opslaan van content een POST stuurt naar de Vercel revalidation webhook (als je on-demand revalidation implementeert)

### 3. GitHub Actions workflows
- `.github/workflows/deploy-frontend.yml`: deploy naar Vercel bij push naar main (alleen als er changes in /frontend zijn). Gebruik `vercel build` + `vercel deploy --prebuilt --prod`. Benodigde secrets: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID.
- `.github/workflows/deploy-backend.yml`: deploy naar Render bij push naar main (alleen als er changes in /backend zijn). Trigger via Render deploy hook URL. Benodigde secret: RENDER_DEPLOY_HOOK_URL.
- Beide workflows moeten ook tests draaien voordat ze deployen (frontend: `npm run test`, backend: `python manage.py test`)
- Voeg een workflow toe die na een succesvolle backend deploy een Vercel rebuild triggert (zodat nieuwe DB-migraties meegenomen worden in de statische pagina's)

### 4. Media files op Supabase Storage
- Render's free tier heeft een ephemeral filesystem — uploads verdwijnen bij elke deploy. Daarom hosten we media files op Supabase Storage (gratis: 1GB opslag, 2GB bandbreedte/maand).
- Voeg `supabase-py` (of `django-storages` met S3-compatible backend) toe aan requirements.txt. Supabase Storage is S3-compatible, dus django-storages met de S3 backend werkt.
- Maak een custom Django storage backend (of configureer django-storages) die uploads naar een Supabase Storage bucket stuurt in plaats van naar het lokale filesystem.
- Configureer dit conditioneel: in development blijven uploads lokaal (MEDIA_ROOT), in productie gaan ze naar Supabase. Gebruik een env var zoals MEDIA_STORAGE_BACKEND=supabase om te schakelen.
- De Supabase bucket moet public zijn zodat media URLs direct bereikbaar zijn zonder de Django backend (want die slaapt).
- Pas de Django serializers/API aan zodat media URLs de Supabase public URL gebruiken in productie in plaats van relatieve /media/ paden.
- Benodigde env vars: SUPABASE_URL, SUPABASE_SERVICE_KEY, SUPABASE_STORAGE_BUCKET
- Pas de Next.js next.config.ts remotePatterns aan om ook het Supabase Storage domein toe te staan voor images.

### 5. Environment variabelen documentatie
- Maak een .env.example voor zowel frontend als backend met alle benodigde env vars voor productie
- Voeg comments toe die uitleggen wat elke var doet
- Voeg de nieuwe ISR-gerelateerde env vars toe (REVALIDATION_SECRET, BACKEND_URL, etc.)
- Voeg Supabase Storage env vars toe (SUPABASE_URL, SUPABASE_SERVICE_KEY, SUPABASE_STORAGE_BUCKET)

## Belangrijke randvoorwaarden
- Breek bestaande lokale development NIET — alles moet blijven werken met docker compose
- Gebruik feature detection / env vars om onderscheid te maken tussen dev en prod
- Commit GEEN secrets of .env files
- De ISR-strategie moet graceful omgaan met een onbereikbare backend (fallback naar cached versie, niet crashen)
```

---

## Documentatie om te raadplegen

### Vercel + GitHub Actions
- [Vercel KB: GitHub Actions](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel) — officiële guide met preview + production workflows
- [Vercel for GitHub](https://vercel.com/docs/git/vercel-for-github) — automatische Git integratie

### Render + Django
- [Render Deploy Hooks](https://render.com/docs/deploy-hooks) — trigger deploys via HTTP request
- [Render Django Quick Start](https://github.com/render-examples/django-quick-start) — officieel voorbeeld project
- [Deploy to Render GitHub Action](https://github.com/marketplace/actions/deploy-to-render) — community action

### Supabase (Database + Storage) + Django
- [Supabase: Connect Django](https://supabase.com/docs/guides/getting-started/quickstarts/python) — officiële Python/Django quickstart
- [Supabase: Database Settings](https://supabase.com/docs/guides/database/connecting-to-postgres) — connection strings en pooling modes
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage) — officiële Storage documentatie
- [django-storages S3 Backend](https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html) — werkt met Supabase's S3-compatible API
- [Supabase Storage S3 Compatibility](https://supabase.com/docs/guides/storage/s3/authentication) — S3 endpoint en authenticatie setup

---

## Setup stappen (handmatig, voordat je Claude Code runt)

1. **Supabase.com**: Maak een account + project aan → kopieer de DATABASE_URL (onder Settings > Database > Connection string, gebruik de "URI" variant) → maak een Storage bucket (public) → kopieer SUPABASE_URL, SUPABASE_SERVICE_KEY (of S3 access keys onder Storage > S3 Access Keys), en de bucket naam
2. **Render.com**: Maak een account + Web Service aan (koppel je GitHub repo, set build command: `./build.sh`, start command: `gunicorn config.wsgi`) → kopieer de Deploy Hook URL
3. **Vercel.com**: Maak een account → run `npx vercel link` in /frontend → kopieer VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
5. **GitHub Secrets**: Voeg toe: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `RENDER_DEPLOY_HOOK_URL`
