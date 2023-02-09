package com.ideas2it.todobackend.controler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideas2it.todobackend.dto.TodoDto;
import com.ideas2it.todobackend.service.TodoService;

@RestController
@RequestMapping("/api/v1/todo")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class TodoController {
	
	@Autowired
	public TodoService todoService;
	
	@PostMapping(value = "/addTask")
	public void addTask(@RequestBody TodoDto todoDto) {
		todoService.addTask(todoDto);
	}
	
	@GetMapping(value = "/getTask")
	public List<TodoDto> getTask() {
		return todoService.getTask();
	}

	@DeleteMapping(value = "/deleteTask")
	public void deleteTask(@RequestBody TodoDto todoDto) {
		todoService.deleteTask(todoDto);
	}
	
	@PutMapping(value = "/editTask")
	public void editTask(@RequestBody TodoDto todoDto) {
		todoService.editTask(todoDto);
	}
}
