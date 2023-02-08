package com.ideas2it.todobackend.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideas2it.todobackend.dto.TodoDto;
import com.ideas2it.todobackend.service.TodoService;

@RestController
@RequestMapping("/api/v1/todo")
public class TodoController {
	
	@Autowired
	public TodoService todoService;
	
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	@PostMapping(value = "/addTask")
	public void addTask(@RequestBody TodoDto todoDto) {
		todoService.addTask(todoDto);
	}

}
