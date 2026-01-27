---
sidebar_position: 1
---

# Connaître les clés `endoflife.date` avec geol

Il existe de nombreuses clés utilisées par endoflife.date ; elles associent les produits à des métadonnées telles que versions, dates de sortie et dates de fin de vie.

## Produits

Un produit est un élément géré par geol (par exemple : Windows, Ubuntu, iPhone...).

```shell
geol list products    # liste les produits disponibles 
geol help product     # affiche toutes les commandes pour un produit spécifique
```
Pour choisir le nombre de cycles de versions à afficher, utilisez `extended` avec l'option `-n`. Par exemple :
```shell
geol product extended <product-name> -n20
```
Cela affiche les 20 cycles de versions les plus récents (chacun avec sa date de sortie), listant typiquement la dernière version pour chaque cycle en premier.

## Catégories

Une catégorie regroupe des produits liés (par exemple : bibliothèques, runtimes).
```shell
geol list categories
```

## Tags

Un tag est un mot-clé court utilisé pour étiqueter et filtrer les produits.
```shell
geol list tags
```
