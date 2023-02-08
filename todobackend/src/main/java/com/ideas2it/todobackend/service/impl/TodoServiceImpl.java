package com.ideas2it.todobackend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ideas2it.todobackend.dto.TodoDto;
import com.ideas2it.todobackend.entity.Todo;
import com.ideas2it.todobackend.mapper.TodoMapper;
import com.ideas2it.todobackend.repository.TodoRepository;
import com.ideas2it.todobackend.service.TodoService;

@Service
public class TodoServiceImpl implements TodoService {
	
	@Autowired
	public TodoMapper todoMapper;
	@Autowired
	public TodoRepository todoRepository;

	@Override
	public void addTask(TodoDto todoDto) {
		Todo todo = todoMapper.addTask(todoDto);
		todoRepository.save(todo);
	}
}
