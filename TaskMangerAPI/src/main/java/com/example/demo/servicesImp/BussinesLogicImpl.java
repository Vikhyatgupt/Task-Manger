package com.example.demo.servicesImp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Task;
import com.example.demo.repository.TaskRepo;
import com.example.demo.services.BussinesLogic;

@Service
public class BussinesLogicImpl implements BussinesLogic {
	
	@Autowired
	TaskRepo repo ;

	@Override
	public String add(Task T) {
		  repo.save(T) ;
		  return "Task added";
	}

	@Override
	public List<Task> showAll() {
		return repo.findAll();
	}

	@Override
	public Optional<Task> showById(int id) {
		if(!repo.existsById(id)) {
			throw new IllegalArgumentException("Task not found : " + id);
		}
		return repo.findById(id);
	}

	@Override
	public Task update(int id , Task t) {
		if(!repo.existsById(id)) {
			throw new IllegalArgumentException("Task not found : " + id);
		}
		t.setId(id);
		return repo.save(t) ;
	}

	@Override
	public String delete(int id) {
		 if(!repo.existsById(id)) {
			 throw new IllegalArgumentException("Task not founr : " + id) ;
		 }
		 repo.deleteById(id);
		return "Deleted";
	}

}
