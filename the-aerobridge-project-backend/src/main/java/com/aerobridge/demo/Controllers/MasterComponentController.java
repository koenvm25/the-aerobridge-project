package com.aerobridge.demo.Controllers;

import java.util.ArrayList;
import java.util.Map;

import com.aerobridge.demo.Contructors.MasterComponent;
import com.aerobridge.demo.Services.MasterComponentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/master-component")
public class MasterComponentController {

    @Autowired
    MasterComponentService masterComponentService;

    // Get all MasterCompnents
    @GetMapping("")
    public @ResponseBody Iterable<MasterComponent> getAllMasterComponents() {
        return masterComponentService.findAll();
    }

    // Get a single MasterComponent
    @GetMapping("/{masterComponentId}")
    public ResponseEntity<MasterComponent> get(@PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer masterComponentId = Integer.valueOf(pathVarsMap.get("masterComponentId").toString());
            return masterComponentService.findById(masterComponentId);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Get all MasterComponents with a low stock
    @GetMapping("/low-stock")
    public ResponseEntity<ArrayList<MasterComponent>> getLowStock() {
        return masterComponentService.getLowStock();
    }

    // Add new MasterComponent
    @PostMapping("")
    public ResponseEntity<?> addMasterComponent(@RequestBody MasterComponent masterComponent) {
        return masterComponentService.addMasterComponent(masterComponent);
    }

    // Edit a MasterComponent
    @PutMapping("/{masterComponentId}")
    public ResponseEntity<?> editMasterComponent(@RequestBody MasterComponent masterComponent,
            @PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer masterComponentId = Integer.valueOf(pathVarsMap.get("masterComponentId").toString());
            return masterComponentService.editMasterComponent(masterComponent, masterComponentId);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Delete a MasterComponent
    @DeleteMapping("/{masterComponentId}")
    public ResponseEntity<?> delete(@PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer masterComponentId = Integer.valueOf(pathVarsMap.get("masterComponentId").toString());
            return masterComponentService.deleteById(masterComponentId);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
