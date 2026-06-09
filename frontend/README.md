# Frontend

React-based frontend for the Task Tracker application.

This application provides a simple user interface for:

- Viewing tasks
- Creating new tasks
- Marking tasks as completed
- Deleting tasks

The frontend communicates with the backend REST API running on port `5000`.



## Technology Stack

| Component | Purpose |
|------------|----------|
| React 19 | UI framework |
| Vite | Development server and build tool |
| Vitest | Unit testing |



## Project Structure

```text
frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── tests/
│   │   └── App.test.jsx
│   │
│   ├── api.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── Dockerfile
├── package.json
├── vite.config.js
└── vitest.config.js
```



## Installation

### Prerequisites

- Node.js
- npm

Verify installation:

```bash
node --version
npm --version
```


### Install Dependencies

```bash
npm install
```



## Building for Production

Create an optimized production build:

```bash
npm run build
```

The generated files are placed in:

```text
dist/
```



This serves the generated build locally.



## Application Flow

The application uses React state and communicates directly with the backend API.

### Loading Tasks

When the application loads:

```javascript
useEffect(() => {
    loadTasks();
}, []);
```

The frontend calls:

```javascript
getTasks()
```

which sends:

```http
GET /tasks
```

The returned data is stored in:

```javascript
const [tasks, setTasks] = useState([]);
```



### Creating Tasks

When a user enters a title and submits:

```javascript
await createTask(title);
```

The frontend sends:

```http
POST /tasks
```

with JSON payload:

```json
{
  "title": "My Task"
}
```

After creation, tasks are reloaded from the backend.



### Completing Tasks

When a task is marked complete:

```javascript
await completeTask(id);
```

The frontend sends:

```http
PUT /tasks/{id}
```

After completion, tasks are reloaded.



### Deleting Tasks

When a task is deleted:

```javascript
await deleteTask(id);
```

The frontend sends:

```http
DELETE /tasks/{id}
```

After deletion, tasks are reloaded.



## API Layer

All backend communication is centralized in:

```text
src/api.js
```

Current API base URL:

```javascript
const API_URL = "http://localhost:5000";
```

Available functions:

#### Get Tasks

```javascript
getTasks()
```

Request:

```http
GET /tasks
```



#### Create Task

```javascript
createTask(title)
```

Request:

```http
POST /tasks
```

Body:

```json
{
  "title": "Task Name"
}
```



#### Complete Task

```javascript
completeTask(id)
```

Request:

```http
PUT /tasks/{id}
```



#### Delete Task

```javascript
deleteTask(id)
```

Request:

```http
DELETE /tasks/{id}
```




## Testing

Run all tests:

```bash
npm run test
```

Current test file:

```text
src/tests/App.test.jsx
```

Current test verifies that the application title is present.

Example:

```javascript
test("renders title", () => {

    document.body.innerHTML = `
        <h1>Task Tracker</h1>
    `;

    expect(
        document.body.innerHTML
    ).toContain("Task Tracker");

});
```



## Adding New Tests

Create new test files inside:

```text
src/tests/
```

Example:

```text
src/tests/
├── App.test.jsx
├── TaskList.test.jsx
└── Api.test.jsx
```

Example component test:

```javascript
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders application title", () => {

    render(<App />);

    expect(
        screen.getByText("Task Tracker")
    ).toBeInTheDocument();

});
```

Run tests:

```bash
npm run test
```



## Docker Build

The frontend includes a multi-stage Docker build.

### Build Stage

Uses:

```dockerfile
FROM node:22 AS build
```

Steps:

1. Install dependencies using `npm ci`
2. Copy application source
3. Run production build

```dockerfile
RUN npm run build
```
