# CollabHub 🚀

**CollabHub** is a full-stack collaboration platform designed to help developers, students, and builders discover people with complementary skills, connect with them, create projects, and eventually work together as teams.

The project is being developed incrementally, with each feature built, tested, and improved before moving to the next stage.

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
* Project owner profile picture
* Project creation date
* Project status display
* Required skills display
* Project empty states
* Project loading and error handling
* Dashboard → Create Project flow

### 📄 Project Details

* Dedicated project details page
* Dynamic project information
* Project title
* Project description
* Required skills
* Project visibility
* Project status
* Created date
* Updated date
* Project owner information
* Project owner profile picture
* Avatar fallback when no profile picture exists
* View Project Owner Profile
* Public project behavior
* Private project behavior
* Private projects do not currently allow join requests
* Project owner cannot send a join request to their own project
* Send join request to public projects
* Join request status handling

### 📂 My Projects

* Dedicated My Projects page
* View projects owned by the authenticated user
* Project statistics
* View project details
* Edit projects
* Delete projects
* Project owner permissions
* Delete confirmation
* Delete loading state
* Delete error handling
* Automatic project list update after deletion
* My Projects empty state
* Navigation to My Projects from the main navigation

### 🤝 Project Join Requests

* Send join requests to public projects
* Prevent project owners from requesting their own projects
* Prevent duplicate pending requests
* Automatically assign the authenticated user as the sender
* Automatically set new requests to `PENDING`
* Public / private project validation
* View the authenticated user's join requests
* Display pending request status
* Display accepted request status
* Request again after rejection
* Backend permission and validation checks
* Project owners can view incoming join requests for their projects
* Display requester profile information
* Display requester role and skills
* Display requested project information
* Display request status and request date
* Accept join requests
* Reject join requests
* Prevent unauthorized users from accepting or rejecting requests
* Prevent already processed requests from being accepted or rejected
* Remove processed requests from the pending owner view

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

CollabHub is being developed feature by feature, with each major feature completed before moving to the next stage.

### ✅ Completed

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
* [x] Project Details page
* [x] Project owner information
* [x] Project owner profile picture
* [x] View Project Owner Profile
* [x] Public / private project behavior
* [x] My Projects page
* [x] View projects from My Projects
* [x] Edit projects
* [x] Delete projects
* [x] Project owner permissions
* [x] Delete confirmation and handling
* [x] My Projects empty state
* [x] My Projects navigation
* [x] Professional UI system
* [x] Toast notification system
* [x] Automatic toast dismissal
* [x] Join request creation
* [x] Join request validation
* [x] Join request status handling
* [x] Project owner incoming request view
* [x] Accept join requests
* [x] Reject join requests
* [x] Owner permission checks for join requests
* [x] Pending join request handling

### 🚧 Current / Next

#### Project Collaboration

* [x] Send join request
* [x] Join request status
* [x] Project owner incoming request view
* [x] Accept join requests
* [x] Reject join requests
* [ ] Project Details request status UI
* [ ] Project members
* [ ] Accepted member handling

#### Teams & Work Management

* [ ] Teams
* [ ] Team management
* [ ] Tasks
* [ ] Notifications
* [ ] Dashboard data and activity

---

## 🔮 Future / Stretch Features

These features will be considered after the core collaboration workflow is stable.

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

The long-term collaboration flow is:

```text
Profile
   ↓
Discover People
   ↓
Connect
   ↓
Create / Discover Projects
   ↓
Project Details
   ↓
Join Requests
   ↓
Accept / Reject
   ↓
Project Members
   ↓
Teams
   ↓
Tasks
   ↓
Collaboration
```

---

## 🚧 Development Status

CollabHub is currently under active development.

The authentication, profile, discovery, connection, and core project management systems have been implemented.

Users can currently:

* Create and manage profiles
* Discover other users
* Connect with potential collaborators
* Create projects
* Browse projects
* View detailed project information
* View project owners
* Explore public and private project behavior
* View and manage their own projects
* Edit their projects
* Delete their projects with owner-level permission checks
* Send join requests to public projects
* Track join request status
* Request again after rejection
* View incoming join requests as project owners
* Accept join requests
* Reject join requests
* Enforce project-owner permissions when processing requests

The current development stage is focused on **project collaboration**.

The Join Request workflow is now functional from creation through owner-side acceptance or rejection. The next step is connecting accepted requests to actual **Project Members**, followed by teams and task management.

---

## 👨‍💻 Author

**Tilak Bhattarai**

GitHub: [TilakBhattarai](https://github.com/TilakBhattarai)

---

⭐ This project is being built as a hands-on full-stack development project, with features added progressively as the application evolves.
