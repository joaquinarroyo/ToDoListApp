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
        }
    }

    // Get the folder data from database
    componentDidMount() {
        var folder_id = window.location.href.split("?")[1];
        FolderService.getFolderById(folder_id).then(response => {
            this.setState({
                folder_id: folder_id,
                name: response.data.name
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
            <div>
                <h4 class="m-3">
                    <Link to="/">Folders</Link> /  
                    {' Editing "' + this.state.name +'" folder'}
                </h4>
                <ToastContainer />
                <input type="text" value={this.state.name} onChange={this.onChangeName.bind(this)}/>
                <button onClick={() => 
                    FolderService.editFolder(
                        {id: this.state.folder_id, 
                         name: this.state.name}).then(toast.success("Folder edited succesfully"))}>
                        Edit
                </button>
            </div>
        );
    }
}

export {EditFolder};