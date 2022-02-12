import React from "react";
import TaskService from "../../services/TaskService";
import {ToastContainer, toast} from "react-toastify";
import {Link} from "react-router-dom";

// Tasks secondary component
class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task_id: 0,
            folder_id: 0,
            folder_name: "",
            oldContent: "",
            content: ""
        }
    }

    // Get the task data from database
    componentDidMount() {
        var task_id = window.location.href.split("?")[1];
        var folder_name = window.location.href.split("?")[2];
        var folder_id = window.location.href.split("?")[3];
        TaskService.getTaskById(task_id).then(response => {
            this.setState({
                task_id: task_id,
                folder_name: folder_name,
                folder_id: folder_id,
                content: response.data.content,
                oldContent: response.data.content
            });
        });
    }

    // Update the potential new content of the task
    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }

    // Render the input for the new content of the task
    render() {
        return (
            <div class="todo">
                <h1>
                    <Link to="/">Folders</Link>
                    {' / '} 
                    <Link to={"/viewTasks?"+this.state.folder_id}>{this.state.folder_name}</Link>
                    {' / Editing task '}
                </h1>
                <ToastContainer autoClose={2000}/>
                <div class="forms">
                    <input type="text" value={this.state.content} onChange={this.onChangeContent.bind(this)}/>
                    <button class="button-4" onClick={() => 
                        TaskService.editTask(
                            {id: this.state.task_id,
                            content: this.state.content}).then(toast.success("Task '" + this.state.oldContent 
                                                                    + "' edited with success."))}>
                        Edit
                    </button>
                </div>
            </div>
        );
    }
}

export {EditTask};