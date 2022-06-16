package com.aerobridge.demo.Repositorys;

import com.aerobridge.demo.Contructors.Component;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ComponentRespository extends CrudRepository<Component, Integer> {

    // Returns all Components of a MasterComponent that are available 
    @Query(value = "SELECT * FROM component c WHERE (c.master_component_id=:masterComponentId AND c.status='Available')", nativeQuery = true)
    public Iterable<Component> getAvailable(@Param("masterComponentId") Integer masterComponentId);

    // Returns all Components of an Aircraft
    @Query(value = "SELECT * FROM component c WHERE c.aircraft_id=:aircraftId", nativeQuery = true)
    public Iterable<Component> getByAircraftId(@Param("aircraftId") Integer aircraftId);
}
