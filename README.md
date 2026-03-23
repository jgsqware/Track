# 🔥 Streak Tracker

Web app dark mode pour suivre des habitudes quotidiennes.

```
┌─────────────────────────────────────┐
│  🔥 Streak Tracker                  │
│  Semaine courante · 17–23           │
│                                     │
│  ┌─────┐  ┌─────┐  ┌─────┐        │
│  │  5  │  │  3  │  │  4  │  pills  │
│  │jours│  │jours│  │jours│        │
│  └─────┘  └─────┘  └─────┘        │
│                                     │
│  [Dashboard] [Grille] [Stats]       │
│                                     │
│  ┌─────────────────────────┐       │
│  │  ✓  ✓  ✓  ✓  ✓  ·  ·  │ grid  │
│  │  ✓  ✓  ✓  ·  ·  ·  ·  │       │
│  │  ✓  ✓  ✓  ✓  ·  ·  ·  │       │
│  └─────────────────────────┘       │
└─────────────────────────────────────┘
```

## Setup local

```bash
npm install
npm run dev
```

## Déploiement Cloudflare Pages

Première fois :
```bash
npx wrangler pages project create streak-tracker
```

Déployer :
```bash
npm run deploy
```

## Script de sync (Apple Reminders → JSON)

```bash
chmod +x scripts/sync-reminders.fish
./scripts/sync-reminders.fish '[{"id":"mq","completed":true},{"id":"mh","completed":false},{"id":"rp","completed":true}]'
```

Avec auto-push :
```bash
GIT_AUTOPUSH=1 ./scripts/sync-reminders.fish '[...]'
```

## Ajouter une habitude

Modifier `src/data/habits.js` :

```js
export const HABITS = [
  // ... existants ...
  { id: "xx", name: "Nouvelle habitude", icon: "🎯", list: "Ma Liste", color: "#8B5CF6", glow: "rgba(139,92,246,0.4)" },
];
```

## Prompt Claude soir (sync automatique)

> Vérifie mes rappels Apple Reminders pour les listes "Ménage Quotidien", "Ménage Hebdo" et "Routine Perso". Pour chaque tâche complétée aujourd'hui, lance le script sync-reminders.fish avec le JSON correspondant.

## Stack

- React 18 + Vite
- CSS-in-JS inline (zéro dépendance UI)
- localStorage pour la persistance
- Cloudflare Pages pour le déploiement
