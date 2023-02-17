package com.ideas2it.todobackend.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideas2it.todobackend.dto.UserDto;
import com.ideas2it.todobackend.service.UserService;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class UserController {
	
	@Autowired
	public UserService userService;

	@PostMapping("/add")
	public void addUser(@RequestBody UserDto userDto) {
		userService.addUser(userDto);
	}
}
