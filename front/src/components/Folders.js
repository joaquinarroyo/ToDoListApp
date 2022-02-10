import React from "react";
import FolderService from "../services/FolderService";

class Folders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folders: [],
            newFolder: "",
        };
        this.onChangeNewFolder = this.onChangeNewFolder.bind(this);
    }

    componentDidMount() {
        FolderService.getAllFolders().then(response => {
            this.setState({
                folders: response.data
            });
        });
    }

    onChangeNewFolder(e) {
        console.log(this.state.newFolder)
        this.setState({
            newFolder: e.target.value
        });
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                    {this.state.folders.map(folder =>
                        <tr key={folder.id}>
                            <th>{folder.name}</th>
                            <th><a>View items</a></th>
                            <th><a>Remove</a></th>
                        </tr>
                    )}
                    </tbody>
                </table>
                <form>
                    <input type="text" onChange={this.onChangeNewFolder} 
                            value={this.state.newFolder}></input>
                    <button type="submit" 
                            onClick={() => FolderService.createFolder({name: this.state.newFolder})}>
                                Add
                    </button>
                </form>
            </div>
        );
    }
}

export {Folders};