package com.aerobridge.demo.Controllers;

import java.util.Map;
import com.aerobridge.demo.Contructors.Component;
import com.aerobridge.demo.Services.ComponentService;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/component")
public class ComponentController {

    @Autowired
    private ComponentService componentService;

    // Returns all Components
    @GetMapping("")
    public @ResponseBody Iterable<Component> getAllComponents() {
        return componentService.findAll();
    }

    // Returns a singel Component
    @GetMapping("/{id}")
    public ResponseEntity<Component> get(@PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer id = Integer.valueOf(pathVarsMap.get("id").toString());
            return componentService.findById(id);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Add new Components to a MasterComponent
    @PostMapping("/{masterComponentId}")
    public ResponseEntity<?> add(@RequestBody JSONObject object, @PathVariable Map<String, String> pathVarsMap) {
        try {
            Integer masterComponentId = Integer.valueOf(pathVarsMap.get("masterComponentId").toString());
            return componentService.newComponent(object, masterComponentId);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Get Components of a MasterComponent
    @GetMapping("/master-component/{masterComponentId}")
    public ResponseEntity<?> getByMasterComponent(@PathVariable Map<String, String> pathVarsMap) {
        try {
            Integer masterComponentId = Integer.valueOf(pathVarsMap.get("masterComponentId").toString());
            return componentService.findByMasterComponent(masterComponentId);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Edit a Component
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Component component,
            @PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer id = Integer.valueOf(pathVarsMap.get("id").toString());
            return componentService.editComponent(component, id);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    // Delete a Component
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Map<String, Object> pathVarsMap) {
        try {
            Integer id = Integer.valueOf(pathVarsMap.get("id").toString());
            return componentService.deleteById(id);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
