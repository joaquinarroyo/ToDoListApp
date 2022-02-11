import React from "react";
import FolderService from "../../services/FolderService";

class EditFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folder_id: 0,
            name: "",
        }
    }

    componentDidMount() {
        var folder_id = window.location.href.split("?")[1];
        FolderService.getFolderById(folder_id).then(response => {
            this.setState({
                folder_id: folder_id,
                name: response.data.name
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
                <input type="text" value={this.state.name} onChange={this.onChangeName.bind(this)}/>
                <button onClick={() => 
                    FolderService.editFolder(
                        {id: this.state.folder_id, 
                         name: this.state.name})}>
                        Edit
                </button>
            </div>
        );
    }
}

export {EditFolder};