# Portfolio Personnel - Next.js & Supabase

Ce projet présente un portfolio personnel interactif, développé avec Next.js et Supabase, intégrant des animations dynamiques grâce à GSAP, un design responsive et optimisé pour le SEO.

---

## 🚀 Technologies utilisées

- **Framework** : Next.js
- **Base de données** : Supabase
- **Animations** : GSAP
- **Tests Unitaires** : Jest
- **Hébergement** : Vercel
- **Certificat SSL** : HTTPS via Vercel

---

## 📋 Fonctionnalités principales

- Navigation sticky et interactive
- Animations dynamiques liées au scroll (GSAP)
- Intégration API Supabase pour les projets
- Formulaire de contact avec envoi automatique de mails
- Responsive Design (Desktop et Mobile)

---

## ⚙️ Installation et utilisation

### Prérequis

- [Node.js](https://nodejs.org/) (version 14 ou supérieure recommandée)
- [Git](https://git-scm.com/)

### Cloner le projet

```bash
git clone git@github.com:EpitechWebAcademiePromo2025/W-PRO-260-PAR-3-1-portfoliotitre-alexis1.brun.git
```

### Accéder au répertoire

```bash
cd next
```

### Installer les dépendances

```bash
npm install
```

ou avec Yarn :

```bash
yarn install
```

### Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine du projet avec les informations suivantes :

```env
NEXT_PUBLIC_SUPABASE_URL=VotreUrlSupabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=VotreCleAnonymeSupabase
```

### Lancer le serveur de développement

```bash
npm run dev
```

ou avec Yarn :

```bash
yarn dev
```

Votre application sera accessible sur : [http://localhost:3000](http://localhost:3000)

---

## 🧪 Lancer les tests Jest

Pour vérifier le bon affichage des composants via les tests unitaires Jest, utilisez la commande suivante :

```bash
npm run test
```

ou avec Yarn :

```bash
yarn test
```

Pour une couverture détaillée des tests :

```bash
npm test -- --verbose 
```

ou avec Yarn :

```bash
yarn test --verbose
```

---

## 🌐 Déploiement

Ce projet est configuré pour être déployé facilement sur Vercel. Il suffit d'importer votre dépôt GitHub sur Vercel, de configurer vos variables d'environnement via leur dashboard, et le déploiement s'effectuera automatiquement.

---

## 📌 Lien vers le projet en production

Accès au site en ligne : [https://alexisbn.com](https://alexisbn.com)

---

## 📄 Licence

Ce projet est sous licence MIT.
