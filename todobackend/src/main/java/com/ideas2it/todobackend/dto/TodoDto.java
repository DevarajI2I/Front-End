package com.ideas2it.todobackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoDto {
	private int id;
	private String taskName;
	private boolean completedStatus;
	private int userId;
}
