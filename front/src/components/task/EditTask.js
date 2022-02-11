import React from "react";
import TaskService from "../../services/TaskService";

// Tasks secondary component
class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task_id: 0,
            content: "",
        }
    }

    // Get the task data from database
    componentDidMount() {
        var task_id = window.location.href.split("?")[1];
        TaskService.getTaskById(task_id).then(response => {
            this.setState({
                task_id: task_id,
                content: response.data.content
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
            <div>
                <input type="text" value={this.state.content} onChange={this.onChangeContent.bind(this)}/>
                <button onClick={() => 
                    TaskService.editTask(
                        {id: this.state.task_id,
                         content: this.state.content})}>
                        Edit
                </button>
            </div>
        );
    }
}

export {EditTask};