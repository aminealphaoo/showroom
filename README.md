# Showroom Auto — Application Angular

Application **Angular** développée dans le cadre du **TP-2** (*Frameworks de développement web frontend*, 3BI, IHEC Carthage, 2026-2027). Elle permet de rechercher des véhicules automobiles par marque, de consulter les modèles correspondants et d'afficher les caractéristiques complètes d'un véhicule sélectionné.

- **Dépôt GitHub :** [https://github.com/aminealphaoo/showroom.git](https://github.com/aminealphaoo/showroom.git)
- **Application Déployée (GitHub Pages) :** [https://aminealphaoo.github.io/showroom/](https://aminealphaoo.github.io/showroom/)

---

## 1. Architecture & Notions Pédagogiques Démontrées

Conformément au cours d'introduction (*Chapitre 1 : Introduction à Angular*), au sujet du TP (*TP-2*) et au document technique (*Communication Parent-Enfant*), l'application applique les concepts suivants :

| Notion du Cours | Rôle & Contexte | Fichier d'implémentation |
|---|---|---|
| **Architecture SPA (Single Page Application)** | Navigation et consultation fluides sans aucun rechargement complet de la page | `src/index.html`, `src/app/app.component.html` |
| **Architecture MVVM** | Séparation claire Modèle (données typées), Vue (templates HTML), ViewModel (classes TypeScript) | Ensemble du dossier `src/app/` |
| **Typage TypeScript & Interface** | Interface `Auto` avec propriétés (`brand`, `model`, `price`, `power`, `photo`, `availability`, `description`) | [`src/app/auto.ts`](file:///c:/Users/amine/Downloads/showroom-auto/showroom-auto/src/app/auto.ts) |
| **Composant En-tête (`HeadBarComponent`)** | En-tête affichant le titre exact obligatoire *« Welcome to my showroom »* | [`src/app/head-bar/head-bar.component.ts`](file:///c:/Users/amine/Downloads/showroom-auto/showroom-auto/src/app/head-bar/head-bar.component.ts) & `.html` |
| **Composant Recherche (`SearchBarComponent`)** | Formulaire de recherche avec saisie, bouton `Search`, chips de marques et grille de modèles | [`src/app/search-bar/search-bar.component.ts`](file:///c:/Users/amine/Downloads/showroom-auto/showroom-auto/src/app/search-bar/search-bar.component.ts) & `.html` |
| **Composant Racine (`AppComponent`)** | Gestion de la liste source `autoList` et de la voiture sélectionnée `selectedAuto` | [`src/app/app.component.ts`](file:///c:/Users/amine/Downloads/showroom-auto/showroom-auto/src/app/app.component.ts) & `.html` |
| **Communication Parent → Enfant (`@Input()`)** | Transmission de la liste `autoList` vers `autos` via `[autos]="autoList"` | [`src/app/search-bar/search-bar.component.ts`](file:///c:/Users/amine/Downloads/showroom-auto/showroom-auto/src/app/search-bar/search-bar.component.ts#L15), `app.component.html` |
| **Communication Enfant → Parent (`@Output()`)** | Événement `@Output() selectAutoEvent = new EventEmitter<Auto>()` | [`src/app/search-bar/search-bar.component.ts`](file:///c:/Users/amine/Downloads/showroom-auto/showroom-auto/src/app/search-bar/search-bar.component.ts#L18) |
| **Émission d'événement (`emit()`)** | Méthode `selectedAuto(auto)` déclenchée par le clic sur `View` | [`src/app/search-bar/search-bar.component.ts`](file:///c:/Users/amine/Downloads/showroom-auto/showroom-auto/src/app/search-bar/search-bar.component.ts#L55) |
| **Réception d'événement (`$event`)** | Liaison d'événement `(selectAutoEvent)="updateAuto($event)"` dans le parent | [`src/app/app.component.html`](file:///c:/Users/amine/Downloads/showroom-auto/showroom-auto/src/app/app.component.html#L14) |
| **Directive structurelle `*ngFor`** | Itération et rendu des cartes de voitures trouvées | [`src/app/search-bar/search-bar.component.html`](file:///c:/Users/amine/Downloads/showroom-auto/showroom-auto/src/app/search-bar/search-bar.component.html#L55) |
| **Directive structurelle `*ngIf`** | Affichage conditionnel des caractéristiques du véhicule et messages d'état | [`src/app/app.component.html`](file:///c:/Users/amine/Downloads/showroom-auto/showroom-auto/src/app/app.component.html#L20-L25), `search-bar.component.html` |
| **Liaison bidirectionnelle `[(ngModel)]`** | Synchronisation en temps réel de la valeur du champ de recherche `brand` | [`src/app/search-bar/search-bar.component.html`](file:///c:/Users/amine/Downloads/showroom-auto/showroom-auto/src/app/search-bar/search-bar.component.html#L14) |
| **Liaison de propriétés `[src]`, `[alt]`** | Affichage dynamique des images locales du dossier `public/photos` | `search-bar.component.html`, `app.component.html` |
| **Liaison d'événements `(click)`** | Déclenchement de `searchAutoList()` et `selectedAuto(auto)` | `search-bar.component.html` |
| **Interpolation `{{ }}`** | Affichage dynamique des propriétés et du formatage de prix | Tous les templates HTML |

---

## 2. Flux de Données & Communication Inter-Composants

```
[ AppComponent ]
   │
   ├─► [autos]="autoList" (Property Binding avec @Input) ──► [ SearchBarComponent ]
   │                                                               │
   │                                                               ├─ Recherche (searchAutoList)
   │                                                               ├─ Rendu des modèles (*ngFor)
   │                                                               └─ Clic bouton "View"
   │                                                                       │
   │   (selectAutoEvent)="updateAuto($event)"                              ▼
   ◄──────────────────────────────────────────────────── selectedAuto(auto).emit(auto)
   │
   ▼
Met à jour `selectedAuto`
Affiche le panneau latéral de détails (*ngIf)
```

---

## 3. Installation et Utilisation Locale

### Prérequis
- **Node.js** (v20+ ou v22+)
- **npm** (v10+)

### Commandes

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement (http://localhost:4200)
npm start

# Exécution des tests unitaires automatisés
npm test -- --watch=false

# Compilation de production
npm run build

# Compilation optimisée pour GitHub Pages (base-href /showroom/)
npm run build:gh
```

---

## 4. Données et Images

Les photos des 16 modèles sont stockées dans `public/photos/` :
- `CLASS-C.webp`, `GLA.webp`, `GLE.webp` (Mercedes Benz)
- `FPACE.webp`, `EPACE.webp` (Jaguar)
- `Q3.webp`, `Q5.webp`, `A3.webp` (Audi)
- `X2.webp`, `IX.webp`, `X3.webp` (BMW)
- `EVOQUE.webp`, `DEFENDER.webp`, `RANGE.webp` (Land Rover)
- `STELVIO.webp`, `GIULIA.webp` (Alfa Romeo)

Un visuel SVG de secours (`placeholder.svg`) est inclus en cas d'erreur de chargement.

---

## 5. Déploiement Continu (CI/CD)

Le workflow GitHub Actions `.github/workflows/deploy.yml` compile automatiquement l'application avec `npm run build:gh` à chaque commit sur la branche `main` et déploie le bundle sur GitHub Pages.
