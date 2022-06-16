package com.aerobridge.demo.Repositorys;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.aerobridge.demo.Contructors.ComponentEvent;

public interface ComponentEventRepository extends CrudRepository<ComponentEvent, Integer> {

    // Retruns all Events of a Component with a certain AerobridgeId
    @Query(value = "SELECT * FROM component_event c WHERE c.aerobridge_id=:aerobridgeId", nativeQuery = true)
    public Iterable<ComponentEvent> getComponentByAID(@Param("aerobridgeId") String aerobridgeId);
}
