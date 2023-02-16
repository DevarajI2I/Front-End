package com.ideas2it.todobackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ideas2it.todobackend.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>{

}
