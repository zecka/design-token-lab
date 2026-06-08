# Revue des approches de tokens couleur

Comparaison des 7 stratégies de tokens explorées dans `src/approach-XX`.
Chaque approche teste une façon différente de nommer, structurer et faire le lien
entre les valeurs brutes et les composants (badge / tag / card).

## Grille de lecture

Toutes les approches partagent les mêmes contraintes du projet :

- Les composants ne référencent que des tokens sémantiques, jamais une valeur brute.
- Les noms de tokens sont agnostiques du thème (pas de « light » / « dark »).
- Les rôles décrivent l'intention (`primary`, `success`, `error`…), pas l'apparence.
- Le nombre de couches entre valeur brute et composant est lui-même une variable testée.

Critères de comparaison : nombre de couches, modèle de nommage, granularité des facettes,
gestion des états (hover/active/focus/disabled), support du multi-theming, et maturité
(implémentée vs spec).

---

## Approche 01 — Primitive → Rôle → Alias composant (3 couches)

**Modèle :** `--primitive-*` → `--role-*` → `--c-*`
**Facettes par rôle :** 6 (`subtle`, `border`, `text`, `base`, `base-hover`, `on-base`)
**Couches :** 3 (+ une couche dédiée aux surfaces : `--role-surface-*` → `--card-*`)
**Theming :** complet — 2 familles (luxury / cozy) × 2 modes (light / dark). Seule la
couche rôle est re-mappée ; les primitives, les alias `--c-*` et les règles de composant
restent identiques. POC multi-theming réel (switch via `data-theme` / `data-mode`).
**Maturité :** implémentation de référence complète (badge + card + surfaces).

### Pros
- Architecture « manuelle » de design system, lisible par tout le monde.
- Les primitives sont réutilisées : un seul endroit pour changer une rampe de couleur.
- Un seul point de re-mapping par thème (la couche rôle) → indirection prouvée solide.
- Surfaces (card, nested) modélisées avec le même contrat que les couleurs.
- Couleurs de marque exactes gérées proprement, contraste AA respecté.

### Cons
- Verbeux (869 lignes) — beaucoup de tokens à maintenir.
- 3 sauts d'indirection : tracer une couleur finale demande de suivre 3 fichiers mentaux.
- Maintenance de la rampe primitive complète même si tous les niveaux ne servent pas.

---

## Approche 02 — Facettes de rôle directes + états explicites (2 couches)

**Modèle :** `--role-*-fill / -tint / -line / -text…` → `--badge-*`
**Facettes par rôle :** ~10 (`fill`, `fill-hover`, `fill-active`, `tint`, `tint-hover`,
`line`, `line-hover`, `text`, `on-fill`, `focus`)
**Couches :** 2 — les valeurs brutes vivent directement dans la couche rôle, pas de primitives.
**Theming :** complet, mais chaque facette est redéfinie en dur pour chaque thème × mode.
**Maturité :** implémentée (le plus gros fichier, 941 lignes).

### Pros
- Chaque état (hover, active, focus) est tokenisé et donc surchargeable par thème.
- Aucune couleur calculée → rendu totalement prévisible, contrôle pixel-perfect.
- Pas de couche primitive à entretenir.

### Cons
- Pas de réutilisation de primitives : les hex bruts sont dupliqués dans chaque thème.
- Duplication massive → fichier le plus lourd, risque de dérive entre tokens.
- Changer la palette globale impose d'éditer chaque thème un par un.

---

## Approche 03 — Dimensions chromatiques perceptuelles

**Modèle :** `--chroma-*`, `--echo-*`, `--trace-*`, `--mark-*`, `--script-*` → `--b-*`
(surfaces : `--leaf`, `--well`, `--rule`, `--shard`, `--glyph`, `--murmur`)
**Facettes par rôle :** 5 dimensions perceptuelles.
**États :** calculés via `filter: brightness()`, pas de tokens d'état dédiés.
**Theming :** complet, les dimensions sont redéfinies par thème.
**Maturité :** implémentée (badge + card).

### Pros
- Jeu de facettes compact (5 dimensions) → CSS léger.
- Séparation fine « encre sur fond vif » (`mark`) vs « encre sur fond doux » (`script`).
- États via filtre = très peu de code.

### Cons
- Nommage métaphorique (`echo`, `murmur`, `shard`…) opaque pour un nouvel arrivant.
- États par `filter` non réglables par thème, et risque de casser le contraste AA.
- S'écarte du vocabulaire standard d'un design system → coût d'onboarding.

---

## Approche 04 — Liaison par slots contextuels

**Modèle :** `--pal-[role]-[prop]` (brut, par thème) → slots génériques
`--_bg`, `--_fg`, `--_tint-bg`, `--_tint-fg`, `--_stroke` posés sur `[data-role]`.
**Facettes :** 4 propriétés palette → 5 slots génériques.
**États :** `filter: brightness()` + wash de tinte au hover.
**Theming :** complet (palette + surfaces redéfinies par thème).
**Maturité :** implémentée (badge + card).

### Pros
- Contrat de slots très léger et générique → réutilisable par n'importe quel composant.
- La liaison rôle est découplée du composant (le composant ignore le rôle actif).
- Le thème possède toute la palette, le composant ne lit que des slots neutres.

### Cons
- Noms de slots génériques (`--_bg`) → perte de sens sémantique au point d'usage.
- 5 slots seulement = peu de nuance pour des états riches.
- États par `filter` non thémables / risque AA.
- Les couleurs de marque sont injectées en hex inline → entorse à la pureté des couches.

---

## Approche 05 — Pile d'intention sémantique (spec uniquement)

**Modèle :** nommage variante-first `--color-{role}-{variant}-{fill|text|border}`
**Facettes par rôle :** 9 (3 variantes × 3 facettes).
**États :** `opacity` / `transform`, aucun token d'état.
**Theming :** non implémenté (pas de light/dark, pas de familles).
**Maturité :** spec markdown seule (`tokens.md`), pas de CSS de thème.

### Pros
- Noms extrêmement lisibles et prévisibles — la variante est dans le nom du token.
- Modèle plat, facile à comprendre immédiatement.
- Auto-documenté.

### Cons
- Spec uniquement : pas de mode sombre, pas de surfaces, pas de multi-theming.
- Explosion de tokens (rôles × variantes × facettes) sans réutilisation.
- Aucun token d'état → interactions non thémables.

---

## Approche 06 — Paires de contraste à états (Stateful Contrast Pairs)

**Modèle :** `--pair-[role]-[variant]-[facet/state]` → alias `--component-*`
**Facettes par rôle :** ~20 — chaque variante × chaque état (hover, active, focus-ring,
focus-gap, disabled-bg/fg/border).
**Couches :** 2-3.
**Theming :** complet (luxury / cozy × light / dark).
**Maturité :** implémentée + inclut une table d'analyse comparative des autres approches.

### Pros
- Contrat le plus complet : chaque état et variante est thémable.
- Le contraste est traité comme le contrat portable (idée forte).
- Focus et disabled tokenisés → meilleure accessibilité par défaut.
- Zéro calcul → contrôle total et prévisibilité parfaite.
- Auto-documenté (analyse « aware mode »).

### Cons
- Surface de tokens la plus grande (~20 facettes × 10 rôles × 4 thèmes).
- Coût d'authoring et de maintenance le plus élevé.
- Duplication importante par thème, risque de dérive sur de nombreux tokens.
- Surdimensionné pour des composants simples.

---

## Approche 07 — Slots génériques uniformes par état + opacité (brouillon)

**Modèle :** slots `--_bg / --_fg / --_border / --_opacity` déclinés par état
(hover/active/focus) et par variante (`soft`), alimentés par `--color-{role}-*`.
**Particularité :** `opacity` comme facette à part entière ; sélecteurs d'attribut
nus (`[color="primary"]`, `[soft]`) plutôt que `data-*`.
**Maturité :** brouillon — uniquement `primary` + variante `soft`, aucune palette définie,
pas de thème, pas de card.

### Pros
- Mapping d'état uniforme et propre au niveau composant (`.tag`).
- `opacity` comme facette = gestion élégante du disabled.

### Cons
- Incomplet : tokens de couleur non définis, un seul rôle, pas de theming.
- Sélecteurs d'attribut non standard (`[color]` au lieu de `data-role`).
- Le moins mature des sept.

---

## Tableau récapitulatif

| # | Stratégie | Couches | Facettes/rôle | États | Theming | Maturité |
|---|-----------|---------|---------------|-------|---------|----------|
| 01 | Primitive → Rôle → Alias | 3 (+surfaces) | 6 | `base-hover` token + règles variantes | Complet | Référence |
| 02 | Facettes directes + états | 2 | ~10 | Tous tokenisés | Complet | Implémentée |
| 03 | Dimensions chromatiques | 2-3 | 5 | `filter` calculé | Complet | Implémentée |
| 04 | Slots contextuels | 2 | 5 slots | `filter` calculé | Complet | Implémentée |
| 05 | Intention sémantique | 1-2 | 9 | opacity/transform | Aucun | Spec seule |
| 06 | Paires de contraste | 2-3 | ~20 | Tous tokenisés | Complet | Implémentée |
| 07 | Slots uniformes + opacité | 2 | 4 ×états | Tous tokenisés | Aucun | Brouillon |

---

## Conclusion & recommandation

**Recommandation principale : Approche 01 (Primitive → Rôle → Alias composant).**

C'est le meilleur compromis pour une mise en production :

- Architecture standard d'un design system → lisible et transmissible.
- Réutilisation des primitives → un seul endroit pour faire évoluer une rampe.
- Un unique point de re-mapping par thème, prouvé sur 4 combinaisons thème × mode.
- Surfaces et composants (card, badge) intégrés au même modèle, sans valeur brute au point d'usage.
- Implémentation complète et déjà éprouvée.

**Si un contrôle maximal des états par thème est requis** (interactions très dessinées,
besoins d'accessibilité stricts sur focus/disabled), **l'approche 06** est la plus rigoureuse :
elle tokenise tout et traite le contraste comme contrat portable. Le prix est une maintenance
lourde et un grand nombre de tokens.

**Piste hybride conseillée :** garder la structure 3 couches de l'approche 01
(primitive → rôle → alias) et n'emprunter les tokens d'état explicites de 02/06
que là où les états calculés (`filter`) échouent au contraste AA. On combine ainsi
la maintenabilité de 01 avec le contrôle ciblé des états, sans payer l'explosion de tokens de 06.

**À écarter pour la production :** approches 05 et 07 (incomplètes — spec ou brouillon).
L'approche 03 reste séduisante mais son nommage métaphorique et ses états par `filter`
non thémables la réservent à un contexte expérimental.
