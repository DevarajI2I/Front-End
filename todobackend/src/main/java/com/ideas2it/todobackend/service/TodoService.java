package com.ideas2it.todobackend.service;

import org.springframework.stereotype.Service;

import com.ideas2it.todobackend.dto.TodoDto;


public interface TodoService {
	public void addTask(TodoDto todoDto);

}
