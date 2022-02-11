import axios from 'axios';
const ApiURL = 'http://localhost:8080/api/';

class TaskService {
    getTasks(folder_id) {
        return axios.get(ApiURL + 'tasks/' + folder_id);
    }

    createTask(task) {
        return axios.post(ApiURL + 'newTask', task);
    }

    getTaskById(id) {
        return axios.get(ApiURL + 'task/' + id);
    }

    editTask(task) {
        return axios.post(ApiURL + 'editTask', task);
    }

    completeTask(task) {
        return axios.post(ApiURL + 'switchStateTask', {
            id: task.id,
        });
    }

    deleteTask(id) {
        return axios.delete(ApiURL + 'deleteTask/' + id);
    }

    getVersion() {
        return axios.get(ApiURL + 'taskV');
    }
}

export default new TaskService();