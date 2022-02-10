package com.back.controladores;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.back.repositorios.FolderRepository;
import com.back.repositorios.TaskRepository;
import com.back.entidades.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/")
public class FolderController {
	@Autowired
	private FolderRepository folderRepo;
	@Autowired
	private TaskRepository taskRepo;
	
	
	@GetMapping("folders")
	public List<Folder> getAllFolders() {
		return folderRepo.findAll();
	}
	
	@PostMapping("newFolder")
	public void newFolder(@RequestBody Map<String, Object> payload) {
		System.out.println("entra");
		String name = (String)payload.get("name");
		Folder newFolder = new Folder();
		newFolder.setName(name);
		newFolder.setTasks(new ArrayList<>());
		
		folderRepo.save(newFolder);
	}
	
	@PostMapping("editFolder")
	public void editFolder(@RequestBody Map<String, Object> payload) {
		Long id = Long.valueOf((String)payload.get("id"));
		String name = (String)payload.get("name");
		Folder folder = folderRepo.getById(id);
		folder.setName(name);
		
		folderRepo.save(folder);
	}
	
	@GetMapping("deleteFolder/{id}")
	public void deleteFolder(@PathVariable String id) {
		Folder folder = folderRepo.getById(Long.valueOf(id));
		for (Task t : folder.getTasks()) {
			taskRepo.delete(t);
		}
		folderRepo.delete(folder);
	}	
}
