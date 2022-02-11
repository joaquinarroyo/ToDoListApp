import React from "react";
import TaskService from "../../services/TaskService";
import FolderService from "../../services/FolderService";
import {Link} from "react-router-dom";

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

    async createTask() {
        await TaskService.createTask(
            {folder_id: this.state.folder_id, content: this.state.content});
        this.componentDidMount();
    }

    async deleteTask(id) {
        await TaskService.deleteTask(id);
        this.componentDidMount();
    }

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

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }

    render() {
        return (
            <div>
                <h4 class="m-3">
                    <Link to="/">Folders</Link> /  
                    {' ' + this.state.folder_name}
                </h4>
                <table>
                    <tbody>
                    {this.state.tasks.map(task =>
                        <tr key={task.id}>
                            <td>
                                <button>Done</button>
                            </td>
                            <td>{task.content}</td>
                            <td><Link to={'/editTask?'+task.id}>Edit</Link></td>
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