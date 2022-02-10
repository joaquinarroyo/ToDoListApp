import axios from 'axios';
const ApiURL = 'http://localhost:8080/api/';

class FolderService {
    getAllFolders() {
        return axios.get(ApiURL + 'folders');
    }

    getFolderById(id) {
        return axios.get(ApiURL + 'folders/' + id);
    }

    createFolder(folder) {
        return axios.post(ApiURL + 'newFolder', {name: folder.name});
    }

    updateFolder(folder) {
        return axios.put(ApiURL + 'folder/', {id: folder.id, name: folder.name});
    }

    deleteFolder(id) {
        return axios.delete(ApiURL + 'folder/' + id);
    }
}

export default new FolderService();