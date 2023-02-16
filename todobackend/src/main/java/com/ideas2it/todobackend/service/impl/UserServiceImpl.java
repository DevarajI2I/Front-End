package com.ideas2it.todobackend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ideas2it.todobackend.dto.UserDto;
import com.ideas2it.todobackend.entity.User;
import com.ideas2it.todobackend.mapper.UserMapper;
import com.ideas2it.todobackend.repository.UserRepository;
import com.ideas2it.todobackend.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	private UserMapper userMapper;
	private UserRepository userRepository;
	

	@Autowired
	public UserServiceImpl(UserMapper userMapper,UserRepository userRepository) {
		this.userMapper = userMapper;
		this.userRepository = userRepository;
	}

	@Override
	public void addUser(UserDto userDto) {
		User user = userMapper.toUser(userDto);
		userRepository.save(user);
	}

}
