package com.ideas2it.todobackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ideas2it.todobackend.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
	List<Todo> findByTaskNameContains(String todo);
	List<Todo> findByUserId(Integer userId);
}
