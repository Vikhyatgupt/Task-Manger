# 📋 Task Manager — Full Stack Web Application

A full-stack task management application built with **React**, **Spring Boot**, and **MySQL**. Features a modern dark glassmorphic UI with full CRUD operations, responsive design, and RESTful API integration.

---

## 🖥️ Live Preview

> Coming soon — deploy link will be added here.

---

## ✨ Features

- ✅ **Create** tasks with name, status, start & end dates
- 📋 **View all** tasks in a responsive 4-column card grid
- 🔍 **Search** tasks by ID with instant navigation
- 🗑️ **Delete** tasks with a confirmation modal (no accidental deletions)
- 📱 **Fully responsive** — adapts from mobile (1 col) to desktop (4 cols)
- ⚡ **Loading skeletons** while data fetches from the backend
- 🎨 **Dark glassmorphic UI** — consistent design system across all pages

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router DOM | Client-side routing |
| Axios | HTTP requests to Spring Boot API |
| CSS3 (custom) | Styling — no UI library used |
| Syne + DM Sans | Google Fonts — display & body typography |

### Backend
| Technology | Purpose |
|---|---|
| Spring Boot 3 | REST API framework |
| Spring Data JPA | ORM / data access layer |
| Hibernate | JPA implementation |
| MySQL | Relational database |
| Maven | Build & dependency management |

---

## 📁 Project Structure

```
task-manager/
│
├── task-manager/                        # React app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   │   ├── home.jsx         # Landing page
│   │   │   │   └── home.css
│   │   │   ├── Add Task/
│   │   │   │   ├── ADDTask.jsx      # Add task form
│   │   │   │   └── ADD.css
│   │   │   ├── Show/
│   │   │   │   ├── showAll.jsx      # All tasks grid
│   │   │   │   └── show.css
│   │   │   └── delete/
│   │   │       ├── delete.jsx       # Task detail + delete
│   │   │       └── delete.css
│   │   ├── App.jsx                  # Router setup
│   │   └── App.css                  # Global design tokens
│   └── package.json
│
└── TaskManagerApi/                         # Spring Boot app
    └── src/main/java/
        ├── controller/
        │   └── TaskController.java  # REST endpoints
        ├── model/
        │   └── Task.java            # JPA entity
        ├── repository/
        │   └── TaskRepository.java  # Spring Data JPA
        └── service/
            └── TaskService.java     # Business logic
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/getall` | Fetch all tasks |
| `GET` | `/getid/{id}` | Fetch single task by ID |
| `POST` | `/add` | Create a new task |
| `DELETE` | `/delete/{id}` | Delete a task by ID |

### Task Object (JSON)

```json
{
  "id": 1,
  "task": "Design homepage mockup",
  "startDate": "2024-01-15T00:00:00.000Z",
  "endDate": "2024-03-15T00:00:00.000Z",
  "status": "Active"
}
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- Java 17+
- MySQL 8+
- Maven 3.8+

---

| Page | Description |
|---|---|
| **Home** | Landing page with Add Task and View All buttons |
| **Add Task** | Form with task name, status, and date pickers |
| **Show All** | Responsive 4-column card grid with search |
| **Task Detail** | Full task info with delete confirmation modal |

---

## 🎨 Design System

The entire UI is built on a consistent dark theme design system defined in `App.css`:

- **Background:** `#080c14`
- **Card surface:** `#111827`
- **Accent blue:** `#63b3ed`
- **Accent green:** `#68d391`
- **Danger red:** `#fc8181`
- **Fonts:** Syne (headings) + DM Sans (body)

All pages share the same CSS variables, status badge classes, skeleton loaders, and animation tokens.

---

## 🗺️ Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Landing page |
| `/add` | `AddTask` | Create new task |
| `/showall` | `ShowAll` | View all tasks |
| `/delete/:id` | `Delete` | View & delete task |

---

## 🚀 Future Improvements

- [ ] Edit / update task functionality
- [ ] Filter tasks by status
- [ ] Sort by date or ID
- [ ] User authentication (Spring Security + JWT)
- [ ] Pagination for large task lists
- [ ] Deploy frontend to Vercel, backend to Railway

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Vikhyat Gupta**
- GitHub: [@your-username](https://github.com/Vikhyatgupt)
---

> Built with ❤️ using React, Spring Boot & MySQL
