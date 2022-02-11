import React from "react";
import TaskService from "../../services/TaskService";

class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task_id: 0,
            content: "",
        }
    }

    componentDidMount() {
        var task_id = window.location.href.split("?")[1];
        TaskService.getTaskById(task_id).then(response => {
            this.setState({
                task_id: task_id,
                content: response.data.content
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