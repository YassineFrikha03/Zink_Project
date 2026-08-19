<div align="center">

# 🍔 Zink — Restaurant Burger

**Application web full-stack moderne pour restaurant burger**  
Visualisation 3D des burgers · Commandes en ligne · Suivi en temps réel · Dashboard Admin

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

---

## 📋 Description

**Zink** est une application web full-stack de restaurant burger premium. Elle offre une expérience utilisateur immersive avec une visualisation 3D interactive des burgers, un système de commande en ligne complet, le suivi des commandes en temps réel et un tableau de bord administrateur avancé.

---

## ✨ Fonctionnalités

### 👤 Côté Client
- 🍔 **Visualiseur 3D de Burgers** — Exploration interactive des burgers en 3D (Three.js + React Three Fiber)
- 🛒 **Panier & Commande** — Ajout au panier, checkout complet avec modal de paiement
- 🎨 **Burger Personnalisé** — Création d'un burger sur mesure avec choix d'ingrédients
- 📦 **Suivi de Commande** — Suivi en temps réel de l'état de la commande
- 📅 **Réservation de Table** — Système de réservation intégré
- ⭐ **Avis & Notes** — Système de reviews clients
- 🌙 **Mode Sombre / Clair** — Thème adaptatif
- 🤖 **Agent IA Burger** — Assistant IA pour aider le client à choisir son burger

### 🛠️ Côté Administrateur
- 📊 **Dashboard Admin** — Vue d'ensemble des commandes, revenus et statistiques
- 🍽️ **Gestion du Menu** — CRUD complet sur les plats
- 🎫 **Tickets de Commandes** — Gestion et mise à jour du statut des commandes
- 👥 **Gestion du Staff** — Administration du personnel avec accès par PIN

---

## 🏗️ Architecture

```
Zink_Project/
├── restaurant-backend/          # API REST Node.js
│   ├── config/
│   │   └── db.js                # Connexion MongoDB
│   ├── controllers/             # Logique métier
│   │   ├── dishController.js
│   │   ├── orderController.js
│   │   ├── reservationController.js
│   │   ├── reviewController.js
│   │   ├── staffController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT Auth
│   ├── models/                  # Schémas Mongoose
│   │   ├── Dish.js
│   │   ├── Order.js
│   │   ├── Reservation.js
│   │   ├── Review.js
│   │   └── User.js
│   ├── routes/                  # Routes Express
│   └── server.js                # Point d'entrée API
│
└── restaurant-frontend/         # Application React
    └── src/
        ├── components/          # Composants réutilisables
        │   ├── RealBurgerViewer.jsx   # Visualiseur 3D
        │   ├── AIBurgerAgent.jsx      # Agent IA
        │   ├── CartDrawer.jsx
        │   ├── CheckoutModal.jsx
        │   └── admin/
        ├── pages/               # Pages de l'application
        │   ├── Home.jsx
        │   ├── Menu.jsx
        │   ├── CustomBurger.jsx
        │   ├── OrderTracking.jsx
        │   ├── Offers.jsx
        │   ├── About.jsx
        │   ├── Contact.jsx
        │   └── AdminDashboard.jsx
        ├── context/
        │   └── CartContext.jsx  # Gestion du panier (Context API)
        └── services/
            └── api.js           # Appels API centralisés
```

---

## 🚀 Technologies

### Frontend
| Technologie | Usage |
|---|---|
| **React 18** | Framework UI |
| **Vite 6** | Bundler & Dev Server |
| **Three.js + React Three Fiber** | Rendu 3D des burgers |
| **Framer Motion** | Animations fluides |
| **TailwindCSS** | Styles utilitaires |
| **React Router v7** | Navigation SPA |
| **Axios** | Appels HTTP |
| **React Hot Toast** | Notifications |
| **Lucide React** | Icônes |

### Backend
| Technologie | Usage |
|---|---|
| **Node.js + Express 5** | Serveur API REST |
| **MongoDB + Mongoose** | Base de données NoSQL |
| **JWT (jsonwebtoken)** | Authentification |
| **bcryptjs** | Hachage des mots de passe |
| **dotenv** | Variables d'environnement |
| **nodemon** | Hot reload dev |

---

## ⚙️ Installation & Lancement

### Prérequis
- Node.js ≥ 18
- MongoDB (local ou Atlas)
- npm

### 1. Cloner le projet
```bash
git clone https://github.com/YassineFrikha03/Zink_Project.git
cd Zink_Project
```

### 2. Backend
```bash
cd restaurant-backend
npm install
```

Créer un fichier `.env` :
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/zink_db
JWT_SECRET=your_jwt_secret_key
```

Démarrer le backend :
```bash
npm run dev
```

### 3. Frontend
```bash
cd ../restaurant-frontend
npm install
npm run dev
```

L'application sera accessible sur **http://localhost:5173**

---

## 🔑 API Endpoints

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/api/dishes` | Récupérer tous les plats |
| `POST` | `/api/dishes` | Créer un plat (Admin) |
| `PUT` | `/api/dishes/:id` | Modifier un plat (Admin) |
| `DELETE` | `/api/dishes/:id` | Supprimer un plat (Admin) |
| `POST` | `/api/users/register` | Inscription utilisateur |
| `POST` | `/api/users/login` | Connexion utilisateur |
| `GET` | `/api/orders` | Lister les commandes |
| `POST` | `/api/orders` | Passer une commande |
| `PUT` | `/api/orders/:id/status` | Mettre à jour le statut |
| `POST` | `/api/reservations` | Créer une réservation |
| `GET` | `/api/reviews` | Lister les avis |
| `POST` | `/api/reviews` | Soumettre un avis |
| `GET` | `/api/staff` | Gestion du staff |

---

## 👨‍💻 Auteur

**Yassine Frikha**  
📧 yassinefrikha0@gmail.com  
🐙 [@YassineFrikha03](https://github.com/YassineFrikha03)

---

<div align="center">

**⭐ N'hésite pas à star le projet si tu l'as apprécié !**

</div>
