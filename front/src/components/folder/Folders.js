import React from "react";
import FolderService from "../../services/FolderService";
import {Link} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// Folders main component
class Folders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folders: [],
            name: "",
        };
    }
    
    // Async functions so that when there is a change in the page it automatically updates
    async createFolder() {
        await FolderService.createFolder(this.state.name);
        toast.success("Folder '"+ this.state.name +"' created with success.");
        this.componentDidMount();
        this.state.name = "";
    }

    async deleteFolder(id, name) {
        await FolderService.deleteFolder(id);
        toast.success("Folder '"+ name +"' deleted with success.");
        this.componentDidMount();
    }

    // Get the folders from the database
    componentDidMount() {
        FolderService.getAllFolders().then(response => {
            this.setState({
                folders: response.data
            });
        });
    }

    // Update the name of the potential new folder
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    // Render the folders and the input for the new folder
    render() {
        return (
            <div class="todo">
                <h1>Folders</h1>
                <ToastContainer autoClose={2000}/>
                <table>
                    {this.state.folders.map(folder =>
                        <tr key={folder.id}>
                            <td><label>-{folder.name}</label></td>
                            <td><Link to={'/viewTasks?'+folder.id}>View items</Link></td>
                            <td><Link to={'/editFolder?'+folder.id}>Edit</Link></td>
                            <td>
                                <Link to={'/'} 
                                onClick={() => this.deleteFolder(folder.id, folder.name)}>
                                Remove
                                </Link>
                            </td>
                        </tr>
                    )}
                </table>
                <div class="forms">
                    <input type="text" placeholder="New folder" value={this.state.name} 
                        onChange={this.onChangeName.bind(this)}/>
                    <button class="button-4" onClick={() => this.createFolder()}>Add</button>
                </div>
            </div>
        );
    }
}


export {Folders};