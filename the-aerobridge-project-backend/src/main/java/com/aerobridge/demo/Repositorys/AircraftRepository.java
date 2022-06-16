package com.aerobridge.demo.Repositorys;

import com.aerobridge.demo.Contructors.Aircraft;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface AircraftRepository extends CrudRepository<Aircraft, Integer> {

    // Returns a single Aircraft with a certain AerobridgeID
    @Query(value = "SELECT * FROM aircraft a WHERE a.aerobridge_id=:aerobridgeId", nativeQuery = true)
    public Optional<Aircraft> getAircraftByAID(@Param("aerobridgeId") String aerobridgeId);
}
