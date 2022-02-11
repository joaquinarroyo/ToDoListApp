import axios from 'axios';
const ApiURL = 'http://localhost:8080/api/';

// Service for tasks
class TaskService {
    // Get the tasks related to the folder from the database
    getTasks(folder_id) {
        return axios.get(ApiURL + 'tasks/' + folder_id);
    }

    // Create a new task in the database
    createTask(task) {
        return axios.post(ApiURL + 'newTask', task);
    }

    // Get the task related to the given id from the database
    getTaskById(id) {
        return axios.get(ApiURL + 'task/' + id);
    }

    // Edit the given task
    editTask(task) {
        return axios.post(ApiURL + 'editTask', task);
    }

    // Switch the state 'done' of the given task
    completeTask(task) {
        return axios.post(ApiURL + 'switchStateTask', {
            id: task.id,
        });
    }

    // Delete the task with the given id from the database
    deleteTask(id) {
        return axios.delete(ApiURL + 'deleteTask/' + id);
    }
}

export default new TaskService();