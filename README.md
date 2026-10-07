# Boutique du Haut Conseil — HCFCED

Plateforme multivendeuse de démonstration, ouverte aux membres du Haut Conseil et aux entrepreneures non adhérentes. Dix catégories, 67 sous-catégories, produits et prestations, mini-boutiques et espace de préparation vendeuse.

- Site : https://jean-aristid.github.io/BOUTIQUE_HCFCED/
- Dépôt : https://github.com/Jean-Aristid/BOUTIQUE_HCFCED

## Fichiers à modifier

| Contenu | Fichier |
| --- | --- |
| Structure et textes | `index.html` |
| Apparence | `assets/css/main.css` |
| Catalogue, recherche, filtres et panier | `assets/js/main.js` |
| Produits et marques | `assets/data/catalogue.js` |
| Catégories et sous-catégories | `assets/data/categories.js` |
| Modèle partagé et stockage local | `assets/js/marketplace.js` |
| Espace vendeuse | `espace-vendeuse.html` et `assets/js/vendeuse.js` |
| Styles des nouveaux parcours | `assets/css/marketplace.css` |
| Images | `assets/images/` |
| Périmètre et étapes suivantes | `docs/BOUTIQUE.md` |

Une seule liste de produits alimente le catalogue commun, les filtres et les vitrines. Ne pas recopier une page HTML pour chaque entrepreneure.

## Consulter et vérifier

Depuis ce dossier :

```sh
python -m http.server 8001 --bind 127.0.0.1
node scripts/check.cjs
```

Ouvrir http://localhost:8001. Utiliser ce serveur pour que le catalogue et l’espace vendeuse partagent le même stockage local ; l'ouverture directe des fichiers ne garantit pas ce partage dans tous les navigateurs.

## Ajouter une marque

Pour essayer le parcours, ouvrir `espace-vendeuse.html`, enregistrer l’entreprise, son logo, ses coordonnées et ses conditions de livraison, puis ajouter des offres. Le statut distingue les membres et les entrepreneures non adhérentes. Le brouillon apparaît dans le catalogue uniquement sur ce navigateur. Modification et suppression des offres, aperçu de la mini-boutique et export JSON sont disponibles. Un seul brouillon d’entreprise est conservé par navigateur ; il ne s’agit pas d’un compte privé ni d’une candidature transmise.

Pour ajouter une marque visible par tous, modifier `sellerProfiles` dans `assets/data/catalogue.js`, puis ses offres dans `data` : identifiant texte unique, `sellerId` correspondant au profil, `cat` issu du référentiel, `sub` correspondant exactement à une sous-catégorie, `type` (`product` ou `service`), prix numérique (`null` pour une prestation sur devis), description et variante `v1` à `v8`. Publier ensuite le code. Les profils actuels et leurs statuts sont fictifs ; les avis et coordonnées non renseignés ne sont pas inventés.

Les logos des brouillons acceptent JPEG, PNG et WebP jusqu’à 500 Ko. La préparation d'une demande de prestation produit un fichier texte à télécharger, sans envoi automatique. Le panier regroupe les produits par vendeuse et affiche un total hors livraison ; il ne crée aucune commande.

Exemple de vitrine partageable :

https://jean-aristid.github.io/BOUTIQUE_HCFCED/index.html?boutique=amina#catalogue

## Publication

Ce dossier est un dépôt indépendant relié à `BOUTIQUE_HCFCED`. Un push sur `main` déclenche `.github/workflows/pages.yml`, qui vérifie les interactions et publie uniquement les fichiers HTML et `assets/` après les avoir rassemblés dans `_public/`.

Dans **Settings → Pages**, choisir **GitHub Actions**. Le site ne dépend d’aucun fichier du projet associatif. Aucun lien ne renvoie vers le site de l’association.

Le déploiement et la navigation de cette boutique sont entièrement autonomes.

Les exemples couvrent les dix univers avec 13 offres et 11 profils fictifs. Authentification, publication distante par les vendeuses, paiements, commandes réelles, avis vérifiés et calcul des frais de livraison restent à raccorder à un service de commerce. Les rubriques commandes et avis affichent leur état indisponible sans fabriquer d’activité.


Réorganisation du 7 octobre 2026 : catégories dès l’entrée vendeuse, Boissons séparées, Gastronomie et traiteur, photo par offre. Voir `docs/MODIFICATIONS_VOCAUX_2026-10-07.md` (depuis la racine). Comptes et publication non activés : hébergement à choisir.
