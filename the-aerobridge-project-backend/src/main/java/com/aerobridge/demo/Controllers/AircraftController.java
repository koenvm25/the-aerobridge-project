package com.aerobridge.demo.Controllers;

import java.util.ArrayList;
import java.util.Map;

import com.aerobridge.demo.Contructors.Aircraft;
import com.aerobridge.demo.Services.AircraftService;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/aircraft")
public class AircraftController {

    @Autowired
    private AircraftService aircraftService;

    // Returns all Aircraft
    @GetMapping("")
    public @ResponseBody Iterable<Aircraft> getAllAircrafts() {
        return aircraftService.findAll();
    }

    // Returns a single Aircraft 
    @GetMapping("/{id}")
    public ResponseEntity<Aircraft> getAircraft(@PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer id = Integer.valueOf(pathVarsMap.get("id").toString());
            return aircraftService.findById(id);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Adds new Aircraft based on a Serie
    @PostMapping("/{serieId}")
    public ResponseEntity<?> addAircaft(@RequestBody Aircraft aircraft, @PathVariable Map<String, String> pathVarsMap) {
        try {
            Integer serieId = Integer.valueOf(pathVarsMap.get("serieId").toString());
            return aircraftService.addAircraft(aircraft, serieId);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Edit a single Aircraft
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAircaft(@RequestBody Aircraft aircraft,
            @PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer id = Integer.valueOf(pathVarsMap.get("id").toString());
            return aircraftService.editAircraft(aircraft, id);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Edit components of a Aircraft
    @PutMapping("/edit-components/{id}")
    public ResponseEntity<?> updateComponents(@RequestBody JSONObject object,
            @PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer aircraftId = Integer.valueOf(pathVarsMap.get("id").toString());
            ArrayList<?> components = (ArrayList<?>) object.get("swappedComponents");
            return aircraftService.updateComponents(aircraftId, components);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Delete a single Aircraft
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteArcraft(@PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer id = Integer.valueOf(pathVarsMap.get("id").toString());
            return aircraftService.deleteById(id);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
