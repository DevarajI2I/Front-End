package com.ideas2it.todobackend.mapper;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ideas2it.todobackend.dto.UserDto;
import com.ideas2it.todobackend.entity.Todo;
import com.ideas2it.todobackend.entity.User;

@Component
public class UserMapper {
	
	public ModelMapper mapper;
	public TodoMapper todoMapper;
	
	@Autowired
	public UserMapper (ModelMapper mapper,TodoMapper todoMapper) {
		this.mapper = mapper;
		this.todoMapper = todoMapper;
	}

	public User toUser(UserDto userDto) {
		User user = mapper.map(userDto, User.class);
		List<Todo> taskValue = userDto.getTasks().stream().map(add -> todoMapper.addTask(add)).toList();
		user.setTaskName(taskValue);
		return user;
	}
	public UserDto userDto(User user) {
		UserDto userDto = mapper.map(user, UserDto.class);
		return userDto;
	}
}
