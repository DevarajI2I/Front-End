package com.ideas2it.todobackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ideas2it.todobackend.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Integer> {

}
