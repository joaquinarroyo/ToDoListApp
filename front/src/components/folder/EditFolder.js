import React from "react";
import FolderService from "../../services/FolderService";
import {ToastContainer, toast} from "react-toastify";
import {Link} from "react-router-dom";

// Folder secondary component
class EditFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folder_id: 0,
            name: "",
            oldName: ""
        }
    }

    // Get the folder data from database
    componentDidMount() {
        var folder_id = window.location.href.split("?")[1];
        FolderService.getFolderById(folder_id).then(response => {
            this.setState({
                folder_id: folder_id,
                name: response.data.name,
                oldName: response.data.name
            });
        });
    }

    // Update the potential new name of the folder
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    // Render the input for the new name of the folder
    render() {
        return (
            <div class="todo">
                <h1>
                    <Link to="/">Folders</Link> /  
                    {' Editing folder'}
                </h1>
                <ToastContainer autoClose={2000}/>
                <div class="forms">
                    <input type="text" value={this.state.name} onChange={this.onChangeName.bind(this)}/>
                    <button class="button-4" onClick={() => 
                        FolderService.editFolder(
                            {id: this.state.folder_id, 
                            name: this.state.name}).then(toast.success("Folder '" + this.state.oldName
                                                    + "' edited succesfully"))}>
                        Edit
                    </button>
                </div>
            </div>
        );
    }
}

export {EditFolder};