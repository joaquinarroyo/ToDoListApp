import axios from 'axios';
const ApiURL = 'http://localhost:8080/api/';

class FolderService {
    getAllFolders() {
        return axios.get(ApiURL + 'folders');
    }

    getFolderById(id) {
        return axios.get(ApiURL + 'folder/' + id);
    }

    createFolder(name) {
        return axios.post(ApiURL + 'newFolder', {name: name});
    }

    editFolder(folder) {
        return axios.post(ApiURL + 'editFolder', folder);
    }

    deleteFolder(id) {
        return axios.delete(ApiURL + 'deleteFolder/' + id);
    }

}

export default new FolderService();