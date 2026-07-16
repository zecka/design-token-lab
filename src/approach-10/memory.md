# Approach 10 — mémoire des décisions

Journal des choix d'architecture de l'approche « Seed Derivation + Hue Channel ».
Chaque entrée: la décision, pourquoi, et les alternatives écartées avec la raison.

---

## 1. Fondations

### Seeds + dérivation `color-mix()` en OKLab

**Décision.** Seules les seeds sont des valeurs littérales: 3 couleurs de base (`background`, `surface`, `foreground`) et 2 par teinte (`--color-x`, `--color-x-foreground`). Tout le reste (hover, soft, soft-hover, soft-foreground, ink, separators, disabled, niveaux secondary/tertiary) est calculé par `color-mix(in oklab, …)`.

**Pourquoi.** Redéfinir une seed recalcule toute sa famille. Un mode dark complet = 3 seeds redéfinies. Un thème (cozy) = radius + 3 seeds de base + 2 seeds accent. Les paires highlight (bg + foreground) sont autonomes et ne dépendent pas du mode.

**Écarté.**
- *Tables hex statiques remappées par thème×mode* (ce que font les approches 01 à 06): chaque combinaison duplique tout le vocabulaire, ajout d'un thème = repeindre chaque token.
- *Display P3 comme format de référence*: OKLCH est plus simple à manipuler et fonctionne nativement avec `color-mix()`. Une génération P3 wide-gamut reste possible plus tard (comme Radix UI).

### Ratios de dérivation

- hover = 85 % teinte + 15 % de son foreground (direction toujours perceptible, quelle que soit la clarté de la teinte)
- soft = 14 % teinte + surface, soft-hover = 22 % (adaptatif au dark mode puisque surface change)
- soft-foreground = 55 % teinte + 45 % foreground de page (adaptatif aussi)
- ink = alias de soft-foreground
- ink-hover = 70 % ink + 30 % foreground de page. Dérivé de `ink` (pas de la formule brute): les overrides d'ink par teinte (brand1) se propagent automatiquement. Directionnel selon le mode: fonce en light, éclaircit en dark.

**Exception unique**: `brand1` (jaune clair) passe son soft-foreground à 38 % de teinte, sinon illisible. Volontairement la seule dérogation — elle prouve que la règle générale tient.

### Nommage des teintes

**Décision.** `accent` (pas `primary`), `danger` (pas `error`), `separator` (pas `border`), `neutral` comme défaut.

**Pourquoi.** `primary`/`secondary` entrent en collision avec les niveaux de hiérarchie (`--color-foreground-secondary`). `border` entre en collision avec la propriété CSS et les utilities Tailwind. `separator` décrit l'intention, pas l'implémentation.

### États

- **active** = `transform: var(--pressed-transformation)`, pas de couleur dédiée.
- **focus** = ring (`--color-focus`, alias accent), pas de couleur par teinte.
- **disabled** = couleurs dédiées neutres dérivées. *Écarté: opacité globale* — trop dépendante du background et conserve la couleur sémantique d'origine.
- Pas de token d'état pour le foreground: le feedback d'interaction est porté par le background.

### Brand colors

Hex exacts obligatoires en seeds (`#F6D425`, `#3B2A5A`, `#3B6FB5`), foregrounds choisis pour AA: 9.8:1, 11.3:1, 5.1:1. Dérivés par les mêmes formules que toute teinte.

---

## 2. Le canal hue

### `data-color` publie des variables génériques `--hue-*`

**Décision.** `[data-color="x"]` pose `--hue`, `--hue-hover`, `--hue-foreground`, `--hue-soft`, `--hue-soft-hover`, `--hue-soft-foreground`, `--hue-ink`. Les composants lisent `var(--hue-*, <défaut>)`. Pas de notion de « rôle »: n'importe quelle couleur sur n'importe quelle variante.

**Pourquoi.** Un seul mécanisme d'override d'instance, réutilisable par tout composant qui opte. Le HTML de l'approche est cloné (pas d'includes partagés) pour ne pas être influencé par le vocabulaire `data-role` de l'existant.

**Limitation assumée: le canal recolore, il ne restyle pas.** C'est la variante qui décide quelles facettes écoutent le canal et sur quel slot. Exemple: secondary étant outline par défaut, son bg est transparent par construction — impossible d'écrire `--_button-bg: var(--hue, transparent)` et d'attendre qu'un `data-color` produise un bouton plein. Le canal opère à l'intérieur du style choisi par la variante. Cette opinion est la contrepartie du modèle; documentée dans l'index.html (bloc « Limitation » de la couche canal).

**Écarté.**
- *Canal nommé `--color`, `--color-hover`, `--color-foreground`* (proposition initiale): collision frontale — `--color-foreground` est déjà le token de base du texte, hérité partout, donc le fallback ne jouerait jamais. D'où le namespace `--hue-*`.
- *Overrides directs par rôle* (`.badge[data-role=x] { --_badge-bg: … }`): déjà exploré par les approches existantes, re-crée la notion de rôle.

### Résolution du canal une fois par composant

**Décision.** `.badge` résout le canal dans des slots privés (`--_hue: var(--hue, var(--color-neutral))`, etc.); les variantes lisent les slots résolus.

**Pourquoi.** Pattern « pseudo-private » de Lea Verou: le fallback est défini une seule fois, le défaut neutral vit à un seul endroit au lieu d'être répété dans chaque variante. Le bouton ne le fait pas: ses fallbacks diffèrent par variante (c'est son opinion), la centralisation n'a pas de sens.

### Garde-fou `@property`

**Ne jamais enregistrer `--hue-*` avec `@property`.** Une syntaxe typée (`<color>`) exige une initial-value, et sur une propriété enregistrée l'initial-value gagne sur les fallbacks de `var()` — la propriété n'est plus jamais « guaranteed-invalid ». Tout le mécanisme de défaut des composants serait silencieusement désactivé.

---

## 3. Composants

### Badge orthogonal, bouton orienté UX

**Décision.** Le badge expose variant × couleur librement. Le bouton n'expose que 5 combinaisons validées: `primary` (solid × accent), `secondary` (outline × neutral), `ghost`, `danger` (solid × danger), `danger-soft`.

*Révision:* `secondary` était initialement soft × neutral; le style par défaut retenu est outline (bg transparent, fg `neutral-ink`, border `currentColor`, hover = remplissage soft, canal via `--hue-ink`/`--hue-soft`). Son disabled garde la structure outline (border `separator`), comme le badge outline.

**Pourquoi.** Analyse des trois philosophies d'API (orthogonale type Radix Themes / orientée UX type Base Web, HeroUI, Carbon / hybride BaseButton + Button). L'orientée UX guide les équipes et reflète les bonnes pratiques du DS, et la flexibilité reste disponible via le canal hue.

**Écarté.**
- *API orthogonale sur le bouton*: autorise des combinaisons sans sens UX (`ghost + danger`…).
- *Hybride `BaseButton` + `Button`*: deux API à maintenir, couche d'abstraction en plus — inutile ici puisque le canal hue joue déjà le rôle d'échappatoire.

### Lock des variantes danger

**Décision.** `danger` et `danger-soft` ne lisent jamais `--hue-*`: `data-color` est sans effet. Le lock est structurel (absence de lecture), pas logique.

**Pourquoi.** La sémantique destructive ne se détourne pas au niveau d'une instance. Le thème garde autorité (via les seeds danger et les hooks `--ui-*`): le lock vise la décision d'instance, pas le theming.

### Tokens composant privés `--_*`

**Décision.** Tous les tokens portés par le CSS d'un composant sont préfixés `--_` (`--_button-bg`, `--_badge-fg`, `--_card-surface`).

**Pourquoi.** Distinction API publique vs plomberie interne. Personne n'est censé écrire `style="--_button-bg: red"` — l'override sanctionné passe par le canal ou les hooks. Convention popularisée par Lea Verou (« private custom properties »), écho au `_private` de JS/Python, visible dans Open Props et CUBE CSS. Attention: l'approche 04 du playground utilise `--_` avec un autre sens (slots contextuels).

---

## 4. La couche composant publique: hooks latents `--ui-*`

### Hooks non déclarés par défaut

**Décision.** Chaque variante du bouton (et le radius de chaque composant) est surchargeable via des tokens `--ui-<composant>-<variante>-<facette>` qui n'existent pas par défaut. Le composant les lit avec fallback:

```css
--_button-bg: var(--hue, var(--ui-button-primary-bg, var(--color-accent)));
```

Priorité partout: **canal (instance) > hook (thème/scope) > défaut validé**.

**Pourquoi.** Un thème peut rethémer une variante précise sans toucher au CSS composant (« un thème = des tokens »). Coût zéro par défaut: un custom property non déclaré n'existe pas, le contrat déclaré ne grossit pas. Bonus: propriétés héritées, donc theming de scope gratuit (poser les hooks sur une section retinte cette section). Pattern connu de Shoelace.

**Écarté (chronologie du raisonnement).**
1. *Contrat par composant déclaré dans `:root`* (`--button-secondary: var(--color-neutral-soft)`): croissance en O(composants × variantes × facettes) — le piège Material 3 (`md.comp.*`, des milliers de tokens que personne ne surcharge).
2. *Hue d'intention `subtle`* (famille dérivée aliasant neutral, consommée par secondary/ghost): borne la croissance au langage de design, mais collision de vocabulaire frontale (`--color-subtle-foreground` vs `--color-foreground-secondary`) et une famille entière pour un seul consommateur.
3. Les hooks latents gagnent: cohérents avec la règle « un token ne devrait être ajouté que si un besoin récurrent apparaît ».

**Contreparties assumées.** Pas de dérivation automatique (surcharger `-bg` n'entraîne ni hover ni fg: le thème pose les hooks nécessaires, idéalement vers une famille dérivée existante pour rester réactif au dark mode). Découvrabilité nulle en devtools: la liste des hooks est documentée en commentaire de section.

### Facette `border`: les styles aussi sont rethémables

**Décision.** Chaque variante expose un 4e hook `--ui-button-<variante>-border` (défaut `transparent`). Les 4 facettes {bg, bg-hover, fg, border} couvrent tous les styles (solid, soft, outline, ghost): un thème peut donc transformer le style d'une variante par tokens seuls — exemple, primary en outline = bg transparent + fg `accent-ink` + border `currentColor`.

**Pourquoi.** Sans hook border, un thème ne pouvait pas rendre le secondary outline (la bordure était privée, figée transparente). Compléter l'espace de facettes résout la classe entière de besoins « changer le style d'une variante », sans nouveau concept. La chaîne border n'a que 2 niveaux (hook > défaut, pas de `--hue-*`): la bordure est une facette de style, pas de couleur — en `currentColor` elle suit le fg, qui écoute déjà le canal.

**Écarté.**
- *Token de style* (`--ui-button-secondary-style: outline`): CSS ne branche pas sur la valeur d'un token sans hacks (space toggles), complexité disproportionnée.
- *Le thème cible `.button[data-variant]` en CSS*: viole « un thème = des tokens ».
- *Changer le markup*: décision produit, pas thème, et casserait l'API orientée UX.

**Limite assumée.** Le thème doit poser des hooks cohérents; le système ne valide pas la lisibilité de la combinaison. Prix du niveau d'abstraction facettes, acceptable tant que les thèmes sont écrits par des gens du DS.

### Facette `fg-hover` + token dérivé `ink-hover`

**Décision.** Besoin déclencheur: un thème veut un bouton outline dont le hover garde le fond transparent, seuls texte et bordure changent. Deux ajouts:
1. Facette `fg-hover` sur le bouton, défaut = `var(--_button-fg)` (texte stable au hover — la doctrine « le background porte le feedback » reste le défaut, elle devient non obligatoire). Hooks `--ui-button-<variante>-fg-hover`, chaîne à 2 niveaux (facette de style, pas de `--hue-*`).
2. Token dérivé `--color-x-ink-hover` sur les 12 teintes + slot `--hue-ink-hover` dans le canal: la grammaire du DS dit « outline = ink », il fallait la réponse systémique pour son hover, plutôt que laisser chaque thème pointer une valeur à la main.

**Écarté.**
- *`filter: brightness()` au hover*: global, dénaturerait les hex brand exacts.
- *fg-hover lisant le canal* (`var(--hue-ink-hover, …)` en tête de chaîne): casserait les variantes solid/soft recolorées par `data-color` (leur texte doit rester stable au hover). Le canal ne sait pas quelle facette une variante utilise.

**Limite connue (composition thème × instance).** Si un thème pointe `--ui-button-secondary-fg-hover: var(--color-neutral-ink-hover)` et qu'une instance ajoute `data-color="danger"`, le texte est danger au repos mais le hover retombe sur l'ink-hover *neutral* du hook (le hook ne peut pas être relatif à la teinte de l'instance). Documentée et démontrée dans index.html (section « Known Limit — Theme Hooks × data-color »). Résoudre demanderait des tokens relatifs à la teinte courante dans les hooks — non traité, besoin non récurrent à ce stade.

### Composant `link`

**Décision.** Lien inline dans du texte: couleur `ink` (accent par défaut), souligné, hover `ink-hover`. Recolorable par `data-color` (chaîne canal > défaut). Pas de hooks `--ui-link-*` tant qu'aucun besoin de theming n'apparaît (règle du besoin récurrent).

**Pourquoi.** C'est l'habitat naturel du token ink (« cette teinte, lisible comme texte sur la page ») — le composant met en avant la paire ink/ink-hover sans background pour porter le feedback.

### Choix du préfixe `--ui-`

**Décision.** `--ui-` marque toute la couche composant publique.

**Pourquoi.** Court, prononçable, se lit « couche interface ». Rend l'inventaire greppable. Résout les clashs fondation/composant: `--radius-field` (token sémantique) vs un futur composant field (`--ui-field-*`) — deux univers disjoints par construction. Le préfixe reste remplaçable par un chercher-remplacer si on change d'avis.

**Écarté.** `--hook-` et `--set-` (marquent la latence, pas la couche — jugés peu clairs), *sans marqueur* (hooks indistinguables des tokens déclarés), `--component-` (trop long), `--comp-`/`--cmp-` (lourd/imprononçable), `--c-` (cryptique + sens différent dans l'approche 01), `--el-` (element ≠ component), `--kit-` (marketing).

### Radius composant hors du `:root`

**Décision.** `--radius-badge/-button/-card` supprimés des fondations. Chaque composant lit `var(--ui-<composant>-radius, var(--radius-<catégorie>))`; les tokens sémantiques (`--radius-box/field/selector/full`) portent en commentaire leurs composants cibles.

**Pourquoi.** Les fondations ne doivent porter aucune connaissance composant (objectif: fondations exportables seules). Et détail décisif: un hook *déclaré sur l'élément* battrait l'héritage, un thème ne pourrait plus le surcharger depuis `:root` — d'où le pattern latent + fallback aussi pour le radius.

---

## 5. Écriture de la chaîne de fallback

**Décision.** Chaîne brute à trois niveaux sur une ligne par facette, avec un commentaire de priorité au-dessus du bloc (`/* channel > hook > vetted default */`).

**Écarté.**
- *Alignement en colonnes*: lisible mais maintenance manuelle infernale, détruit par tout formateur.
- *Résolution en deux temps* (variable intermédiaire `--_vetted-*`): chaque ligne plus simple mais 2× plus de lignes et une indirection de plus — déplace la complexité sans la supprimer.
- *`@function` CSS* (`--HUE(--ui-button-primary-bg, --color-accent)`): impossible tel quel — les paramètres reçoivent des valeurs, CSS n'a aucune indirection sur les noms (`var()` exige un ident littéral). La version passant des valeurs gagne un seul niveau d'imbrication et repose sur des subtilités IACVT non garanties.

**Piste future: plugin PostCSS.** Contrairement à `@function`, un plugin transpile au build et peut donc manipuler des *noms* de tokens. Une syntaxe sucre du genre `--_button-bg: hue(--ui-button-primary-bg, --color-accent);` pourrait être expansée en la chaîne complète `var(--hue, var(--ui-button-primary-bg, var(--color-accent)))` — l'écriture devient courte, le CSS livré reste du CSS standard, et la convention de priorité est garantie par l'outil au lieu d'être une discipline manuelle. Hors périmètre de ce playground (contrainte « no build-time CSS processing »), mais pertinent pour une vraie distribution du DS.

---

## 6. Pistes futures

- **`@function` pour les ratios de dérivation**: les formules répétées 12 fois (85 %, 14 %, 22 %, 55 %) sont le vrai cas d'usage — ratios centralisés, changer la force du hover = une ligne. L'API (noms de tokens) ne bougerait pas.
- **Relative color syntax** (`oklch(from var(--color-danger) …)`) comme implémentation alternative de la dérivation — remplaçable sans toucher composants ni thèmes.
- **Génération Display P3** pour écrans wide-gamut (à la Radix UI).
- **Split physique `foundations.css` / `components.css`** pour matérialiser l'exportabilité des fondations seules.
