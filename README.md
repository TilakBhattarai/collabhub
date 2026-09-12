# CollabHub 🚀

**CollabHub** is a full-stack collaboration platform designed to help developers, students, and builders discover people with complementary skills, connect with them, and eventually build projects together.

The project is being developed incrementally, with the goal of creating a practical platform for finding collaborators, creating and discovering projects, forming teams, and managing collaborative work.

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router
* Lucide React

### Backend

* Python
* Django
* Django REST Framework
* JWT Authentication
* Django Filters

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
* Logout

### 👤 User Profiles

* Create and manage user profiles
* Profile picture upload
* Profile picture preview
* Role
* Skills
* Bio
* Location
* Experience
* GitHub
* Portfolio
* Availability
* What the user is looking for
* Edit profile functionality
* View other users' profiles

### 🔎 Discover

* Discover other users
* Search users by username
* Filter by role
* Filter by location
* Filter by skills
* Filter by what users are looking for
* View user profiles
* Connect with potential collaborators
* Hide users who are already connected or have pending requests

### 🤝 Connections

* Send connection requests
* Accept connection requests
* Reject connection requests
* Prevent self-connections
* Prevent duplicate connection requests
* Prevent reverse-direction duplicate requests
* View pending connection requests
* View accepted connections
* Remove connections
* View connected users' profiles
* Connection status handling
* Protected connection APIs

### 📁 Projects

* Create projects
* Project title and description
* Required skills
* Public / private visibility
* Project status
* Browse available projects
* Project listing page
* Project cards with owner information
* Project creation date
* Project status display
* Required skills display
* Project empty states
* Project loading and error handling
* Dashboard → Create Project flow

### 🎨 UI & UX

* Consistent CollabHub design system
* Violet-based primary color system
* Responsive navigation
* Mobile navigation menu
* Professional form layouts
* Consistent loading states
* Empty states
* Toast notifications
* Automatic toast dismissal
* Consistent spacing, typography, borders, and buttons across the application

---

## 🏗️ Project Roadmap

The project is being developed feature by feature.

### Completed

* [x] Authentication
* [x] JWT authentication
* [x] User registration and login
* [x] Protected routes
* [x] User profiles
* [x] Profile editing
* [x] Profile picture upload
* [x] Discover users
* [x] User search and filters
* [x] Connection requests
* [x] Accept / reject connections
* [x] My Connections
* [x] Remove connections
* [x] Connected user profiles
* [x] Project model and API
* [x] Project creation
* [x] Project browsing / listing
* [x] Project visibility and status
* [x] Required project skills
* [x] Dashboard → Create Project
* [x] Professional UI system
* [x] Toast notification system
* [x] Automatic toast dismissal

### In Progress / Next

* [ ] Project details
* [ ] Project applications / invitations
* [ ] Matching collaborators based on skills
* [ ] Teams
* [ ] Team management
* [ ] Tasks
* [ ] Notifications
* [ ] Dashboard data and activity

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
│   ├── projects/
│   ├── config/
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

CollabHub aims to make it easier for people with different technical skills to find each other and work together on meaningful projects.

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

Instead of searching randomly for teammates, users can build profiles around their skills and interests, discover potential collaborators, explore projects, connect with other builders, and eventually form teams to work together.

---

## 🚧 Development Status

CollabHub is currently under active development.

The authentication, profile, discovery, connection, and initial project systems have been implemented.

Users can currently create profiles, discover and connect with other users, create projects, and browse available projects.

The next major stage is building **Project Details**, followed by project applications/invitations, teams, and task management.

---

## 👨‍💻 Author

**Tilak Bhattarai**

GitHub: [TilakBhattarai](https://github.com/TilakBhattarai)

---

⭐ This project is being built as a hands-on full-stack development project, with features added progressively as the application evolves.
