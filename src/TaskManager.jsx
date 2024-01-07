import React, { useState, useEffect } from 'react';
import './TaskManager.css';
import { fetchTasks, addTask, deleteTask, updateTaskStatus } from './service/service';

// AddTaskForm component
const AddTaskForm = ({ addTask, setShowModal }) => {
    const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Not Started' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(newTask);
        setShowModal(false);
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%"}}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <text style={{margin:"7px 0"}}>
                        Title:
                    </text>
                    <input
                        style={{height:"20px"}}
                        type="text"
                        name="title"
                        value={newTask.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        required
                    />
                    <text style={{ margin: "10px 0" }}>
                        Description:
                    </text>
                    <textarea
                        //style={{height:"100px"}}
                        type="text"
                        name="description"
                        value={newTask.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        required
                        rows={4}
                        cols={50}
                    />
                </div>
                <div style={{width:"100%",justifyContent:"center",display:"flex",marginTop:"20px"}}>
                    <button type="submit">Add Task</button>
                </div>
            </div>
        </form>
    );
};


function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleAddTask = (newTask) => {
        addTask(newTask)
            .then(data => {
                setTasks([data, ...tasks]);
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
    };

    const handleUpdateStatus = (taskId, task, selectedStatus) => {
        updateTaskStatus(taskId,task, selectedStatus)
            .then(data => {
                const updatedTasks = tasks.map(task =>
                    task.id === taskId ? { ...task, status: selectedStatus } : task
                );
                setTasks(updatedTasks);
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    const handleDeleteTask = (taskId) => {
        deleteTask(taskId)
            .then(() => {
                const updatedTasks = tasks.filter(task => task.id !== taskId);
                setTasks(updatedTasks);
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    };


    useEffect(() => {
        fetchTasks().then(data => {
            setTasks(data);
        }).catch(error => {
            console.error('Error fetching tasks:', error);
        });
    }, []);

    return (
        <div className="task-manager">
            <h1 style={{width:"100%",display:"flex",justifyContent:"center"}}>Task Manager</h1>
            <div style={{width:"100%",justifyContent:"center",display:"flex"}}>
                <button onClick={() => setShowModal(true)}>Add Task</button>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <AddTaskForm addTask={handleAddTask} setShowModal={setShowModal} />
                    </div>
                </div>
            )}

            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className="task-item">
                        <div>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                        </div>
                        <div>
                            <select style={{height:"21.5px"}}
                                value={task.status}
                                onChange={(e) => handleUpdateStatus(task.id, task, e.target.value)}
                            >
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                            <button style={{marginLeft:"5px"}} onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskManager;
