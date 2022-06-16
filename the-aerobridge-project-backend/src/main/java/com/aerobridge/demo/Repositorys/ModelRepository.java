package com.aerobridge.demo.Repositorys;

import com.aerobridge.demo.Contructors.Model;

import org.springframework.data.repository.CrudRepository;

public interface ModelRepository extends CrudRepository<Model, Integer> {
}
