# Dame Ornibest — le site (Jekyll)

Ton site complet, prêt à être publié sur GitHub Pages. Tout ce que tu écris se trouve dans des fichiers texte simples ;
les pages, les menus, la recherche et les cartes se construisent tout seuls.

## 1. Publier le site sur ton nouveau compte GitHub

1. Crée un compte sur github.com (nom d'utilisateur de ton choix, par exemple `dameornibest`).
2. Crée un dépôt **public** nommé exactement `TON-NOM-UTILISATEUR.github.io` (ex. `dameornibest.github.io`).
3. Dans le dépôt : **Add file → Upload files**, glisse **tout le contenu de ce dossier** (pas le dossier lui-même), puis **Commit changes**.
   Vérifie que les dossiers `_posts`, `_layouts`, `_includes`, `_data` et `assets` sont bien envoyés (les dossiers qui commencent par `_` comptent).
4. **Settings → Pages → Build and deployment → Source : Deploy from a branch → Branch : `main` / `(root)` → Save.**
5. Attends 1 à 2 minutes : le site est en ligne sur `https://TON-NOM-UTILISATEUR.github.io`.

Si ton dépôt porte un autre nom (site « projet »), ouvre `_config.yml` et mets `baseurl: "/nom-du-depot"`.

## 2. Ajouter une publication (une par jour)

1. Copie un modèle du dossier `_templates/` (`article.md`, `photo.md` ou `video.md`) dans `_posts/`.
2. Renomme-le **`AAAA-MM-JJ-titre-sans-accent.md`** (ex. `2026-11-16-mon-pain-de-mie.md`). Le titre du fichier devient l'adresse de la page.
   Aucune date avant le 8 novembre 2026 : l'article socle est la toute première publication.
3. Remplis l'en-tête (entre les deux lignes `---`) avec les valeurs de `GUIDE.md` (planète, rubrique, sous-rubrique), puis écris ton texte en dessous.
4. Pour une photo : mets ton image dans `assets/img/posts/` et écris son chemin dans `image:`.
   Pour une vidéo YouTube : colle son adresse dans `video_url:` (la vidéo s'affiche dans la page).
5. Envoie le fichier sur GitHub (**Add file → Upload files**). La publication apparaît automatiquement :
   sur la planète et la sous-rubrique choisies, sur l'accueil (les 3 plus récentes), dans « Toutes les publications » et dans la recherche.

La version anglaise est facultative : le bloc `body_en` (et `title_en`, `resume_en`) alimente le bouton EN. Sans lui, le texte reste en français.

## 3. Remplacer les exemples par tes vraies publications

Les 49 publications datées du 9 au 15 novembre 2026 sont des **modèles d'exemple** (badge « Exemple ») : elles montrent chaque type de contenu
et sont écrites à la première personne comme si c'était toi. Modifie-les avec tes vraies expériences, ou supprime-les du dossier `_posts/`
(et leur image dans `assets/img/posts/`). Quand tu n'as plus d'exemples, mets `show_example_badge: false` dans `_config.yml`.
Les images sont des illustrations générées : remplace-les par tes photos (même nom, ou change `image:`).
Les vidéos d'exemple n'ont pas de lien : ajoute le tien dans `video_url:` (retire le `#` au début de la ligne).

## 4. Réglages à faire une fois (`_config.yml`)

- `social` : l'adresse de tes profils YouTube, TikTok, Pinterest, Instagram (sans adresse, l'icône s'affiche sans lien).
- `contact_email` : ton e-mail de contact (affiché sur la page Contact). Laisse vide si tu préfères les messages sur les réseaux.
- `newsletter_action` : l'adresse d'envoi du formulaire fournie par ton service de newsletter (Buttondown, Brevo, MailerLite…).
  Tant qu'elle est vide, le formulaire invite à s'inscrire via les réseaux.
- Pages **Mentions légales** et **Confidentialité** : ce sont des textes de départ, à relire et à adapter à ta situation (je ne suis pas juriste).

## 5. Mettre à jour l'accueil

- `_data/ornibestweek.yml` : le bilan #OrnibestWeek du dimanche (date, note, pourcentages 0 à 100).
- `_data/explore.yml` : « En ce moment, j'explore… » (titre, niveau, jours de pratique).
- `_data/realisations.yml` : les quatre blocs de « Mes réalisations ».
- `_data/planets.yml` : les planètes, rubriques et sous-rubriques (si tu en ajoutes, ajoute-les aussi ici).

## 6. Tester chez toi (facultatif)

Installe Ruby, puis dans ce dossier : `bundle install` puis `bundle exec jekyll serve`, et ouvre http://localhost:4000.

## Structure

```
_config.yml        réglages
_data/             planètes, bilan de la semaine, exploration, réalisations
_includes/         en-tête, pied de page, carte de publication
_layouts/          modèles de page (général, planète, publication)
_posts/            les publications (une par fichier)
_templates/        modèles à copier (non publiés)
assets/            style.css, script.js, images
*.html             pages du site (accueil, planètes, à propos…)
```
