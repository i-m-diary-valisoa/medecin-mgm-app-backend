# API Backend pour Medecin App

Cette API backend a été développée avec Node.js, Express, TypeScript, et Prisma. Elle fournit un système d'authentification basé sur les JWT et un CRUD complet (Create, Read, Update, Delete) pour la gestion des médecins.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js (v18+)
- PostgreSQL (ou une base de données supportée par Prisma que vous avez configurée)

### Installation

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Configuration de l'environnement :**
   Vérifiez que vous avez bien un fichier `.env` à la racine du dossier `backend` avec la variable `DATABASE_URL` (et `JWT_SECRET` pour les tokens) :
   ```env
   DATABASE_URL="postgresql://utilisateur:motdepasse@localhost:5432/nom_de_votre_base_de_donnees?schema=public"
   JWT_SECRET="votre_secret_jwt_super_securise"
   ```

3. **Synchroniser la base de données (Prisma) :**
   Si vous n'avez pas encore poussé votre schéma vers la base de données :
   ```bash
   npx prisma db push
   # ou pour créer une migration :
   # npm run prisma:migrate
   ```

4. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   Le serveur sera lancé par défaut sur `http://localhost:3000` (ou le port défini dans le `.env`).

---

## 🧪 Tester les Endpoints avec Postman / ThunderClient

L'API est préfixée par `/api`. 
Pour les routes protégées (comme `/api/medecins`), vous devrez **fournir un token JWT** (obtenu lors du Login) dans les headers de votre requête :
`Authorization: Bearer <votre_token_ici>`

Voici les JSON (payloads) à envoyer dans le corps (`Body` de type `raw` et format `JSON`) pour tester les différentes routes.

### 1. Authentification (`/api/auth`)

#### A. Inscription (S'enregistrer)
- **Méthode :** `POST`
- **URL :** `http://localhost:3000/api/auth/register`
- **Body JSON :**
  ```json
  {
    "email": "test@example.com",
    "password": "password123",
    "nom": "Administrateur"
  }
  ```

#### B. Connexion (Login)
- **Méthode :** `POST`
- **URL :** `http://localhost:3000/api/auth/login`
- **Body JSON :**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
> **Attention :** Cette requête vous retournera un `token`. Vous DEVEZ copier ce token et le mettre dans l'onglet "Auth" (Bearer Token) ou dans le "Header" (Authorization: Bearer <token>) pour pouvoir accéder aux routes des médecins.

---

### 2. Gestion des Médecins (`/api/medecins`)
*(Toutes ces routes nécessitent le Token d'authentification)*

#### A. Créer un Médecin
- **Méthode :** `POST`
- **URL :** `http://localhost:3000/api/medecins`
- **Body JSON :**
  ```json
  {
    "nom": "Dr. House",
    "dateNais": "1959-05-15T00:00:00Z", 
    "photo": "https://example.com/photo.jpg"
  }
  ```
  *Note : `dateNais` (format ISO-8601) et `photo` sont optionnels.*

#### B. Lister tous les Médecins
- **Méthode :** `GET`
- **URL :** `http://localhost:3000/api/medecins`
- **Body :** *Aucun*

#### C. Rechercher un Médecin (par nom)
- **Méthode :** `GET`
- **URL :** `http://localhost:3000/api/medecins/search?q=House`
- **Body :** *Aucun*

#### D. Obtenir un Médecin par ID
- **Méthode :** `GET`
- **URL :** `http://localhost:3000/api/medecins/:id` (remplacez `:id` par l'ID réel, par exemple `/api/medecins/1`)
- **Body :** *Aucun*

#### E. Mettre à jour un Médecin
- **Méthode :** `PUT`
- **URL :** `http://localhost:3000/api/medecins/:id`
- **Body JSON :**
  ```json
  {
    "nom": "Dr. Gregory House",
    "dateNais": "1959-05-15T00:00:00Z",
    "photo": "https://example.com/new_photo.jpg"
  }
  ```

#### F. Supprimer un Médecin
- **Méthode :** `DELETE`
- **URL :** `http://localhost:3000/api/medecins/:id`
- **Body :** *Aucun*

---

## 💡 Autres points importants à savoir

1. **Validation stricte (Zod) :** 
   Les payloads sont validés avant de toucher les contrôleurs. Si vous oubliez le `@` dans un email ou si le mot de passe est trop court, l'API renverra une erreur HTTP `400 (Bad Request)` avec un message d'erreur détaillé indiquant quel champ pose problème.
   
2. **Gestion des erreurs globale :**
   Grâce au `errorHandler` (middleware), toutes les erreurs non attrapées retournent une réponse JSON structurée propre de la forme :
   ```json
   {
     "success": false,
     "message": "Description de l'erreur"
   }
   ```
   
3. **Architecture Modulaire :**
   Le projet est découpé logiquement (`routes/`, `controllers/`, `middlewares/`). Si vous devez ajouter une nouvelle entité (ex: `Patient`), créez son modèle dans `schema.prisma`, puis créez ses routes et son contrôleur correspondants de la même façon que pour `Medecin`.

4. **Prisma Studio :**
   Si vous voulez visualiser directement les données de votre base de données dans un navigateur (sans utiliser Postman), vous pouvez lancer Prisma Studio :
   ```bash
   npx prisma studio
   ```
