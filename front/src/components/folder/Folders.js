import React from "react";
import FolderService from "../../services/FolderService";
import {Link} from "react-router-dom";

class Folders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folders: [],
            name: "",
        };
    }
    
    async createFolder() {
        await FolderService.createFolder(this.state.name);
        this.componentDidMount();
        this.state.name = "";
    }

    async deleteFolder(id) {
        await FolderService.deleteFolder(id);
        this.componentDidMount();
    }

    componentDidMount() {
        FolderService.getAllFolders().then(response => {
            this.setState({
                folders: response.data
            });
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    render() {
        return (
            <div>
                <h4 class="m-4"><Link to='/'>Folders</Link></h4>
                <table class="m-3">
                    <tbody>
                    {this.state.folders.map(folder =>
                        <tr key={folder.id}>
                            <td>- {folder.name}</td>
                            <td><Link to={'/viewTasks?'+folder.id}>View items</Link></td>
                            <td><Link to={'/editFolder?'+folder.id}>Edit</Link></td>
                            <td>
                                <Link to={'/'} 
                                onClick={() => this.deleteFolder(folder.id)}>
                                Remove
                                </Link>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div>
                    <input type="text" value={this.state.name} 
                        onChange={this.onChangeName.bind(this)}/>
                    <button onClick={() => this.createFolder()}>Create</button>
                </div>
            </div>
        );
    }
}

export {Folders};