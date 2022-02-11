package com.back.controladores;
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

import com.back.entidades.Folder;
import com.back.repositorios.FolderRepository;
import com.back.repositorios.TaskRepository;
import com.back.entidades.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/")
public class TaskController {
	@Autowired
	private FolderRepository folderRepo;
	@Autowired
	private TaskRepository taskRepo;
	
	@GetMapping("tasks/{id}")
	public List<Task> getTasks(@PathVariable String id) {
		Folder folder = folderRepo.getById(Long.valueOf(id));
		return folder.getTasks();
	}
	
	@GetMapping("task/{id}")
	public Task getTaskById(@PathVariable String id) {
		Task task = taskRepo.findById(Long.valueOf(id)).get();
		return task;
	}
	
	@PostMapping("newTask")
	public void createTask(@RequestBody Map<String, Object> payload) {
		Long folder_id = Long.valueOf((String)payload.get("folder_id"));
		String content = (String)payload.get("content");
		Folder folder = folderRepo.getById(folder_id);
		Task newTask = new Task();
		newTask.setContent(content);
		newTask.setDone(false);
		taskRepo.save(newTask);
		folder.getTasks().add(newTask);
		folderRepo.save(folder);
	}
	
	@PostMapping("editTask")
	public void editTask(@RequestBody Map<String, Object> payload) {
		Long id = Long.valueOf((String)payload.get("id"));
		String content = (String)payload.get("content");
		Task task = taskRepo.getById(id);
		task.setContent(content);
		taskRepo.save(task);
	}
	
	@PostMapping("switchStateTask/{id}")
	public void switchStateTask(@PathVariable String id) {
		Task task = taskRepo.getById(Long.valueOf(id));
		task.setDone(!task.isDone());
		taskRepo.save(task);
	}
	
	@DeleteMapping("deleteTask/{id}")
	public void deleteTask(@PathVariable String id) {
		Task task = taskRepo.getById(Long.valueOf(id));
		taskRepo.delete(task);
	}
}
