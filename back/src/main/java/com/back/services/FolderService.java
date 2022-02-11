package com.back.services;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import com.back.entities.Folder;
import com.back.entities.Task;
import com.back.repositories.FolderRepository;
import com.back.repositories.TaskRepository;

@Service
public class FolderService {
	// Folder service
	@Autowired
	private FolderRepository folderRepo;
	@Autowired
	private TaskRepository taskRepo;
	
	// Return all the folders
	public List<Folder> getAllFolders() {
		return folderRepo.findAll();
	}
	
	// Returns the folder related to the given id
	public Folder getFolderById(Long id) {
		Folder folder = folderRepo.findById(id).get();
		return folder;
	}
	
	// Creates a new folder with the data received in the payload
	public void newFolder(@RequestBody Map<String, Object> payload) {
		String name = (String)payload.get("name");
		Folder newFolder = new Folder();
		newFolder.setName(name);
		newFolder.setTasks(new ArrayList<>());
		folderRepo.save(newFolder);
	}
	
	// Edits the folder with the data received in the payload
	public void editFolder(@RequestBody Map<String, Object> payload) {
		Long id = Long.valueOf((String)payload.get("id"));
		String name = (String)payload.get("name");
		Folder folder = folderRepo.getById(id);
		folder.setName(name);
		folderRepo.save(folder);
	}
	
	// Deletes the folder related with the given id, also deletes all the task related to the folder
	public void deleteFolder(Long id) {
		Folder folder = folderRepo.getById(Long.valueOf(id));
		for (Task t : folder.getTasks()) {
			taskRepo.delete(t);
		}
		folderRepo.delete(folder);
	}
}
