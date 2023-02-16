package com.ideas2it.todobackend.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ideas2it.todobackend.dto.UserDto;
import com.ideas2it.todobackend.entity.User;

@Component
public class UserMapper {
	
	@Autowired
	public ModelMapper mapper;
	
	public User toUser(UserDto userDto) {
		User user = mapper.map(userDto, User.class);
		System.out.println(user);
		return user;
		
	}
}
