# showroom-auto

Application **Angular** (TP-2 – *Framework de développement web*, 3BI, IHEC Carthage) permettant de rechercher des voitures par marque, de consulter les modèles disponibles et d'afficher les caractéristiques d'un modèle sélectionné.

## Technologies

Angular 21 (Angular CLI 21), TypeScript, HTML, CSS. Données locales (aucun backend, aucune API).

## Fonctionnalités

- En-tête `Welcome to my showroom` (composant `head-bar`).
- Recherche par marque (champ + bouton `Search`, touche Entrée supportée), insensible à la casse, aux espaces et aux accents.
- Messages pour l'état initial, la saisie vide, l'absence de résultat et le nombre de résultats.
- Cartes de modèles avec photo, prix, puissance, disponibilité et bouton `View`.
- Panneau de caractéristiques mis à jour à chaque clic sur `View`.
- Visuel de secours (`public/photos/placeholder.svg`) si une photo est absente.
- Design responsive (ordinateur, tablette, téléphone). SPA : aucun rechargement de page.

## Notions Angular démontrées

| Notion | Fichier |
|---|---|
| Interface TypeScript `Auto` | `src/app/auto.ts` |
| Liste `autoList: Auto[]` | `src/app/app.component.ts` |
| Composant principal `AppComponent` | `src/app/app.component.*` |
| Composants `head-bar`, `search-bar`, `auto-list` | `src/app/<nom>/` |
| `@Input() autos` | `src/app/search-bar/search-bar.component.ts` |
| Property binding `[autos]="autoList"` | `src/app/app.component.html` |
| Méthode `searchAutoList()` + event binding `(click)` | `search-bar.component.ts` / `.html` |
| `*ngFor` (cartes des modèles) | `src/app/auto-list/auto-list.component.html` |
| `@Output() selectAutoEvent = new EventEmitter<Auto>()` | `search-bar.component.ts` |
| `selectedAuto(auto)` → `emit(auto)` | `search-bar.component.ts` |
| `(selectAutoEvent)="updateAuto($event)"` | `app.component.html` |
| `selectedAuto: Auto \| null` + `updateAuto(auto)` | `app.component.ts` |
| `*ngIf` (détails, états) | `app.component.html`, `search-bar.component.html` |
| Interpolation `{{ }}` | tous les templates |

**Flux :** `AppComponent` → `[autos]="autoList"` → `SearchBarComponent` → `<app-auto-list [autos]="results">` ; clic sur `View` → `AutoListComponent.viewAuto` → `SearchBarComponent.selectedAuto(auto)` → `selectAutoEvent.emit(auto)` → `AppComponent.updateAuto($event)` → `selectedAuto` → `*ngIf`.

## Installation et lancement

Prérequis : Node.js ≥ 20.19 (ou 22.12+), npm.

```bash
npm install --legacy-peer-deps
npm start            # http://localhost:4200
npm test             # tests unitaires (Vitest)
npm run build        # build de production -> dist/showroom-auto/browser
```

## Photos

Placez les images dans `public/photos/` avec les noms utilisés dans `autoList` :
`CLASS-C.webp, GLA.webp, GLE.webp, FPACE.webp, EPACE.webp, Q3.webp, Q5.webp, A3.webp, X2.webp, IX.webp, X3.webp, EVOQUE.webp, DEFENDER.webp, RANGE.webp, STELVIO.webp, GIULIA.webp`.
Tant qu'une image est absente, un visuel de secours s'affiche. Vérifiez que vous avez le droit de publier ces images.

## Prix et puissance

`price` est exprimé en milliers de DNT (230 → « 230,000 DNT ») et `power` en CV fiscaux. Pour changer d'unité, modifiez les templates (`auto-list.component.html`, `app.component.html`).

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy.yml` construit et publie l'application à chaque push sur `main`.
Dans GitHub : **Settings → Pages → Source : GitHub Actions**. URL attendue : `https://<utilisateur>.github.io/showroom-auto/`.
Build manuel équivalent : `npm run build:gh`.
