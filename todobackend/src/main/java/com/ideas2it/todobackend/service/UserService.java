package com.ideas2it.todobackend.service;

import com.ideas2it.todobackend.dto.UserDto;

public interface UserService {

	public void addUser(UserDto userDto);

	public UserDto getUser(UserDto userDto);

}
