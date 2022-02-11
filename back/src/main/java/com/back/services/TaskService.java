package com.back.services;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import com.back.entities.*;
import com.back.repositories.FolderRepository;
import com.back.repositories.TaskRepository;

@Service
public class TaskService {
	// Task service
	@Autowired
	private TaskRepository taskRepo;
	@Autowired
	private FolderRepository folderRepo;
	
	// Returns all the task related to the folder related to the given id
	public List<Task> getTasks(Long id) {
		return folderRepo.getById(id).getTasks();
	}
	
	// Returns the task related to the given id
	public Task getTaskById(Long id) {
		Task task = taskRepo.findById(Long.valueOf(id)).get();
		return task;
	}
	
	// Create a task with the data received in the payload
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
	
	// Edit a task with the data received in the payload
	public void editTask(@RequestBody Map<String, Object> payload) {
		Long id = Long.valueOf((String)payload.get("id"));
		String content = (String)payload.get("content");
		Task task = taskRepo.getById(id);
		task.setContent(content);
		taskRepo.save(task);
	}
	
	// Switch the 'done' state of the task related to the given id
	public void switchStateTask(Long id) {
		Task task = taskRepo.getById(Long.valueOf(id));
		task.setDone(!task.isDone());
		taskRepo.save(task);
	}
	
	// Deletes the task related to the given id
	public void deleteTask(Long id) {
		Task task = taskRepo.getById(Long.valueOf(id));
		taskRepo.delete(task);
	}
}
