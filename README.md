# CollabHub 🚀

**CollabHub** is a full-stack collaboration platform designed to help developers, students, and builders discover potential collaborators, connect through shared skills and interests, create projects, and build teams.

The project is being developed incrementally, with a focus on practical features, secure APIs, and a responsive user experience.

**Project status:** Actively under development

🔗 **Repository:** [GitHub](https://github.com/TilakBhattarai/collabhub)

---

## 🛠️ Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide React

**Backend**
- Python
- Django
- Django REST Framework
- JWT Authentication
- Django Filters

**Database and Tools**
- PostgreSQL
- Git and GitHub
- Postman

---

## ✨ Features Implemented

### 🔐 Authentication
- User registration and login
- JWT access and refresh tokens
- Protected routes
- Automatic access-token refresh
- Logout and invalid-token handling

### 👤 User Profiles
- Create, view, and update profiles
- Profile picture upload and preview
- Role, skills, bio, location, and experience
- GitHub and portfolio links
- Availability and collaboration preferences
- Self-profile detection and appropriate connection-action handling

### 🔎 Discover
- Discover other users
- Search by username
- Filter by role, location, skills, and collaboration preferences
- View user profiles
- Identify potential collaborators
- Handle existing connections and pending requests

### 🤝 Connections
- Send, accept, and reject connection requests
- Prevent self-connections and duplicate requests
- Handle requests in either direction
- View pending requests and accepted connections
- Remove existing connections
- Access connected users' profiles

### 📁 Projects
- Create and browse projects
- Set project title, description, required skills, visibility, and status
- Support public and private projects
- View project owners and their profile pictures
- Display project creation and update dates
- Handle loading, errors, and empty states

### 📄 Project Details
- Dedicated project details page
- Display project information and owner details
- Navigate to the owner's profile
- Enforce project-specific visibility rules
- Send join requests to eligible public projects
- Prevent owners from requesting to join their own projects

### 📂 My Projects
- View projects owned by the authenticated user
- View project details
- Edit and delete projects
- Enforce owner permissions
- Confirm project deletion
- Handle deletion loading and errors
- Update the project list after deletion
- Navigate to project members

### 🤝 Project Join Requests
- Send join requests to public projects
- Prevent duplicate pending requests
- Track pending and accepted request statuses
- Allow users to request again after rejection
- Display incoming requests to project owners
- Show requester and project information
- Accept or reject requests
- Enforce owner permissions and prevent processing requests that are no longer pending
- Remove processed requests from the pending list

### 👥 Project Members
- Dedicated project members page
- Display member usernames, roles, profile pictures, and join dates
- Show project member counts
- View member profiles
- Connect with project members
- Display connection and pending-request status
- Allow project owners to remove members
- Enforce member-removal permissions
- Remove associated join requests when applicable
- Apply access rules to public and private project members

### 🗂️ Project Workspace
- Dedicated workspace page for each project
- Overview, Tasks, and Team tabs, with the active tab kept in the URL
- Project header with status, visibility, owner, and creation date
- Overview stats: total tasks, in progress, completed, and member count
- Live progress bar based on completed tasks
- Upcoming tasks list with assignee and status
- Team panel with the owner and project members
- Tech stack display from the project's required skills

### ✅ Tasks
- Kanban task board with To Do, In Progress, and Completed columns
- Summary cards showing task counts per status
- Task cards with category, description, due date, and assignee avatar
- Create tasks with title, description, assignee, category, priority, and due date
- Assignee selection limited to the project owner and members
- Backend permission checks: only the owner or members can create tasks
- Backend validation that the assignee belongs to the project
- Support for unassigned tasks
- Success and error feedback through toast notifications

### 🔔 Notifications
- Notifications for collaboration-related actions
- View notifications and their timestamps
- Read and unread notification states
- Mark notifications as read
- Display the unread count in the navigation bar
- Share notification state across components
- Handle notification loading and empty states
- Restrict notification access to the appropriate user

### 📊 Dashboard
- Overview of projects, connections, and pending join requests
- Incoming project join requests with accept/reject actions
- Connection request management
- Recent activity and notifications
- Quick navigation to project creation and other sections
- Responsive dashboard layout

### 🎨 UI & UX
- Consistent violet-based design system
- Responsive navigation and mobile menu
- Reusable loading and empty states
- Toast notifications with automatic dismissal
- Consistent layouts, spacing, typography, and buttons

---

## 🏗️ Development Roadmap

### ✅ Implemented

- [x] Authentication and JWT handling
- [x] User profiles and profile editing
- [x] User discovery and filtering
- [x] Connection management
- [x] Project creation and browsing
- [x] Project details
- [x] My Projects management
- [x] Project join requests
- [x] Project member management
- [x] Project workspace with overview, progress, and team panels
- [x] Task creation and assignment
- [x] Kanban task board
- [x] Notifications
- [x] Dashboard
- [x] Responsive UI and shared notification state

### 🚧 Current and Next

**Teams & Work Management**
- [ ] Task status updates (moving tasks between columns)
- [ ] Task editing and deletion
- [ ] Task search and filters
- [ ] Real activity feed in the project workspace
- [ ] Teams
- [ ] Team creation and management
- [ ] Dashboard activity backed by additional collaboration data

### 🔮 Future Enhancements

These features will be considered after the core collaboration workflow is stable.

- [ ] Project milestones
- [ ] Real-time chat
- [ ] File sharing
- [ ] WebSockets
- [ ] Redis and Celery where needed
- [ ] Reputation system
- [ ] AI-powered collaborator matching

---

## 📂 Project Structure

```text
collabhub/
├── backend/
│   ├── accounts/
│   ├── profiles/
│   ├── connection/
│   ├── projects/
│   ├── notifications/
│   ├── config/
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
│   └── package.json
└── README.md
```

---

## 🔄 Collaboration Workflow

The current platform supports the core workflow from discovering collaborators to assigning tasks inside a project workspace.

```text
Create a Profile
      ↓
Discover People
      ↓
Send Connection Requests
      ↓
Create or Discover Projects
      ↓
View Project Details
      ↓
Send Join Requests
      ↓
Project Owner Accepts or Rejects
      ↓
Notifications
      ↓
Project Members
      ↓
Project Workspace
      ↓
Create and Assign Tasks
      ↓
Future: Task Status Updates and Teams
```

---

## 🎯 Project Vision

CollabHub aims to make it easier for people with complementary technical skills to find each other and work on meaningful projects.

For example, a Python/Django developer could discover a React developer, connect with them, and collaborate on a project that combines their skills.

Rather than relying entirely on random networking, users can showcase their abilities, discover relevant projects, and build connections around shared interests.

The long-term goal is to evolve CollabHub from a project-discovery platform into a broader collaboration platform with teams, tasks, and potentially AI-powered collaborator matching.

---

## 🚧 Development Status

CollabHub is an active development project. Its authentication, profiles, user discovery, connections, project management, join requests, notifications, project members, dashboard, project workspace, and task creation have been implemented progressively.

The current focus is task management inside project workspaces. Tasks can be created, assigned, and viewed on a kanban board. **Task status updates, editing, deletion, and Teams have not been implemented yet** and remain planned features.

---

## 👨‍💻 Author

**Tilak Bhattarai**

- GitHub: [TilakBhattarai](https://github.com/TilakBhattarai)

---

⭐ If you find this project interesting, consider exploring the repository as it continues to evolve.
