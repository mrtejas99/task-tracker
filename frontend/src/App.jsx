import { useEffect, useState } from "react";

import {
    getTasks,
    createTask,
    completeTask,
    deleteTask
} from "./api";

import "./App.css";

function App() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    async function loadTasks() {
        const data = await getTasks();
        setTasks(data);
    }

    useEffect(() => {
        loadTasks();
    }, []);

    async function handleAdd() {

        if (!title.trim()) {
            return;
        }

        await createTask(title);

        setTitle("");

        loadTasks();
    }

    async function handleComplete(id) {

        await completeTask(id);

        loadTasks();
    }

    async function handleDelete(id) {

        await deleteTask(id);

        loadTasks();
    }

    return (
        <div className="container">

            <h1>Task Tracker</h1>

            <div className="input-row">

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task"
                />

                <button onClick={handleAdd}>
                    Add
                </button>

            </div>

            <ul>

                {tasks.map(task => (

                    <li key={task.id}>

                        <span
                            className={
                                task.completed
                                    ? "completed"
                                    : ""
                            }
                        >
                            {task.title}
                        </span>

                        <button
                            onClick={() =>
                                handleComplete(task.id)
                            }
                        >
                            Complete
                        </button>

                        <button
                            onClick={() =>
                                handleDelete(task.id)
                            }
                        >
                            Delete
                        </button>

                    </li>

                ))}

            </ul>

        </div>
    );
}

export default App;
