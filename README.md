# Boutique du Haut Conseil — HCFCED

Site autonome de la boutique du Haut Conseil : catalogue commun, marques, vitrines individuelles et panier de démonstration.

- Site : https://jean-aristid.github.io/BOUTIQUE_HCFCED/
- Dépôt : https://github.com/Jean-Aristid/BOUTIQUE_HCFCED
- Association : https://jean-aristid.github.io/SITE_HCFCED/

## Fichiers à modifier

| Contenu | Fichier |
| --- | --- |
| Structure et textes | `index.html` |
| Apparence | `assets/css/main.css` |
| Catalogue, recherche, filtres et panier | `assets/js/main.js` |
| Produits et marques | `assets/data/catalogue.js` |
| Images | `assets/images/` |
| Périmètre et étapes suivantes | `docs/BOUTIQUE.md` |

Une seule liste de produits alimente le catalogue commun, les filtres et les vitrines. Ne pas recopier une page HTML pour chaque entrepreneure.

## Consulter et vérifier

Depuis ce dossier :

```sh
python -m http.server 8001 --bind 127.0.0.1
node scripts/check.cjs
```

Ouvrir http://localhost:8001. Le site fonctionne aussi en ouvrant directement `index.html`.

## Ajouter une marque

Ajouter ses produits dans `assets/data/catalogue.js` avec un identifiant numérique unique, le même nom de marque dans `seller`, un prix numérique, une catégorie existante et une variante visuelle `v1` à `v8`. La marque apparaît automatiquement dans la liste des boutiques. Les variantes sont des illustrations de démonstration à remplacer par les visuels autorisés.

Exemple de vitrine partageable :

https://jean-aristid.github.io/BOUTIQUE_HCFCED/index.html?boutique=Amina%20Cr%C3%A9ations#catalogue

## Publication

Ce dossier est un dépôt indépendant relié à `BOUTIQUE_HCFCED`. Un push sur `main` déclenche `.github/workflows/pages.yml`, qui vérifie les interactions et publie uniquement les fichiers HTML et `assets/` après les avoir rassemblés dans `_public/`.

Dans **Settings → Pages**, choisir **GitHub Actions**. Le site ne dépend d’aucun fichier du projet associatif. L’adhésion est accessible par un lien vers le site de l’association.

Pour changer de domaine, modifier les liens externes dans `index.html` et les liens vers la boutique dans le projet associatif.

Les marques, produits et prix sont fictifs. Aucun paiement, compte vendeuse ou enregistrement de commande n’est activé.
