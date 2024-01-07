
// Functions to call backend
const serverUrl ="http://localhost:8080"

export const fetchTasks = () => {
    return fetch(`${serverUrl}/api/tasks`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            return response.json();
        });
};

export const addTask = (newTask) => {
    return fetch(`${serverUrl}/api/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add task');
            }
            return response.json();
        });
};

export const deleteTask = (taskId) => {
    return fetch(`${serverUrl}/api/tasks/${taskId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    });
};

export const updateTaskStatus = (taskId,task, selectedStatus) => {
    return fetch(`${serverUrl}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...task, status: selectedStatus }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update status');
            }
            return response.json();
        });
};
