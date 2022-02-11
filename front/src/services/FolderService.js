import axios from 'axios';
const ApiURL = 'http://localhost:8080/api/';

// Service for folders
class FolderService {

    // Get all the folders from the database
    getAllFolders() {
        return axios.get(ApiURL + 'folders');
    }

    // Get the folder with the given id from the database
    getFolderById(id) {
        return axios.get(ApiURL + 'folder/' + id);
    }

    // Create a new folder in the database
    createFolder(name) {
        return axios.post(ApiURL + 'newFolder', {name: name});
    }

    // Get the tasks related to the folder from the database
    editFolder(folder) {
        return axios.post(ApiURL + 'editFolder', folder);
    }

    // Delete the folder with the given id from the database
    deleteFolder(id) {
        return axios.delete(ApiURL + 'deleteFolder/' + id);
    }
}

export default new FolderService();