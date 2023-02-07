package com.ideas2it.todobackend.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.ideas2it.todobackend.dto.TodoDto;
import com.ideas2it.todobackend.entity.Todo;

public class TodoMapper {
	@Autowired
	public ModelMapper mapper;
	
	public Todo addTask(TodoDto todoDto) {
		Todo todo = mapper.map(todoDto, Todo.class);
		return todo;
	}
}
