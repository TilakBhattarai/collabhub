# CollabHub 🚀

**CollabHub** is a full-stack collaboration platform designed to help developers and students discover people with complementary skills, connect with them, and eventually build projects together.

The project is being developed incrementally, with the goal of creating a practical platform for finding collaborators, forming teams, and managing collaborative projects.

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* Python
* Django
* Django REST Framework
* JWT Authentication

### Database

* PostgreSQL

### Tools

* Git & GitHub
* Postman

---

## ✨ Current Features

### 🔐 Authentication

* User registration
* User login
* JWT access and refresh tokens
* Protected routes
* Automatic access-token refresh

### 👤 User Profiles

* Create and manage user profiles
* Profile picture upload
* Role
* Skills
* Bio
* Location
* Experience
* GitHub
* Portfolio
* Availability
* What the user is looking for

### 🔎 Discover

* Discover other users
* View user profile information
* Identify potential collaborators

### 🤝 Connections

* Send connection requests
* Accept connection requests
* Reject connection requests
* Prevent self-connections
* Prevent duplicate connection requests
* Prevent reverse-direction duplicate requests
* View accepted connections
* Remove connections
* View connected users' profiles
* Connection status handling

---

## 🏗️ Project Roadmap

The project is being developed feature by feature.

### Completed

* [x] Authentication
* [x] JWT authentication
* [x] User profiles
* [x] Profile editing
* [x] Profile picture upload
* [x] Discover users
* [x] Connection requests
* [x] Accept / reject connections
* [x] My Connections
* [x] Remove connections
* [x] Connected user profiles

### In Progress / Planned

* [ ] Projects
* [ ] Project creation and management
* [ ] Project discovery
* [ ] Matching collaborators based on skills
* [ ] Project applications / invitations
* [ ] Teams
* [ ] Team management
* [ ] Tasks
* [ ] Notifications
* [ ] Dashboard

### Future / Stretch Features

* [ ] Milestones
* [ ] Real-time chat
* [ ] File sharing
* [ ] WebSockets
* [ ] Redis
* [ ] Celery
* [ ] Reputation system
* [ ] AI-powered collaborator matching

---

## 📂 Project Structure

```text
collabhub/
│
├── backend/
│   ├── accounts/
│   ├── profiles/
│   ├── connection/
│   ├── manage.py
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🎯 Vision

CollabHub aims to make it easier for people with different technical skills to find each other and work together on projects.

For example:

```text
Developer A
Python • Django • PostgreSQL
              │
              ▼
          CollabHub
              ▲
              │
Developer B
React • JavaScript • Tailwind
```

Instead of searching randomly for teammates, users can build profiles around their skills and interests, discover potential collaborators, connect with them, and eventually work together through projects and teams.

---

## 🚧 Development Status

CollabHub is currently under active development.

The authentication, profile, discovery, and connection foundations have been implemented. The next major stage is building the **Project system**, followed by project applications/invitations, teams, and task management.

---

## 👨‍💻 Author

**Tilak Bhattarai**

GitHub: [TilakBhattarai](https://github.com/TilakBhattarai)

---

⭐ This project is being built as a hands-on full-stack development project, with features added progressively as the application evolves.
