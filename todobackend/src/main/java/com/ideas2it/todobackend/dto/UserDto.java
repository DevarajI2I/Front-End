package com.ideas2it.todobackend.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
	private int id;
	private String emailId;
	private List<TodoDto> tasks;
}
