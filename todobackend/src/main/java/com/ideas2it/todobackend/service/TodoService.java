package com.ideas2it.todobackend.service;


import java.util.List;

import com.ideas2it.todobackend.dto.TodoDto;


public interface TodoService {
	public void addTask(TodoDto todoDto);

	public List<TodoDto> getTask();

	public void deleteTask(TodoDto todoDto);

	public void editTask(TodoDto todoDto);

}
