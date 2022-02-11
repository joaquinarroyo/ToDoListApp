package com.back.controllers;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.back.entities.*;
import com.back.repositories.FolderRepository;
import com.back.repositories.TaskRepository;
import com.back.services.FolderService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/")
public class FolderController {
	@Autowired
	private FolderService folderServ;
	@Autowired
	private FolderRepository folderRepo;
	@Autowired
	private TaskRepository taskRepo;
	
	
	@GetMapping("folders")
	public List<Folder> getAllFolders() {
		return folderServ.getAllFolders();
	}
	
	@GetMapping("folder/{id}")
	public Folder getFolderById(@PathVariable String id) {
		return folderServ.getFolderById(Long.valueOf(id));
	}
	
	@PostMapping("newFolder")
	public void newFolder(@RequestBody Map<String, Object> payload) {
		folderServ.newFolder(payload);
	}
	
	@PostMapping("editFolder")
	public void editFolder(@RequestBody Map<String, Object> payload) {
		folderServ.editFolder(payload);
	}
	
	@DeleteMapping("deleteFolder/{id}")
	public void deleteFolder(@PathVariable String id) {
		folderServ.deleteFolder(Long.valueOf(id));
	}	
}
