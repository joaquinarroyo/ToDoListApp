package com.back.controllers;
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
import com.back.services.TaskService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/")
public class TaskController {
	@Autowired
	private TaskService taskServ;
	
	@GetMapping("tasks/{id}")
	public List<Task> getTasks(@PathVariable String id) {
		return taskServ.getTasks(Long.valueOf(id));
	}
	
	@GetMapping("task/{id}")
	public Task getTaskById(@PathVariable String id) {
		return taskServ.getTaskById(Long.valueOf(id));
	}
	
	@PostMapping("newTask")
	public void createTask(@RequestBody Map<String, Object> payload) {
		taskServ.createTask(payload);
	}
	
	@PostMapping("editTask")
	public void editTask(@RequestBody Map<String, Object> payload) {
		taskServ.editTask(payload);
	}
	
	@PostMapping("switchStateTask/{id}")
	public void switchStateTask(@PathVariable String id) {
		taskServ.switchStateTask(Long.valueOf(id));
	}
	
	@DeleteMapping("deleteTask/{id}")
	public void deleteTask(@PathVariable String id) {
		taskServ.deleteTask(Long.valueOf(id));
	}
}
