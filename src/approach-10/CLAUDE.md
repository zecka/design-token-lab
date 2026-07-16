# Approach 10 — règles de travail

## Documentation

Pas de fichier de documentation séparé. La doc vit à deux endroits, et deux seulement:

- **le code** (`index.css`) — ne pas hésiter à mettre des commentaires directement dans le code quand c'est pertinent (contrats, listes de hooks latents, garde-fous, exceptions);
- **`index.html`** — le token map et les démos montrent l'architecture en fonctionnement.

`memory.md` n'est pas de la doc: c'est le journal des décisions (pourquoi + alternatives écartées). Le tenir à jour à chaque décision d'architecture, ne pas y mettre de doc d'usage.

## Règles essentielles

- Priorité de résolution, partout: canal (`--hue-*`, instance via `data-color`) > hook (`--ui-*`, thème/scope) > défaut validé (token fondation).
- Seules les seeds sont des valeurs littérales. Tout le reste dérive par `color-mix(in oklab, …)`.
- Les fondations (`:root`) ne portent aucune connaissance composant.
- `--_*` = privé au composant, jamais surchargé de l'extérieur. `--ui-<composant>-*` = hooks publics latents: jamais déclarés par défaut (un hook déclaré sur l'élément battrait l'héritage et tuerait la surcharge par thème). Tout nouveau hook doit être listé dans le commentaire de section de son composant.
- Ne jamais enregistrer `--hue-*` avec `@property` (l'initial-value tuerait les fallbacks).
- Pas de notion de « rôle ». Nommage: `accent` (pas primary), `danger` (pas error), `separator` (pas border).
- Un token ne s'ajoute que si un besoin récurrent apparaît.
- Avant de proposer un changement d'architecture: lire `memory.md` — l'alternative a peut-être déjà été rejetée. Poser les questions une à une, en français.
