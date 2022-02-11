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
            folder_id: 0,
            folder_name: "",
            tasks: [],
            content: ""
        };
    }

    // Async functions so that when there is a change in the page it automatically updates
    async createTask() {
        await TaskService.createTask(
            {folder_id: this.state.folder_id, content: this.state.content});
        toast.success("Task created with success.");
        this.componentDidMount();
    }

    async deleteTask(id) {
        await TaskService.deleteTask(id);
        toast.success("Task deleted with success.");
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
    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }

    // Render the tasks and the input for the new task
    render() {
        return (
            <div>
                <h4 class="m-3">
                    <Link to="/">Folders</Link> /  
                    {' ' + this.state.folder_name}
                </h4>
                <ToastContainer />
                <table>
                    <tbody>
                    {this.state.tasks.map(task =>
                        <tr key={task.id}>
                            <td>
                                <button>Done</button>
                            </td>
                            <td>{task.content}</td>
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
                <div class="input-group">
                <   input class="form-control form-control-lg m-3" type="text" 
                    value={this.state.newTask} onChange={this.onChangeContent.bind(this)}/>
                    <button class="btn btn-default" onClick={() => this.createTask()}>
                            Add
                    </button>
                </div>
            </div>
        );
    }
}

export {Tasks};