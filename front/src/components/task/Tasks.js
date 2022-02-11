import React from "react";
import TaskService from "../../services/TaskService";
import FolderService from "../../services/FolderService";
import {Link} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


// Tasks main component
class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            folder_id: 0,
            folder_name: "",
            newTask: ""
        };
    }

    // Async functions so that when there is a change in the page it automatically updates
    async createTask() {
        await TaskService.createTask(
            {folder_id: this.state.folder_id, content: this.state.newTask});
        toast.success("Task created with success.");
        this.componentDidMount();
        this.state.newTask = "";
    }

    async deleteTask(id) {
        await TaskService.deleteTask(id);
        toast.success("Task deleted with success.");
        this.componentDidMount();
    }

    async completeTask(id) {
        await TaskService.completeTask(id);
        this.componentDidMount();
    }

    // Get the tasks related to the folder from the database
    componentDidMount() {
        var folder_id = window.location.href.split("?")[1];

        FolderService.getFolderById(folder_id).then(response => {
            this.setState({
                folder_name: response.data.name,
            });
        });

        TaskService.getTasks(folder_id).then(response => {
            this.setState({
                folder_id: folder_id,
                tasks: response.data
            });
        });
    }

    // Update the content of the potential new task
    onChangeNewTask(e) {
        this.setState({
            newTask: e.target.value
        });
    }

    // Render the tasks and the input for the new task
    render() {
        return (
            <div class="todo">
                <h1>
                    <Link to="/">Folders</Link> /  
                    {' ' + this.state.folder_name}
                </h1>
                <ToastContainer />
                <table>
                    <tbody>
                    {this.state.tasks.map(task =>
                        <tr key={task.id}>
                            <td>
                                <input onChange={() => this.completeTask(task.id)}checked={task.done} type="checkbox" name="task" />
                            </td>
                            <td class="td-padding">{task.content}</td>
                            <td><Link to={'/editTask?'+task.id+'?'+
                                this.state.folder_name +'?'+this.state.folder_id}>Edit
                                </Link>
                            </td>
                            <td>
                                <Link to={'/viewTasks?'+this.state.folder_id}
                                onClick={() => this.deleteTask(task.id)}>
                                Delete
                                </Link>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div class="forms">
                    <input type="text" 
                    value={this.state.newTask} onChange={this.onChangeNewTask.bind(this)}/>
                    <button onClick={() => this.createTask()}>Add</button>
                </div>
            </div>
        );
    }
}

export {Tasks};