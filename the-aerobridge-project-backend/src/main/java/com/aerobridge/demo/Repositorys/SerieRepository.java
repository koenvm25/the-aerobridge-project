package com.aerobridge.demo.Repositorys;

import com.aerobridge.demo.Contructors.Serie;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface SerieRepository extends CrudRepository<Serie, Integer> {

    // Returns all Series of a Model
    @Query(value = "SELECT * FROM serie s WHERE s.model_id=:modelId", nativeQuery = true)
    public Iterable<Serie> findByModelId(@Param("modelId") Integer modelId);
}
