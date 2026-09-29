# Périmètre de la boutique

La boutique du Haut Conseil est un site à part entière, indépendant du site de l’association. Elle reprend la maquette existante, son identité verte et dorée, le catalogue et le panier de démonstration.

## Fonctionnement actuel

- Treize offres fictives (produits et prestations) réparties entre onze profils, membres ou non adhérents.
- Dix catégories et 66 sous-catégories issues des consignes, sans doublon « Boissons naturelles ». « Costumes et chemises » est conservé comme sous-catégorie distincte.
- Une source de données pour le catalogue et toutes les vitrines.
- Sélection d’une marque par le paramètre `boutique` de l’URL.
- Filtres par catégorie, sous-catégorie, type d’offre et boutique ; recherche tolérante aux accents.
- Fiches de produits et prestations ; préparation téléchargeable d’une demande de service sans envoi.
- Panier groupé par vendeuse, en mémoire et réinitialisé au changement de page, sans paiement.
- Mini-boutiques avec présentation, logo ou emplacement de logo, coordonnées et conditions de livraison France/international.
- Espace vendeuse : création d’un brouillon local d’entreprise, logo, ajout/modification/suppression d’offres, aperçu et export JSON.
- Rubriques commandes et avis préparées avec état vide explicite : aucun avis ni commande simulé comme réel.
- Aucune redirection vers le site associatif ou son parcours d’adhésion.
- Publication GitHub Pages indépendante du site associatif.

## À préciser pour une ouverture réelle

- Marques, produits, prix, photos et présentations autorisées.
- Redirection vers les boutiques existantes ou prise de commandes sur ce site.
- Modalités de vente, livraison et retours, gestion des stocks et prestataire de paiement.
- Authentification et stockage distant pour rendre les brouillons publiables et accessibles sur plusieurs appareils.
- Validation des vendeuses, commissions éventuelles, avis vérifiés et gestion effective des commandes.

La démonstration statique ne contient aucun serveur de commandes, compte vendeuse ou paiement. Les brouillons sont stockés sous la clé `BOUTIQUE_HCFCED.vendeuse.v1` dans le navigateur et ne sont pas envoyés. Le contenu du projet associatif n’est pas dupliqué ici.
