const API_URL = "http://localhost:5000";

export async function getTasks() {
    const response = await fetch(`${API_URL}/tasks`);
    return response.json();
}

export async function createTask(title) {
    const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    });

    return response.json();
}

export async function completeTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT"
    });
}

export async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
    });
}
