package com.aerobridge.demo.Repositorys;

import com.aerobridge.demo.Contructors.SerieMasterComponent;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface SerieMasterComponentRepository extends CrudRepository<SerieMasterComponent, Integer> {

    // Removes all relations between a Serie and the MasterComponents of the Serie
    @Modifying
    @Query(value = "DELETE FROM serie_master_component s WHERE s.serie_id=:serieId", nativeQuery = true)
    public void deleteBySerieId(@Param("serieId") Integer serieId);

    // Returns all MasterComponents of a Serie
    @Query(value = "SELECT * FROM serie_master_component s WHERE s.serie_id=:serieId", nativeQuery = true)
    public Iterable<SerieMasterComponent> findBySerieId(@Param("serieId") Integer serieId);

    // Returns all Series of a MasterComponent
    @Query(value = "SELECT * FROM serie_master_component s WHERE s.master_component_id=:masterComponentId", nativeQuery = true)
    public Iterable<SerieMasterComponent> findByMaterComponentId(@Param("masterComponentId") Integer masterComponentId);
}
