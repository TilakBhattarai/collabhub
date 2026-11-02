# CollabHub 🚀

**CollabHub** is a full-stack collaboration platform designed to help developers, students, and builders discover potential collaborators, connect through shared skills and interests, create projects, build teams, and manage collaborative work.

The platform brings developer discovery, social connections, project collaboration, team management, and task management together in one place.

**Project Status: MVP Achieved 🎉**

🔗 **Repository:** [GitHub – CollabHub](https://github.com/TilakBhattarai/collabhub)

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide React

### Backend
- Python
- Django
- Django REST Framework
- JWT Authentication
- Django Filters

### Database and Tools
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

### 🔎 Developer Discovery
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
- Create, browse, update, and delete projects
- Configure project title, description, required skills, visibility, and status
- Support public and private projects
- View project owners and their profile pictures
- Display project creation and update dates
- Enforce project-specific permissions

### 📄 Project Details
- Dedicated project details page
- Display project information and owner details
- Navigate to the owner's profile
- Enforce project visibility rules
- Send join requests to eligible public projects
- Prevent owners from requesting to join their own projects

### 📂 My Projects
- View projects owned by the authenticated user
- View project details
- Edit and delete projects
- Confirm project deletion
- Enforce owner permissions
- Handle deletion loading, errors, and empty states
- Navigate to project members and workspace

### 🤝 Project Join Requests
- Send join requests to public projects
- Prevent duplicate pending requests
- Track pending, accepted, and rejected request statuses
- Allow users to request again after rejection
- Display incoming requests to project owners
- Show requester and project information
- Accept or reject requests
- Enforce owner permissions
- Prevent processing requests that are no longer pending

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

### 🔗 My Collaborations
- View projects joined by the authenticated user
- Separate joined projects from owned projects
- Display project information and member counts
- Navigate to the shared project workspace
- Give accepted project members access to their collaborative workspace

### 🗂️ Project Workspace
- Dedicated workspace for each project
- Overview, Tasks, and Team tabs
- Keep the active tab in the URL
- Project header with status, visibility, owner, and creation date
- Overview statistics for total tasks, in-progress tasks, completed tasks, and members
- Progress bar based on completed tasks
- Upcoming tasks list with assignee and status
- Team panel displaying the owner and project members
- Display required project skills

### ✅ Task Management
- Kanban board with To Do, In Progress, and Completed columns
- Summary cards showing task counts per status
- Task cards with category, description, due date, and assignee avatar
- Create tasks with title, description, assignee, category, priority, and due date
- Edit existing task details through a prefilled modal
- Update task details through the Django REST Framework PUT endpoint
- Restrict full task updates to the project owner or task creator
- Validate that an assignee belongs to the project or is its owner
- Delete tasks through a confirmation modal
- Enforce backend deletion permissions
- Expose `can_update` and `can_delete` serializer fields
- Assignee selection limited to eligible project users
- Support unassigned tasks
- Notify assignees when tasks are assigned to them
- Provide success and error feedback through toast notifications

### 🔄 Task Status and Personal Task Management
- All Tasks view for project-wide task visibility
- My Tasks view for tasks assigned to the authenticated user
- Reuse the existing project task data for both views
- Display task status badges in All Tasks
- Provide contextual status actions in My Tasks
- Start Task action for tasks in To Do
- Mark Complete action for tasks in progress
- Confirmation modal to prevent accidental task completion
- Display completed tasks without further status actions
- Refresh the Kanban board after successful status updates
- Assignee-based status-update permissions
- Separate full task editing from status updates

### 👥 Team Workspace
- Dedicated Team tab inside the project workspace
- Display project owner and accepted project members
- Show owner and member labels
- Display profile pictures with initials fallback
- Show assigned task counts for each team member
- Navigate to individual member profiles
- Navigate to team management

### 🔔 Notifications
- Notifications for collaboration-related actions
- Join request notifications
- Accepted and rejected request notifications
- Task assignment notifications
- Project member removal notifications
- View notifications and timestamps
- Read and unread notification states
- Mark notifications as read
- Display unread count in the navigation bar
- Share notification state across components
- Handle loading and empty states
- Restrict notification access to the appropriate user

### 📊 Dashboard
- Overview of projects, connections, and pending join requests
- Incoming project join requests with accept/reject actions
- Connection request management
- Recent activity and notifications
- Quick navigation to project creation and other sections
- Responsive dashboard layout

### 🎨 UI and UX
- Consistent violet-based design system
- Responsive navigation and mobile menu
- Reusable loading and empty states
- Toast notifications with automatic dismissal
- Reusable modal behavior, including Escape, close button, and Cancel handling
- Consistent layouts, spacing, typography, and buttons

---

## 🏗️ Development Roadmap

### ✅ MVP Core Features Achieved

- [x] Authentication and JWT handling
- [x] User profiles and profile editing
- [x] User discovery and filtering
- [x] Connection management
- [x] Project creation and browsing
- [x] Project details
- [x] My Projects management
- [x] Project join requests
- [x] Project member management
- [x] My Collaborations
- [x] Shared Project Workspace
- [x] Overview, Tasks, and Team tabs
- [x] Task creation and assignment
- [x] Task editing with backend authorization and assignee validation
- [x] Task deletion with backend authorization and confirmation UI
- [x] Task assignment notifications
- [x] Kanban task board
- [x] All Tasks and My Tasks views
- [x] Task status workflow and completion confirmation
- [x] Assignee-based status permissions
- [x] Team directory and member information
- [x] Notifications
- [x] Dashboard
- [x] Responsive UI and shared notification state

### 🔧 Post-MVP Stabilization

The MVP feature milestone has been reached. The next phase focuses on improving reliability and preparing the application for release.

- [ ] Code cleanup and refactoring where necessary
- [ ] Review authentication, security, and permissions
- [ ] Regression and end-to-end testing
- [ ] Debugging and edge-case fixes
- [ ] Improve global profile image handling
- [ ] Responsive UI verification
- [ ] Production configuration and deployment
- [ ] Final live application verification

**Target release date: November 10, 2026**

### 🔮 Potential Future Enhancements

These are optional ideas for future development, not requirements for the current MVP.

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

```text
Create a Profile
      ↓
Discover Developers
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
My Collaborations
      ↓
Shared Project Workspace
      ↓
Manage Team and Project Tasks
      ↓
Create, Assign, Edit, and Delete Tasks
      ↓
Track Project-wide and Personal Progress
```

---

## 🎯 Project Vision

CollabHub aims to make it easier for people with complementary technical skills to find each other and work on meaningful projects.

For example, a Python/Django developer can discover a React developer, connect with them, and collaborate on a project that combines their skills.

Rather than relying entirely on random networking, users can showcase their abilities, discover relevant projects, and build connections around shared interests.

The goal is to provide a practical environment where developers and students can move from discovering collaborators to actually building projects together.

---

## 🚀 Development Status

**CollabHub has achieved its MVP feature milestone.**

The core collaboration workflow—including authentication, developer discovery, connections, project management, join requests, notifications, project membership, shared workspaces, team management, and Kanban-based task management—has been implemented.

The project is now entering its stabilization phase, focusing on security and permission reviews, debugging, testing, code cleanup, UI improvements, and production readiness.

**Target release date: November 10, 2026.**

---

## 👨‍💻 Author

**Tilak Bhattarai**

- GitHub: [TilakBhattarai](https://github.com/TilakBhattarai)
- Repository: [CollabHub](https://github.com/TilakBhattarai/collabhub)

---

⭐ If you find this project interesting, feel free to explore the repository.
